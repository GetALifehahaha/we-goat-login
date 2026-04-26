import axios from "axios";
import authService from "../../auth/services/authService";

const apiService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true
})

apiService.interceptors.request.use(
    (config) => {
        const token = authService.getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

apiService.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status == 401 && !originalRequest._retry) {
            if (authService.isRefreshing) {
                return new Promise((resolve, reject) => {
                    authService.addToQueue(resolve, reject);
                })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiService(originalRequest)
                })
                .catch((error) => {
                    return Promise.reject(error)
                })
            }

            originalRequest._retry = true;
            authService.isRefreshing = true;
    
            try {
                const newToken = await authService.refreshToken();
                authService.processQueue(null, newToken);
    
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiService(originalRequest);
            } catch (refreshError) {
                authService.processQueue(refreshError, null);
                console.error("Refresh error: ", refreshError);
    
                await authService.logout();
                return Promise.reject(refreshError)
            } finally {
                authService.isRefreshing = false;
            }
        }
        return Promise.reject(error)
    }
);

export default apiService;