import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DashboardLayoutWinApp from "../layouts/DashboardLayoutWinApp";

const PrivateRouteForWinApp = () => {
    const { token } = useAuth();
    return  <DashboardLayoutWinApp />
};

export default PrivateRouteForWinApp;
