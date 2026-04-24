import {jwtDecode} from 'jwt-decode'
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL

class AuthService {
    constructor () {
        this.isRefreshing = false;
        this.failedQueue = [];
        this.token = null
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
                return this.decodeToken(response.data.token)
            }

            throw new Error("No access token received.") 
        } catch (error) {
            console.error("Login error: ", error)
            throw error
        }
    }

    async logout() {
        this.token = null;
        this.isRefreshing = false;
        this.failedQueue = []

        alert("Hie")

        return axios
        .post(BASE_URL + '/logout/', {}, { withCredentials: true } )
        .catch((error) => console.log("Logout error: ", error))
    }

    async register( credentials ) {
        return axios
        .post(
            BASE_URL + 
            "/users/register/",
            { first_name: credentials.firstName, last_name:credentials.lastName, email: credentials.email, username: credentials.username, password: credentials.password },
            { withCredentials: true }
        )
        .catch((error) => ("Register error: ", error.response))
        ;
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
            // refresh token is already part of the cookie, wow
            const response = await axios.post(BASE_URL + '/users/refresh/', {}, { withCredentials: true });

            if (response.data.token) {
                this.token = response.data.token
                return response.data.token
            }

            throw new Error("No access token in refresh response");
        } catch (error) {
            this.token = null;
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

            return this.decodeToken();
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
