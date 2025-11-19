import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";

const PublicRoute = () => {
    const { token } = useAuth();
    return token !== null ? <Navigate to="/dashboard" replace /> : (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
};

export default PublicRoute;
