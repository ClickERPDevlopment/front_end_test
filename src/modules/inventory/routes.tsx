// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Route, Routes, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import InventorySaleApproval from './pages/inventorySale/InventorySaleApproval';
import InventorySaleApprovalForm from './pages/inventorySale/InventorySaleApprovalForm';
import AccessoriesIssueReturnChallanReport from './reports/accessories-store/accessories-issue-return-challan-report/accessories-issue-return-challan-report-index';
import AccessoriesReceiveReturnChallanGatePassReport from './reports/accessories-store/accessories-receive-return-challan-gatepass-report/accessories-receive-return-challan-gatepass-report-index';
import AccessoriesReceiveStatusByChallanNoReport from './reports/accessories-store/accessories-receive-status-by-challan-no-report/accessories-receive-status-by-challan-no-report-index';
import DateWiseFabricPurchaseReceiveRegisterReport from './reports/finish-store/date-wise-fabric-purchase-receive-register-report/date-wise-fabric-purchase-receive-register-report-index';
import DateWiseFinishFabricReceiveAndIssueRegisterReportIndex from './reports/finish-store/DateWiseFinishFabricReceiveAndIssueRegisterReport/DateWiseFinishFabricReceiveAndIssueRegisterReport-index';
import DyeingBillChallanWiseSummaryIndex from './reports/finish-store/dyeing-bill-challan-wise-summary/dyeing-bill-challan-wise-summary-index';
import DyeingBillChallanWiseSummaryView from './reports/finish-store/dyeing-bill-challan-wise-summary/dyeing-bill-challan-wise-summary-view';
import FabricReceiveReturnChallanGatePassReport from './reports/finish-store/fabric-receive-return-challan-gate-pass-report/fabric-receive-return-challan-gate-pass-report-index';
import FinishFabricReceiveChallanReport from './reports/finish-store/finish-fabric-receive-challan-report/finish-fabric-receive-challan-report-index';
import FinishFabricStockReportIndex from './reports/finish-store/finish-fabric-stock-report/finish-fabric-stock-report-index';
import OrderWiseFinishFabricDeliveryReport from './reports/finish-store/order-wise-finish-fabric-delivery-report/order-wise-ff-delivery-report-index';
import DateWiseGreyFabcirDeliveryToDyeingReport from './reports/grey-store/date-wise-grey-fabric-delivery-to-dyeing-report/date-wise-grey-fabric-delivery-to-dyeing-report-index';
import DateWiseYarnAndGreyFabricStockReport from './reports/grey-store/date-wise-yarn-and-grey-stock-report/date-wise-yarn-and-grey-stock-report-index';
import GreyFabricIssueToDyeingChallanIndex from './reports/grey-store/grey-fabric-issue-to-dyeing-challan/grey-fabric-issue-to-dyeing-challan-index';
import GreyFabricReceiveStatusReportIndex from './reports/grey-store/grey-fabric-rcv-status-report/grey-fabric-rcv-status-report-index';
import GreyFabricTransferReport from './reports/grey-store/grey-fabric-transfer-report/grey-fabric-transfer-report-index';
import GreyFabricStockReportIndex from './reports/grey-store/grey-stock-report/grey-stock-report-index';
import KnittingBillChallanWiseSummaryReportIndex from './reports/grey-store/knitting-bill-challan-wise-summary/knitting-bill-challan-wise-summary-index';
import KnittingBillChallanWiseSummaryView from './reports/grey-store/knitting-bill-challan-wise-summary/knitting-bill-challan-wise-summary-view';
import MonthlyKnitProSumOutsideReport from './reports/grey-store/monthly-knit-pro-sum-outside/monthly-knit-pro-sum-outside-report';
import MonthlyKnitProSumOutsideView from './reports/grey-store/monthly-knit-pro-sum-outside/monthly-knit-pro-sum-outside-view';
import BuyerWiseYarnPossitionReportIndex from './reports/yarn-store/buyer-wise-yarn-possition-report/buyer-wise-yarn-possition-report-index';
import DateWiseYarnAllocationReport from './reports/yarn-store/date-wise-yarn-allocation-report/date-wise-yarn-allocation-report-index';
import DateWiseYarnReceiveRegisterReport from './reports/yarn-store/date-wise-yarn-receive-register-report/date-wise-yarn-receive-register-report-index';
import KnittingDyeingPriceOverviewReport from './reports/yarn-store/knit-dyeing-price-overview-report/knit-dyeing-price-overview-report-index';
import LotWiseYarnStockReport from './reports/yarn-store/lot-wise-yarn-stock-report/lot-wise-yarn-stock-report-index';
import MonthlyYarnCostingReport from './reports/yarn-store/monthly-yarn-costing-report/monthly-yarn-costing-report-index';
import OrderWiseKnittingDyeingStatusReportIndexF2 from './reports/yarn-store/order-wise-knit-dyeing-status-report-f2/order-wise-knit-dyeing-status-report-index-f2';
import OrderWiseKnittingDyeingStatusReportIndex from './reports/yarn-store/order-wise-knit-dyeing-status-report/order-wise-knit-dyeing-status-report-index';
import OutSideYIssueGrcvStatusReport from './reports/yarn-store/outside-yissue-grcv-status/outside-yissue-grcv-status';
import PartyWiseYanrIssueAndGreyRcvSummaryIndex from './reports/yarn-store/partywise-yarnissue-greyrcv-balance-summary-report/partyw-yarni-greyr-balance-sum-rpt-index';
import YarnDeliveryChallanGatePassReport from './reports/yarn-store/yarn-delivery-challan-gate-pass-report/yarn-delivery-challan-gate-pass-report-index';
import YarnIssueForDyeingReportIndex from './reports/yarn-store/yarn-issue-for-dyeing-report/yarn-issue-for-dyeing-report-index';
import YarnIssueForTwistingReportIndex from './reports/yarn-store/yarn-issue-for-twisting-report/yarn-issue-for-twisting-report-index';
import YarnRcvIssueRegisterReport from './reports/yarn-store/yarn-rcv-issue-register-report/yarn-rcv-issue-register-report-index';
import YarnReturnChallanReport from './reports/yarn-store/yarn-return-challan-report/yarn-return-challan-report-index';
import YarnStockAfterAlloctionReport from './reports/yarn-store/yarn-stock-after-allocation-report/yarn-stock-after-allocation-report-index';
import YarnTransferReportFormat2 from './reports/yarn-store/yarn-transfer-report-format2/yarn-transfer-report-index';
import YarnTransferChallanReport from './reports/yarn-store/yarn-transfer-report/yarn-transfer-report-index';
import YarnIssueStatusReportIndex from './reports/yarn-store/yissue-status-report/yarn-issue-status-report-index';
import MaterialReceiveReport from './reports/yarn-store/material-receive-report/material-receive-report-index';
import InventorySaleBillReport from './reports/inventory-sale/InventorySaleBillReport';
import InventorySaleChallanReport from './reports/inventory-sale/InventorySaleChallanReport';
import ChallanwiseAccessoriesReceiveReport from './reports/accessories-store/challanwise-accessories-receive-report/index';

