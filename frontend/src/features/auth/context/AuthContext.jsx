import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import authService from '../services/authService'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an auth provider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const userData = await authService.checkAuthStatus();

                console.log("User: ", userData)

                if (userData) {
                    setUser(userData)
                }
            } catch (error) {
                console.error("Auth initialization error: ", error)
            } finally {
                setLoading(false);
            }
        }

        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const userData = await authService.login(credentials);
            setUser(userData);
            return userData;
        } catch (error) {
            console.error("Login error: ", error)
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout error: ", error)
        } finally {
            setUser(null)
        }
    };

    const refreshUser = async () => {
        const userData = await authService.refreshToken();
        setUser(userData);
        return userData;
    };

    const value = {
        user,
        login,
        logout,
        refreshUser,
        loading,
        isAuthentication: !!user && !!authService.getToken()
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
