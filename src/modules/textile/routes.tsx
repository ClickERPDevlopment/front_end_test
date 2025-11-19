// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import BatchWiseApprovalStatusReport from './reports/Dyeing/batch-wise-approval-status-report/batch-wise-approval-status-report-index';
import BuyerWiseDyeingMonthlySummaryReportIndex from './reports/Dyeing/buyer-wise-dyeing-monthly-summ/buyer-wise-dyeing-monthly-summ-rpt-index';
import BuyerWiseDyeingMonthlySummaryReportView from './reports/Dyeing/buyer-wise-dyeing-monthly-summ/buyer-wise-dyeing-monthly-summ-view';
import BuyerWiseGreyFabricReceiveIndex from './reports/Dyeing/buyer-wise-grey-fabric-receive/buyer-wise-grey-fabric-receive-index';
import BuyerWiseGreyFabricReceiveView from './reports/Dyeing/buyer-wise-grey-fabric-receive/buyer-wise-grey-fabric-receive-view';
import DyeingBuyerWiseGreyStockReport from './reports/Dyeing/dyeing-buyer-wise-grey-stock-report/dyeing-buyer-wise-grey-stock-report';
import GreyBatchStatusReport from './reports/Dyeing/grey-batch-status-report/grey-batch-status-report';
import GreyFabricProcessChallanReport from './reports/Dyeing/grey-fabric-process-challan-report/grey-fabric-process-challan-report-index';
import InHouseBatchWiseFabricDeliveryReport from './reports/Dyeing/in-house-batch-wise-fabric-delivery-report - Copy/in-house-batch-wise-fabric-delivery-report-index';
import ProcessWiseDyeingFinishProductionReport from './reports/Dyeing/process-wise-dyeing-finish-production/process-wise-dyeing-finish-production-index';
import SubcontractBatchWiseFabricDeliveryReport from './reports/Dyeing/subcontract-batch-wise-fabric-delivery-report/subcontract-batch-wise-fabric-delivery-report-index';
import DailyKnittingUpdateReport from './reports/knitting/daily-knitting-update/daily-knitting-update';
import DateWiseKnittingProgramReport from './reports/knitting/date-wise-knitting-program-report/date-wise-knitting-program-report-index';
import KnittingProductionReport from './reports/knitting/knitting-production-report/knitting-production-report-index';
import KnittingProgramReport from './reports/knitting/knitting-program-report/knitting-program-report-index';
import PartyWiseKnittingProgramReport from './reports/knitting/party-wise-knitting-program-report/party-wise-knitting-program-report-index';
import GreyFabricIssueChallanReport from './reports/knitting/grey-fabric-issue-challan-report/grey-fabric-issue-challan-report-index';
import DyeingFinishingChemicalUsedReport from './reports/Dyeing/dyeing-finishing-chemical-used-report';
import MonthlyKnittingProdSummaryReportIndex from './reports/knitting/monthly-knitting-pro-summary-report/monthly-knitting-pro-summary-report-index';

const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));

const ConfigurationRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />
            {/* ==reports================================ */}
            <Route path="/">
                <Route path="knitting">
                    <Route
                        path="date-wise-knitting-program-report"
                        element={<DateWiseKnittingProgramReport />}
                    />
                    <Route
                        path="knitting-production-report"
                        element={<KnittingProductionReport />}
                    />
                    <Route
                        path="daily-knitting-update"
                        element={<DailyKnittingUpdateReport />}
                    />
                    <Route
                        path="grey-fabric-challan-report"
                        element={<GreyFabricIssueChallanReport />}
                    />
                    <Route
                        path="knitting-program-report"
                        element={<KnittingProgramReport />}
                    />
                    <Route
                        path="party-wise-knitting-program-report"
                        element={<PartyWiseKnittingProgramReport />}
                    />
                    <Route
                        path="monthly-knitting-pro-summary-report"
                        element={<MonthlyKnittingProdSummaryReportIndex />}
                    />
                </Route>
                <Route path="dyeing">

                    <Route
                        path="dyeing-finishing-chemical-used-report"
                        element={<DyeingFinishingChemicalUsedReport />}
                    /><Route
                        path="grey-fabric-process-challan-report"
                        element={<GreyFabricProcessChallanReport />}
                    />
                    <Route
                        path="grey-batch-status-report"
                        element={<GreyBatchStatusReport />}
                    />
                    <Route
                        path="dyeing-buyer-wise-grey-stock-report"
                        element={<DyeingBuyerWiseGreyStockReport />}
                    />
                    <Route
                        path="buyer-wise-grey-fabric-receive-view"
                        element={<BuyerWiseGreyFabricReceiveView />}
                    />
                    <Route
                        path="buyer-wise-grey-fabric-receive"
                        element={<BuyerWiseGreyFabricReceiveIndex />}
                    />
                    <Route
                        path="batch-wise-approval-status-report"
                        element={<BatchWiseApprovalStatusReport />}
                    />
                    <Route
                        path="buyer-wise-dyeing-monthly-summ-view"
                        element={<BuyerWiseDyeingMonthlySummaryReportView />}
                    />
                    <Route
                        path="buyer-wise-dyeing-monthly-summ-rpt-index"
                        element={<BuyerWiseDyeingMonthlySummaryReportIndex />}
                    />
                    <Route
                        path="process-wise-dyeing-finish-production-rpt"
                        element={<ProcessWiseDyeingFinishProductionReport />}
                    />
                    <Route
                        path="subcontract-batch-wise-fabric-delivery-report"
                        element={<SubcontractBatchWiseFabricDeliveryReport />}
                    />
                    <Route
                        path="in-house-batch-wise-fabric-delivery-report"
                        element={<InHouseBatchWiseFabricDeliveryReport />}
                    />
                </Route>
            </Route>
            {/* ==end-reports================================ */}

            <Route path="*" element={<NotFound />} />
        </Routes>

    </Suspense>
);

export default ConfigurationRoutes;