// lazy loaded
const UomList = React.lazy(() => import('./pages/uomSetup/UomList'));
const UomForm = React.lazy(() => import('./pages/uomSetup/UomForm'));
const MaterialGroupList = React.lazy(() => import('./pages/materialGroupSetup/MaterialGroupList'));
const MaterialGroupForm = React.lazy(() => import('./pages/materialGroupSetup/MaterialGroupForm'));
const MaterialSubGroupList = React.lazy(() => import('./pages/materialSubGroupSetup/MaterialSubGroupList'));
const MaterialSubGroupForm = React.lazy(() => import('./pages/materialSubGroupSetup/MaterialSubGroupForm'));
const MaterialInfoForm = React.lazy(() => import('./pages/materialInfo/MaterialInfoForm'));
const StoreInfoForm = React.lazy(() => import('./pages/store/StoreInfoForm'));
const InventorySaleForm = React.lazy(() => import('./pages/inventorySale/InventorySaleForm'));
const InventorySaleList = React.lazy(() => import('./pages/inventorySale/InventorySaleList'));
const GatePassForm = React.lazy(() => import('../procurement/pages/gatePass/GatePassForm'));
const GatePassList = React.lazy(() => import('../procurement/pages/gatePass/GatePassList'));
const GatePassReturnReceiveForm = React.lazy(() => import('../procurement/pages/gatePassReturnReceive/GatePassReturnReceiveForm'));
const GatePassReturnReceiveList = React.lazy(() => import('../procurement/pages/gatePassReturnReceive/GatePassReturnReceiveList'));
const GatePassApprovalList = React.lazy(() => import('../procurement/pages/gatePassApproval/GatePassApprovalList'));
const GatePassApprovalForm = React.lazy(() => import('../procurement/pages/gatePassApproval/GatePassApprovalForm'));
const GatePassOut = React.lazy(() => import('../procurement/pages/gatePassOut/GatePassOutList'));


const InventoryRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/uom" element={<UomList />} />
            <Route path="/uom/entry" element={<UomForm />} />
            <Route path="/material-group" element={<MaterialGroupList />} />
            <Route path="/material-group/entry" element={<MaterialGroupForm />} />
            <Route path="/material-sub-group" element={<MaterialSubGroupList />} />
            <Route path="/material-sub-group/entry" element={<MaterialSubGroupForm />} />
            <Route path="/material-info-save" element={<MaterialInfoForm />} />
            <Route path="/store-list/entry" element={<StoreInfoForm />} />

            <Route path="/inventory-sale" element={<InventorySaleList />} />
            <Route path="/inventory-sale/entry" element={<InventorySaleForm />} />
            <Route path="/inventory-sale/entry/:id" element={<InventorySaleForm />} />
            <Route path="/inventory-sale/challan-report" element={<InventorySaleChallanReport />} />
            <Route path="/inventory-sale/bill-report" element={<InventorySaleBillReport />} />


            <Route path="/inventory-sale-approval-list" element={<InventorySaleApproval />} />
            <Route path="/inventory-sale-approval-list/approve/:id" element={<InventorySaleApprovalForm />} />


            {/* gate pass */}
            <Route path="/gatepass-list" element={<GatePassList />} />
            <Route path="/gatepass-list/entry" element={<GatePassForm />} />
            <Route path="/gatepass-list/entry/:id" element={<GatePassForm />} />

            <Route path="/gatepass-return-receive-list" element={<GatePassReturnReceiveList />} />
            <Route path="/gatepass-return-receive-list/:id" element={<GatePassReturnReceiveForm />} />
            <Route path="/gatepass-approvals" element={<GatePassApprovalList />} />
            <Route path="/gatepass-approvals/:id" element={<GatePassApprovalForm />} />
            <Route path="/gatepass-out-list" element={<GatePassOut />} />


            {/* ==reports================================ */}

            < Route path="/">
                <Route path="accessories-store">
                    <Route
                        path="accessories-receive-return-challan-gatepass-report"
                        element={
                            <AccessoriesReceiveReturnChallanGatePassReport />
                        }
                    />
                    <Route
                        path="accessories-issue-return-challan-report"
                        element={<AccessoriesIssueReturnChallanReport />}
                    />
                    <Route
                        path="monthly-yarn-costing-report"
                        element={<MonthlyYarnCostingReport />}
                    />
                    <Route
                        path="partywise-yarnissue-greyrcv-balance-summary-report"
                        element={<PartyWiseYanrIssueAndGreyRcvSummaryIndex />}
                    />
                    <Route
                        path="accessories-receive-status-by-challan-no-report"
                        element={<AccessoriesReceiveStatusByChallanNoReport />}
                    />
                    <Route
                        path="challanwise-accessories-receive-report"
                        element={<ChallanwiseAccessoriesReceiveReport />}
                    />
                </Route>
                <Route path="yarn-store">
                    <Route
                        path="material-receive-report"
                        element={<MaterialReceiveReport />}
                    />
                    <Route
                        path="knit-dyeing-price-overview-report"
                        element={<KnittingDyeingPriceOverviewReport />}
                    />
                    <Route
                        path="yarn-rcv-issue-register-report"
                        element={<YarnRcvIssueRegisterReport />}
                    />
                    <Route
                        path="date-wise-yarn-allocation-report"
                        element={<DateWiseYarnAllocationReport />}
                    />
                    <Route
                        path="lot-wise-yarn-stock-report"
                        element={<LotWiseYarnStockReport />}
                    />
                    <Route
                        path="yarn-stock-after-alloction-report"
                        element={<YarnStockAfterAlloctionReport />}
                    />
                    <Route
                        path="yarn-return-challan-report"
                        element={<YarnReturnChallanReport />}
                    />
                    <Route
                        path="yarn-transfer-challan-report"
                        element={<YarnTransferChallanReport />}
                    />
                    <Route
                        path="yarn-transfer-challan-report-format2"
                        element={<YarnTransferReportFormat2 />}
                    />
                    <Route
                        path="order-wise-knit-dyeing-status-report"
                        element={<OrderWiseKnittingDyeingStatusReportIndex />}
                    />
                    <Route
                        path="order-wise-knit-dyeing-status-report-f2"
                        element={<OrderWiseKnittingDyeingStatusReportIndexF2 />}
                    />
                    <Route
                        path="outside-yissue-grcv-status-report"
                        element={<OutSideYIssueGrcvStatusReport />}
                    />
                    <Route
                        path="yarn-issue-status-report"
                        element={<YarnIssueStatusReportIndex />}
                    />
                    <Route
                        path="Buyer-Wise-Yarn-Possition-Report"
                        element={<BuyerWiseYarnPossitionReportIndex />}
                    />
                    <Route
                        path="yarn-issue-for-dyeing-report"
                        element={<YarnIssueForDyeingReportIndex />}
                    />
                    <Route
                        path="yarn-issue-for-twisting-report"
                        element={<YarnIssueForTwistingReportIndex />}
                    />
                    <Route
                        path="monthly-yarn-costing-report"
                        element={<MonthlyYarnCostingReport />}
                    />
                    <Route
                        path="partywise-yarnissue-greyrcv-balance-summary-report"
                        element={<PartyWiseYanrIssueAndGreyRcvSummaryIndex />}
                    />
                    <Route
                        path="yarn-delivery-challan-gate-pass-report"
                        element={<YarnDeliveryChallanGatePassReport />}
                    />
                    <Route
                        path="date-wise-yarn-receive-register-report"
                        element={<DateWiseYarnReceiveRegisterReport />}
                    />
                </Route>
                <Route path="grey-store">
                    <Route
                        path="monthly-knit-pro-sum-outside-view"
                        element={<MonthlyKnitProSumOutsideView />}
                    />
                    <Route
                        path="monthly-knit-pro-sum-outside-report"
                        element={<MonthlyKnitProSumOutsideReport />}
                    />
                    <Route
                        path="knitting-bill-challan-wise-summary-index"
                        element={<KnittingBillChallanWiseSummaryReportIndex />}
                    />
                    <Route
                        path="knitting-bill-challan-wise-summary-view"
                        element={<KnittingBillChallanWiseSummaryView />}
                    />

                    <Route
                        path="grey-fabric-transfer-report"
                        element={<GreyFabricTransferReport />}
                    />
                    <Route
                        path="grey-fabric-stock-report"
                        element={<GreyFabricStockReportIndex />}
                    />
                    <Route
                        path="grey-fabric-receive-status-report"
                        element={<GreyFabricReceiveStatusReportIndex />}
                    />
                    <Route
                        path="grey-fabric-issue-to-dyeing-challan"
                        element={<GreyFabricIssueToDyeingChallanIndex />}
                    />
                    <Route
                        path="date-wise-yarn-and-grey-fabric-stock-report"
                        element={<DateWiseYarnAndGreyFabricStockReport />}
                    />
                    <Route
                        path="date-wise-grey-fabric-delivery-to-dyeing-report"
                        element={<DateWiseGreyFabcirDeliveryToDyeingReport />}
                    />
                </Route>
                <Route path="finish-fabric-store">
                    <Route
                        path="finish-fabric-stock-report"
                        element={<FinishFabricStockReportIndex />}
                    />
                    <Route
                        path="finish-fabric-receive-challan-report"
                        element={<FinishFabricReceiveChallanReport />}
                    />
                    <Route
                        path="date-wise-fabric-purchase-receive-register-report"
                        element={<DateWiseFabricPurchaseReceiveRegisterReport />}
                    />
                    <Route
                        path="date-wise-f-fabric-receive-issue-register-report"
                        element={<DateWiseFinishFabricReceiveAndIssueRegisterReportIndex />}
                    />
                    <Route
                        path="order-wise-finish-fabric-delivery-report"
                        element={<OrderWiseFinishFabricDeliveryReport />}
                    />
                    <Route
                        path="dyeing-bill-challan-wise-summary-view"
                        element={<DyeingBillChallanWiseSummaryView />}
                    />
                    <Route
                        path="dyeing-bill-challan-wise-summary-index"
                        element={<DyeingBillChallanWiseSummaryIndex />}
                    />
                    <Route
                        path="fabric-receive-return-challan-gate-pass-report"
                        element={<FabricReceiveReturnChallanGatePassReport />}
                    />
                </Route>
            </Route>
            {/* ==end-reports================================ */}

            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default InventoryRoutes;
