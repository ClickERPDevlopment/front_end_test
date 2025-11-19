import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import EmbStatusReport from './reports/report/emb-status-report/emb-status-report-index';
import SizeWiseOrderSummaryReport from './reports/report/size-wise-order-summary-report/size-wise-order-summary-report-index';
import SampleProgramReportIndex from './reports/sample-program/report/sample-program-report.-index';
import YarnAdditionalBookingReportIndex from './reports/yarn-additional-booking/yarn-additional-booking-report.-index';
import YarnBookingReportIndex from './reports/booking/yarn-booking-report/yarn-booking-rpt-index';
import FabricBookingReportIndex from './reports/booking/fabric-booking-report/fabric-booking-report-index';
import AtoZReportIndex from './reports/report/a-to-z-report/a-to-z-report-index';
import BudgetReportFormat2 from './reports/report/budget-report -format2/budget-report -format2-index';
import BudgetReport from './reports/report/budget-report/budget-report-index';
import BudgetWiseCostBreakdownIndex from './reports/report/budget-wise-cost-breakdown/budget-wise-cost-breakdown-index';
import CompensationClaimReport from './reports/report/compensation-claim-report/compensation-claim-report-index';
import CreateDateWisePoSummaryReport from './reports/report/create-date-wise-po-summary-report/create-date-wise-po-summary-report-index';
import DateWiseShiplentSummaryReport from './reports/report/date-wise-shiplent-summary-report/date-wise-shiplent-summary-report-index';
import EmblishmentStatusReport from './reports/report/emblishment-status-report/emblishment-status-report-index';
import GeneralBlockFabricStatusReport from './reports/report/general-block-fabric-status-report/components/1general-block-f-status-rpt';
import GeneralBlockFabricStatusView from './reports/report/general-block-fabric-status-report/general-block-f-status-view';
import MaterialOrderYarnDyeingReport from './reports/report/material-order-yarn-dyeing-report/material-order-yarn-dyeing-report-index';
import MonthlyOrderVsShipmentStatusReport from './reports/report/monthly-order-vs-shipment-status-report/monthly-order-vs-shipment-status-report-ndex';
import POwiseFabricAndAccessoriesStatusReport from './reports/report/po-wise-fabric-access-status/po-wise-f-a-s-index';
import ShipmentDelayReportPDF from './reports/report/shipment-delay-report-pdf/shipment-delay-report-pdf-index';
import ShipmentDelayReport from './reports/report/shipment-delay-report/shipment-delay-report-index';
import StyleWiseFabricConsumptionReport from './reports/report/style-wise-fabric-consum-report/style-wise-fabric-consum-report';
import StyleWiseProfitLossReportIndex from './reports/report/style-wise-profit-loss-report/style-wise-profit-loss-report-index';
import AccessoriesWoReport from './reports/work-order/acc-wo-bkl-hangtagsticker-rpt/acc-wo-hangtagsticker-rpt';
import AccessoriesReportWithPo from './reports/work-order/accessories-report-with-po/accessories-with-po-index';
import AccessoriesReport from './reports/work-order/accessories-report/accessories-index';
import BlockAccessoriesReport from './reports/work-order/block-accessories-report/block-accessories-index';
import GeorgeVariousMaterialReport from './reports/work-order/george-various-material-report/george-various-material-index';
import StarcoLabelReport from './reports/work-order/starco-label-report/starco-label-index';
import StarcoStickerReport from './reports/work-order/starco-sticker-report/starco-sticker-index';
import YarnTwistingWorkOrderReport from './reports/work-order/yarn-twisting-wrok-order-rpt/yarn-twisting-wrok-order-rpt-index';
import FinishFabricAllocationReport from './reports/work-order/acc-wo-bkl-carelabel-rpt/acc-wo-bkl-carelabel-rpt';
import GeneralBlockFabricStatusReportIndex from './reports/report/general-block-fabric-status-report/general-block-f-status-rpt-index';
import DateColorWiseShiplentSummaryReport from './reports/report/date-color-wise-shiplent-summary-report/date-color-wise-shiplent-summary-report-index';
import StyleWiseEmbStatusReport from './reports/report/style-wise-emb-status-report/emb-status-report-index';
import BudgetApproval from './reports/report/budget-report/budget-approval';

// lazy loaded
const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const BuyerInfo = React.lazy(() => import('./pages/buyerSetup/BuyerInfo'));
const BuyerList = React.lazy(() => import('./pages/buyerSetup/BuyerList'));
const ColorInfo = React.lazy(() => import('./pages/colorSetup/ColorInfo'));
const ColorList = React.lazy(() => import('./pages/colorSetup/ColorList'));
const SizeInfoForm = React.lazy(() => import('./pages/sizeSetup/SizeInfoForm'));
const SizeList = React.lazy(() => import('./pages/sizeSetup/SizeList'));


const ConfigurationRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />
            <Route path="/buyers" element={<BuyerList />} />
            <Route path="/buyers/entry" element={<BuyerInfo />} />
            <Route path="/colors" element={<ColorList />} />
            <Route path="/colors/entry" element={<ColorInfo />} />
            <Route path="/size" element={<SizeList />} />
            <Route path="/size/entry" element={<SizeInfoForm />} />
            <Route path="/budget-approval" element={<BudgetApproval />} />
            {/* report */}
            <Route path="/">
                <Route
                    path="date-color-wise-shiplent-summary-report"
                    element={<DateColorWiseShiplentSummaryReport />}
                />
                <Route
                    path="emb-status-report"
                    element={<EmbStatusReport />}
                />
                <Route
                    path="style-wise-emb-status-report"
                    element={<StyleWiseEmbStatusReport />}
                />
                <Route
                    path="size-wise-order-summary-report"
                    element={<SizeWiseOrderSummaryReport />}
                />
                <Route path="sample-program">
                    <Route
                        path="sample-program-report"
                        element={<SampleProgramReportIndex />}
                    />
                </Route>
                <Route
                    path="yarn-additional-booking-report"
                    element={<YarnAdditionalBookingReportIndex />}
                />
                <Route path="booking">
                    <Route
                        path="yarn-booking-report"
                        element={<YarnBookingReportIndex />}
                    />
                    <Route
                        path="fabric-booking-report"
                        element={<FabricBookingReportIndex />}
                    />
                </Route>
                <Route path="work-order">
                    <Route
                        path="acc-wo-hangtagsticker-rpt"
                        element={<AccessoriesWoReport />}
                    />
                    <Route
                        path="acc-wo-bkl-carelabel-rpt"
                        element={<FinishFabricAllocationReport />}
                    />
                    <Route
                        path="george-various-material-rpt"
                        element={<GeorgeVariousMaterialReport />}
                    />
                    <Route
                        path="starco-sticker-rpt"
                        element={<StarcoStickerReport />}
                    />
                    <Route
                        path="yarn-twisting-wrok-order-rpt"
                        element={<YarnTwistingWorkOrderReport />}
                    />
                    <Route
                        path="starco-label-rpt"
                        element={<StarcoLabelReport />}
                    />
                    <Route
                        path="block-accessories-rpt"
                        element={<BlockAccessoriesReport />}
                    ></Route>
                    <Route
                        path="accessories-rpt"
                        element={<AccessoriesReport />}
                    ></Route>
                    <Route
                        path="accessories-rpt-with-po"
                        element={<AccessoriesReportWithPo />}
                    ></Route>
                </Route>
                <Route
                    path="style-wise-fabric-comsump-report"
                    element={<StyleWiseFabricConsumptionReport />}
                />
                <Route
                    path="style-wise-profig-loss-report"
                    element={<StyleWiseProfitLossReportIndex />}
                />
                <Route
                    path="a-to-z-report"
                    element={<AtoZReportIndex />}
                />
                <Route
                    path="BudgetWiseCostBreakdown"
                    element={<BudgetWiseCostBreakdownIndex />}
                />
                <Route
                    path="po-wise-fabric-access-status-report"
                    element={<POwiseFabricAndAccessoriesStatusReport />}
                />
                <Route
                    path="general-block-fabric-status-report"
                    element={<GeneralBlockFabricStatusReportIndex />}
                />
                <Route
                    path="general-block-fabric-status-view"
                    element={<GeneralBlockFabricStatusView />}
                />
                <Route
                    path="shipment-delay-rpt"
                    element={<ShipmentDelayReport />}
                ></Route>
                <Route
                    path="shipment-delay-rpt-pdf"
                    element={<ShipmentDelayReportPDF />}
                ></Route>
                <Route
                    path="monthly-order-vs-shipment-status-report"
                    element={<MonthlyOrderVsShipmentStatusReport />}
                ></Route>
                <Route
                    path="emblishment-status-report"
                    element={<EmblishmentStatusReport />}
                ></Route>
                <Route
                    path="create-date-wise-po-summary-report"
                    element={<CreateDateWisePoSummaryReport />}
                ></Route>
                <Route
                    path="compensation-claim-report"
                    element={<CompensationClaimReport />}
                ></Route>
                <Route
                    path="material-order-yarn-dyeing-report"
                    element={<MaterialOrderYarnDyeingReport />}
                ></Route>
                <Route
                    path="budget-report"
                    element={<BudgetReport />}
                ></Route>
                <Route
                    path="budget-report-format2"
                    element={<BudgetReportFormat2 />}
                ></Route>
                <Route
                    path="date-wise-shiplent-summary-report"
                    element={<DateWiseShiplentSummaryReport />}
                ></Route>
            </Route>


            <Route path="*" element={<NotFound />} />
        </Routes>

    </Suspense>
);

export default ConfigurationRoutes;
