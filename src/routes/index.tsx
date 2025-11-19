import { BrowserRouter, Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PrivateRoute from "./privateRoutes";
import PublicRoute from "./publicRoutes";
import PrivateRouteForWinApp from "./privateRoutesForWinApp";
import AccountsRoutes from "../modules/accounts/routes";
import PlanningRoutes from "../modules/planning/routes";
import PrintingRoutes from "../modules/printingEmbroidery/routes";
import CommercialRoutes from "../modules/commercial/routes";
import HrPayrollRoutes from "../modules/hrPayroll/routes";
import TextileRoutes from "../modules/textile/routes";
import TransportLogisticsRoutes from "../modules/transportLogistics/routes";
import MerchandisingRoutes from "../modules/merchandising/routes";
import ConfigurationRoutes from "../modules/configurations/routes";
import GarmentsProductionRoutes from "../modules/garmentsProduction/routes";
import Login from "../pages/auth/Login";
import DashboardHome from "../pages/dashboard/DashboardHome";
import EditorComponentUse from "../pages/Working/EditorUse";
import InputBoxUse from "../pages/Working/InputBoxUse";
import PanelUse from "../pages/Working/PanelUse";
import TableUseBasic from "../pages/Working/TableUseBasic";
import TableUseGoogle from "../pages/Working/TableUseGoogle";
import TableUseInput from "../pages/Working/TableUseInput";
import TestForm from "../pages/Working/TestForm";
import ProgressBarController from "../components/feedback-interaction/ProgressBarController";
import { Suspense } from "react";
import ModalWrapper from "@/components/feedback-interaction/ModalWrapper";
import InventoryRoutes from "@/modules/inventory/routes";
import IERoutes from "@/modules/iE/routes";
import QualityRoutes from "@/modules/quality/routes";
import ProcurementRoutes from "@/modules/procurement/routes";
import ReportRoutes from "@/modules/reports/routes";
import FinishFabricAllocationReport from "@/modules/inventory/reports/finish-store/finish-fabric-allocation-report/finish-fabric-allocation-report";
import FinishFabricAllocationSummaryReport from "@/modules/inventory/reports/finish-store/finish-fabric-allocation-summary-report/finish-fabric-allocation-summary-report";
import SweaterRoutes from "@/modules/sweater/routes";
import ManagementRoutes from "@/modules/management/routes";
import CrystalReportLayout from "@/layouts/CrystalReportLayout";
import ReportRouteLayout from "./ReportRouteLayout";

const AppRoutes = () => {
    const { token } = useAuth();
    const location = useLocation();

    // Check if this route was triggered with a background
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Suspense>
                <ProgressBarController />
                <Routes location={state?.backgroundLocation || location}>
                    {/* Default redirect based on auth */}
                    <Route path="/" element={<Navigate to={token !== null ? "/webapp/dashboard" : "/login"} />} />

                    {/* Public routes */}
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                    </Route>

                    {/* WebApp Group */}
                    <Route path="/webapp" element={<PrivateRoute />}>
                        <Route path="merchandising/*" element={<MerchandisingRoutes />} />
                        <Route path="blank-page" element={<></>} />
                        <Route path="dashboard" element={<DashboardHome />} />
                        <Route path="Management/*" element={<ManagementRoutes />} />
                        <Route path="FinancialAccounting/*" element={<AccountsRoutes />} />
                        <Route path="GarmentsProduction/*" element={<GarmentsProductionRoutes />} />
                        <Route path="ProductionPlanning/*" element={<PlanningRoutes />} />
                        <Route path="PrintingEmbroidery/*" element={<PrintingRoutes />} />
                        <Route path="MasterSettings/*" element={<ConfigurationRoutes />} />
                        <Route path="InventoryControl/*" element={<InventoryRoutes />} />
                        <Route path="IndustrialEngineering/*" element={<IERoutes />} />
                        <Route path="QualityControl/*" element={<QualityRoutes />} />
                        <Route path="Procurement/*" element={<ProcurementRoutes />} />
                        <Route path="Commercial/*" element={<CommercialRoutes />} />
                        <Route path="TextileManufacturing/*" element={<TextileRoutes />} />
                        <Route path="TransportLogistics/*" element={<TransportLogisticsRoutes />} />
                        <Route path="MarketingMerchandising/*" element={<MerchandisingRoutes />} />
                        <Route path="HRPayroll/*" element={<HrPayrollRoutes />} />
                        {/*  */}
                        <Route path="dashboard" element={<DashboardHome />} />
                        <Route path="accounts/*" element={<AccountsRoutes />} />
                        <Route path="gmt-production/*" element={<GarmentsProductionRoutes />} />
                        <Route path="gmt-planning/*" element={<PlanningRoutes />} />
                        <Route path="printing/*" element={<PrintingRoutes />} />

                        <Route path="report/*" element={<ReportRoutes />} />
                    </Route>

                    {/* WinApp Group (temporary/testing routes) */}
                    <Route path="/winapp" element={<PrivateRouteForWinApp />}>
                        <Route path="merchandising/*" element={<MerchandisingRoutes />} />
                        <Route path="blank-page" element={<></>} />
                        <Route path="dashboard" element={<DashboardHome />} />
                        <Route path="Management/*" element={<ManagementRoutes />} />
                        <Route path="FinancialAccounting/*" element={<AccountsRoutes />} />
                        <Route path="GarmentsProduction/*" element={<GarmentsProductionRoutes />} />
                        <Route path="ProductionPlanning/*" element={<PlanningRoutes />} />
                        <Route path="PrintingEmbroidery/*" element={<PrintingRoutes />} />
                        <Route path="MasterSettings/*" element={<ConfigurationRoutes />} />
                        <Route path="InventoryControl/*" element={<InventoryRoutes />} />
                        <Route path="IndustrialEngineering/*" element={<IERoutes />} />
                        <Route path="QualityControl/*" element={<QualityRoutes />} />
                        <Route path="Procurement/*" element={<ProcurementRoutes />} />
                        <Route path="Commercial/*" element={<CommercialRoutes />} />
                        <Route path="TextileManufacturing/*" element={<TextileRoutes />} />
                        <Route path="TransportLogistics/*" element={<TransportLogisticsRoutes />} />
                        <Route path="MarketingMerchandising/*" element={<MerchandisingRoutes />} />
                        <Route path="HRPayroll/*" element={<HrPayrollRoutes />} />

                        <Route path="dashboard" element={<DashboardHome />} />
                        <Route path="accounts/*" element={<AccountsRoutes />} />
                        <Route path="gmt-production/*" element={<GarmentsProductionRoutes />} />
                        <Route path="gmt-planning/*" element={<PlanningRoutes />} />
                        <Route path="printing/*" element={<PrintingRoutes />} />

                        <Route path="report/*" element={<ReportRoutes />} />

                    </Route>

                    {/* WinApp Group (temporary/testing routes) */}
                    <Route path="/report" element={<ReportRouteLayout />}>
                        <Route path="merchandising/*" element={<MerchandisingRoutes />} />
                        <Route path="production/*" element={<GarmentsProductionRoutes />} />
                        <Route path="planning/*" element={<PlanningRoutes />} />
                        <Route path="textile/*" element={<TextileRoutes />} />
                        <Route path="store/*" element={<InventoryRoutes />} />
                        <Route path="ie/*" element={<IERoutes />} />
                        <Route path="quality/*" element={<QualityRoutes />} />
                        <Route path="sweater/*" element={<SweaterRoutes />} />
                        <Route path="inventory/*" element={<InventoryRoutes />} />
                        <Route path="embellishment/*" element={<PrintingRoutes />} />


                        {/* ========================================================================== */}
                        <Route path="ff-allocation-report" element={<FinishFabricAllocationReport />} />
                        <Route path="ff-allocation-summary-report" element={<FinishFabricAllocationSummaryReport />} />
                        {/* ========================================================================== */}

                    </Route>

                    <Route path="/crystal-report" element={<CrystalReportLayout />}>
                        <Route path="procurement/*" element={<ProcurementRoutes />} />

                    </Route>


                    {/* Fallback */}
                    <Route path="*" element={<Navigate to={token !== null ? "/webapp/dashboard" : "/login"} />} />
                </Routes>
                {/* Modal overlay route */}
                {state?.backgroundLocation && (
                    <Routes>
                        <Route path="/webapp/modal/:type/:action" element={<ModalWrapper />} />
                    </Routes>
                )}
            </Suspense>
        </>
    );
};

export default AppRoutes;
