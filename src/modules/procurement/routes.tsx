// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Route, Routes, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import PurchaseOrderRequisitionReport from './crystalReportPreview/PurchaseOrderRequisitionReport';
// lazy loading of components
const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const PurchaseRequisitionForm = React.lazy(() => import('./pages/purchaseRequisition/PurchaseRequisitionList'));
const PurchaseRequisitionDetailsForm = React.lazy(() => import('./pages/purchaseRequisition/PurchaseRequisitionList'));
const PurchaseRequisitionList = React.lazy(() => import('./pages/purchaseRequisitionDetails/PurchaseRequisitionDetailsForm'));
const PurchaseRequisitionHistoryForm = React.lazy(() => import('./pages/purchaseRequisitionHistory/PurchaseRequisitionHistoryForm'));
const PoReleaseApprovalForm = React.lazy(() => import('./pages/poRelease/PoReleaseApprovalForm'));
const PoReleaseApprovalList = React.lazy(() => import('./pages/poRelease/PoReleaseApprovalList'));

{/* Crystal reports  */ }
const PurchaseOrderCrystalReport = React.lazy(() => import('./crystalReportPreview/PurchaseOrderCrystalReport'));

const ProcurementRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />

            {/* purchase requisition */}
            <Route path="/purchase-requisition-approval" element={<PurchaseRequisitionList />} />
            <Route path="/purchase-requisition-add" element={<PurchaseRequisitionForm />} />
            <Route path="/purchase-requisition-details" element={<PurchaseRequisitionDetailsForm />} />
            <Route path="/purchase-requisition-details/:id" element={<PurchaseRequisitionDetailsForm />} />
            <Route path="/purchase-requisition-history" element={<PurchaseRequisitionHistoryForm />} />

            <Route path="/po-unreleased-list" element={<PoReleaseApprovalList />} />
            <Route path="/po-unreleased-list/approve/:id" element={<PoReleaseApprovalForm />} />

            {/* Crystal reports  */}
            <Route path="/purchase-order-report/:id" element={<PurchaseOrderCrystalReport />} />
            <Route path="/purchase-requisition-report/:id" element={<PurchaseOrderRequisitionReport />} />
            <Route path="/purchase-requisition-report/:id" element={<PurchaseOrderRequisitionReport />} />

            {/* not found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default ProcurementRoutes;
