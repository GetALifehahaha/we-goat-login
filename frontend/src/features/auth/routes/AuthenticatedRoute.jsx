import { Navigate, useLocation } from 'react'
import { useAuth } from '../context/AuthContext'

const AuthenticatedRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <h5>Loading...</h5>
    }

    if (!user) {
        return <Navigate to="/manageProject" state={{ from: location }} replace />
    }

    return children

}

export default AuthenticatedRoute