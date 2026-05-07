import {jwtDecode} from 'jwt-decode'
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL

class AuthService {
    constructor () {
        this.isRefreshing = false;
        this.failedQueue = [];
        this.token = localStorage.getItem('token');
    }

    configureAxios() {
        axios.defaults.withCredentials = true
    }

    async login(credentials) {
        try {
            const response = await axios.post(BASE_URL + '/users/login/',
                credentials,
                { withCredentials: true }
            )

            if (response.data.token) {
                this.token = response.data.token
                localStorage.setItem('token', this.token);
                localStorage.setItem('refreshToken', response.data.refresh);

                const fullUserData = await this.checkAuthStatus();
                return fullUserData;
            }

            throw new Error("No access token received.") 
        } catch (error) {
            console.error("Login error: ", error.status)

            if (error.status === 401) {
                throw "Invalid user credentials. Please try again"
            }
            throw error
        }
    }

    async logout() {
        this.token = null;
        this.isRefreshing = false;
        this.failedQueue = []
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }

    async register( credentials ) {
        try {
            await axios.post(
                BASE_URL + 
                "/users/register/",
                credentials,
                { withCredentials: true }
            )

        } catch (error) {
            console.log("Thrown error: ", error.response.data)
            throw error.response.data
        }
    }


    decodeToken(token = null) {
        const tokenToUse = token || this.token

        if (!tokenToUse) {
            return null;
        } ;

        try {
            const decoded = jwtDecode(tokenToUse);

            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                this.token = null
                return null;
            };

            return decoded;
        } catch (error) {
            this.token = null;
            console.error("Token decode error: ", error);
            return null;
        }
    }

    getCurrentUser() {
        return this.decodeToken();
    }

    getToken() {
        return this.token;
    } 

    isTokenExpired(token = null) {
        const tokenToUse = token || this.token;

        if (!tokenToUse) return true

        try {
            const decoded = jwtDecode(tokenToUse);
            const currentTime = Date.now() / 1000;
            const bufferTime = 5 * 60
            return decoded.exp < currentTime + bufferTime;
        } catch {
            return true;
        }
    }

    async refreshToken() {
        try {
            const refresh = localStorage.getItem('refreshToken');
        
            if (!refresh) {
                throw new Error("No refresh token available");
            }
            const response = await axios.post(BASE_URL + '/users/refresh/', { refresh: refresh });

            if (response.data.token) {
                this.token = response.data.token
                localStorage.setItem('token', this.token);
                return response.data.token
            }

            throw new Error("No access token in refresh response");
        } catch (error) {
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            throw error;
        }
    }

    async checkAuthStatus() {
        try {
            const response = await axios.get(BASE_URL + '/me/', {
                withCredentials: true,
                headers: this.token ? { Authorization: `Bearer ${this.token}` } : {}
            });

            if (response.data.token) {
                this.token = response.data.token;
            }

            return {...this.decodeToken(), ...response.data};
        } catch (error) {
            console.log("Error checking status; ", error)
            this.token = null;
            return null;
        }
    }

    processQueue(error, token=null) {
        this.failedQueue.forEach(({resolve, reject}) => {
            if (error) {
                reject(error)
            } else {
                resolve(token)
            }
        });

        this.failedQueue = [];
    }

    addToQueue(resolve, reject) {
        this.failedQueue.push({ resolve, reject });
    }

    
}

const authService = new AuthService();

authService.configureAxios();

export default authService;
