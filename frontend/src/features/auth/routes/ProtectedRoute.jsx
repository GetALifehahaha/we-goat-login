import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageLogo } from "../../shared";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [countUp, setCountup] = useState(0);

    useEffect(() => {
        if (loading) {
            const timeout = setTimeout(() => {
                setCountup(prev => prev + 1);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [loading, countUp])

    if (loading) {
        return <div className="px-16 max-w-full w-full h-screen bg-linear-to-br from-neutral-800 to-neutral-900 backdrop-blur overflow-hidden
                        flex flex-col justify-center items-center text-center
        '">
            <PageLogo />
            {countUp >= 5 &&
                <h5 className="text-white mt-4 font-semibold">
                    The backend service is deployed through free-tier Render.
                </h5>}
            <div className="flex flex-col items-center py-16 gap-8">
                {countUp >= 5 && <h5 className="text-sm text-white/80">It takes an approximately 50 seconds to 2 minutes to wake the backend service from a cold start.</h5>}
                <div className="relative flex justify-center items-center w-20 h-20">
                    <Loader2Icon strokeWidth={0.5} className="absolute top-0 left-0 w-full h-full aspect-square scale-200 -z-1 text-white/10 animate-spin" />
                    <h1 className="text-white text-shadow-white/20 text-shadow-lg text-8xl font-bold tracking-tighter text-center font-mono">{countUp >= 5 && countUp}</h1>
                </div>
            </div>
            <div className="text-white/80 text-sm">
                {countUp >= 5 && <h5>Thank you for your consideration. Please wait for a little bit.</h5>}
            </div>
            <div className="p-2 border-t border-white/10 mt-16">
                <h5 className="uppercase font-medium text-xs tracking-wide text-white/20">Powered by Render and Vercel</h5>
            </div>
        </div>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;