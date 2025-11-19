// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import FabricQualityProblemReport from './reports/cuttting/fabric-quality-problem-report/fabric-quality-problem-report-index';
import DateWiseFabricRequisitionReceiveReport from './reports/cuttting/date-wise-fabric-requisition-receive/date-wise-fabric-requisition-receive-index';
import SupervisorWiseCuttingKPIReport from './reports/cuttting/supervisor-wise-cutting-kpi-report/supervisor-wise-cutting-kpi-report-index';
import CompensationReport from './reports/finishing/compensation-report/compensation-report-index';
import FinishFabricReturnCuttingFloorToStoreReport from './reports/finishing/finish-fabric-return-cutting-floor-to-store-report/finish-fabric-return-cutting-floor-to-store-report-index';
import GarmentsDispatchDetailsReport from './reports/finishing/garments-dispatch-details-report/garments-dispatch-details-report-index';
import ReconciliationPendingDoneReport from './reports/finishing/reconciliation-pending-done-report/reconciliation-pending-done-report-index';
import ShortShipmentReasonStatusReport from './reports/finishing/short-shipment-reason-status/short-shipment-reason-status-index';
import DailySewingEfficiencyReport from './reports/sewing/daily-sewing-efficiency-report/daily-sewing-efficiency-report-index';
import GeneralAndOTHoursProductionLineWiseReport from './reports/sewing/general-and-ot-hours-production-line-wise-report/general-and-ot-hours-production-line-wise-report-index';
import GeneralAndOTHoursProductionReport from './reports/sewing/general-and-ot-hours-production-report/general-and-ot-hours-production-report-index';
import OnlineDisplayBoard from './reports/sewing/onlne-display-board';
import OnlineDisplayBoardView from './reports/sewing/onlne-display-board/online-display-board-view';
import SewingInputChallanReport from './reports/sewing/sewing-input-challan-report/sewing-input-challan-report-index';
import SewingProductionStatusReport from './reports/sewing/sewing-production-status-report/sewing-production-status-report-index';
import SewingSummaryReport from './reports/sewing/sewing-summary-report/sewing-summary-report-index';
import StyleWiseAvgEfficiencyReport from './reports/sewing/style-wise-avg-efficiency-report/style-wise-avg-efficiency-report-index';
import SewingInputOutputReport from './reports/sewing/sewing-input-output-report';
import MonthlyStyleWiseProductionSummaryReport from './reports/sewing/monthly-style-wise-production-summary-report';
import MonthlStyleWiseProductionSummaryReportForm from './pages/report/MonthlStyleWiseProductionSummaryReportForm';
import DateWiseSewingProductionReport from './reports/sewing/date-wise-sewing-production-status-report/date-wise-sewing-production-report-index';
import DateWiseCuttingProoductionReport from './reports/cuttting/date-wise-cutting-production-status-report/date-wise-cutting-production-report-index';
import SewingSummaryReportForm from './pages/report/SewingSummaryReportForm';
import DateWiseFinishingProoductionReport from './reports/finishing/date-wise-finishing-production-status-report/date-wise-finishing-production-report-index';

const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const LayerCuttingEntry = React.lazy(() => import('./pages/productionEntry/LayerCuttingEntry'));
const SewingReport = React.lazy(() => import('./pages/report/sewingReport'));
const ManagementReport = React.lazy(() => import('./pages/report/ManagementReport'));
const ShipmentScheduleReport = React.lazy(() => import('./pages/report/ShipmentScheduleReport'));
const GmtProductionStatus = React.lazy(() => import('./pages/report/GmtProductionStatusForm'));
const CuttingTargetForm = React.lazy(() => import('./pages/report/CuttingTargetForm'));
const CuttingEfficiencyReportForm = React.lazy(() => import('./pages/report/CuttingEfficiencyReportForm'));
const SewingTargetForm = React.lazy(() => import('./pages/report/SewingTargetForm'));

const GarmentsProductionStatusReport = React.lazy(() => import('./reports/production/GarmentsProductionStatusReport'));
const SewingTargetReport = React.lazy(() => import('./reports/sewing/sewing-target-report'));
const CuttingEfficiencyReport = React.lazy(() => import('./reports/cuttting/cutting-efficiency-report'));
const CuttingEfficiencyDateRangeReport = React.lazy(() => import('./reports/cuttting/cutting-efficiency-report/DateRangeReport'));
const CuttingTargetReport = React.lazy(() => import('./reports/cuttting/cutting-target-report'));
const CuttingTargetDateRangeReport = React.lazy(() => import('./reports/cuttting/cutting-target-report/DateRangeReport'));

const SewingInputOutputReportForm = React.lazy(() => import('./pages/report/SewingInputOutputReportForm'));
const SewingProductionStatusReportForm = React.lazy(() => import('./pages/report/SewingProductionStatusReportForm'));


const AccountsRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/" element={<GraphDashboard />} />
            <Route path="/layer-cutting-entry" element={<LayerCuttingEntry />} />
            <Route path="/layer-cutting-entry/:id" element={<LayerCuttingEntry />} />
            <Route path="/sewing-hourly-production-report" element={<SewingReport />} />
            <Route path="/management-dashboard-report" element={<ManagementReport />} />
            <Route path="/shipment-schedule-report" element={<ShipmentScheduleReport />} />
            <Route path="/gmt-production-status-report-form" element={<GmtProductionStatus />} />
            <Route path="/cutting-target-report-form" element={<CuttingTargetForm />} />
            <Route path="/cutting-efficiency-report-form" element={<CuttingEfficiencyReportForm />} />
            <Route path="/sewing-target-report-form" element={<SewingTargetForm />} />

            <Route path="/gmt-production-status-report" element={<GarmentsProductionStatusReport />} />
            <Route path="/gmt-sewing-target-report" element={<SewingTargetReport />} />
            <Route path="/gmt-cutting-efficiency-report" element={<CuttingEfficiencyReport />} />
            <Route path="/gmt-cutting-efficiency-date-range-report" element={<CuttingEfficiencyDateRangeReport />} />
            <Route path="/gmt-cutting-target-report" element={<CuttingTargetReport />} />
            <Route path="/gmt-cutting-target-daterange-report" element={<CuttingTargetDateRangeReport />} />

            <Route path="/sewing-input-output-report-form" element={<SewingInputOutputReportForm />} />
            <Route path="/sewing-production-status-report-form" element={<SewingProductionStatusReportForm />} />
            <Route path="/monthl-style-wise-production-summary-report-form" element={<MonthlStyleWiseProductionSummaryReportForm />} />
            <Route path="/sewing-summary-report-form" element={<SewingSummaryReportForm />} />

            {/* ==reports================================ */}
            <Route path="/">
                <Route path="cutting">
                    <Route
                        path="fabric-quality-problem-report"
                        element={<FabricQualityProblemReport />}
                    />
                    <Route
                        path="supervisor-wise-cutting-kpi-report"
                        element={<SupervisorWiseCuttingKPIReport />}
                    />
                </Route>
                <Route path="finishing">
                    <Route
                        path="date-wise-finishing-production-report"
                        element={<DateWiseFinishingProoductionReport />}
                    />
                    <Route
                        path="short-shipment-reason-status-report"
                        element={<ShortShipmentReasonStatusReport />}
                    />
                    <Route
                        path="finish-fabric-return-cutting-floor-to-store-report"
                        element={
                            <FinishFabricReturnCuttingFloorToStoreReport />
                        }
                    />
                    <Route
                        path="reconciliation-pending-done-report"
                        element={<ReconciliationPendingDoneReport />}
                    />
                    <Route
                        path="garments-dispatch-details-report"
                        element={<GarmentsDispatchDetailsReport />}
                    />
                    <Route
                        path="compensation-report"
                        element={<CompensationReport />}
                    />
                </Route>
                <Route path="cutting">
                    <Route
                        path="date-wise-cutting-production-report"
                        element={<DateWiseCuttingProoductionReport />}
                    />
                    <Route
                        path="date-wise-fabric-requisition-receive-report"
                        element={<DateWiseFabricRequisitionReceiveReport />}
                    />
                </Route>
                <Route path="sewing">
                    <Route
                        path="date-wise-sewing-production-report"
                        element={<DateWiseSewingProductionReport />}
                    />
                    <Route
                        path="monthly-style-wise-production-summary-report"
                        element={<MonthlyStyleWiseProductionSummaryReport />}
                    />
                    <Route
                        path="sewing-input-output-report"
                        element={<SewingInputOutputReport />}
                    />
                    <Route
                        path="sewing-summary-report"
                        element={<SewingSummaryReport />}
                    />
                    <Route
                        path="sewing-input-challan-report"
                        element={<SewingInputChallanReport />}
                    />
                    <Route
                        path="daily-sewing-efficiecy-report"
                        element={<DailySewingEfficiencyReport />}
                    />
                    <Route
                        path="sewing-production-status-report"
                        element={<SewingProductionStatusReport />}
                    />
                    <Route
                        path="style-wise-avg-efficiency-report"
                        element={<StyleWiseAvgEfficiencyReport />}
                    />
                    <Route
                        path="general-and-ot-hours-production-report"
                        element={<GeneralAndOTHoursProductionReport />}
                    />
                    <Route
                        path="general-and-ot-hours-production-line-wise-report"
                        element={<GeneralAndOTHoursProductionLineWiseReport />}
                    />
                    <Route
                        path="online-display-board"
                        element={<OnlineDisplayBoard />}
                    />
                    <Route
                        path="online-display-board-view"
                        element={<OnlineDisplayBoardView />}
                    />
                </Route>
            </Route>
            {/* ==end-reports================================ */}

            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default AccountsRoutes;