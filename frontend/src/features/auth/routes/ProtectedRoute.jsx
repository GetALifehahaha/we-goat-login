import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PageLogo } from "../../shared";
import { Loader2Icon } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (true) {
        return <div className="px-16 max-w-full w-full h-screen bg-linear-to-br from-neutral-800 to-neutral-900 backdrop-blur overflow-hidden
                        flex flex-col justify-center items-center text-center
        '">
            <PageLogo />
            <h5 className="text-white mt-4">
                The backend service is deployed through free-tier Render.
            </h5>
            <div className="flex flex-col items-center py-16 gap-8">
                <h5 className="text-sm text-white/80">It takes an approximately</h5>
                <div className="relative">
                    <Loader2Icon strokeWidth={0.5} className="absolute top-0 left-0 w-full h-full aspect-square scale-200 -z-1 text-white/10 animate-spin" />
                    <h1 className="text-white text-shadow-white/20 text-shadow-lg text-8xl font-bold tracking-tighter">50</h1>
                </div>
                <h5 className="text-sm text-white/80">seconds to wake the service up from a cold start.</h5>
            </div>
            <div className="text-white">
                <h5>Thank you for your consideration. Please wait for a little bit.</h5>
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