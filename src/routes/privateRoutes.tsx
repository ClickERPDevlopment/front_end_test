import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DashboardLayout from "../layouts/DashboardLayout";

const PrivateRoute = () => {
    const { token } = useAuth();
    const location = useLocation();

    if (token === null)
        return <Navigate to="/login" replace />;

    const getLayout = () => {
        return <DashboardLayout />;
    };

    return getLayout();
};

export default PrivateRoute;

