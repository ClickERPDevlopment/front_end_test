// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import ImportFabricInspectionInfoReport from './reports/import-fabric-inspection-info/import-fabric-inspection-info-report-index';

const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const DefectRejectTypeForm = React.lazy(() => import('./pages/defectRejectType/DefectRejectTypeForm'));
const DefectRejectTypeList = React.lazy(() => import('./pages/defectRejectType/DefectRejectTypeList'));

const IERoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />
            <Route path="/defect-reject-type" element={<DefectRejectTypeList />} />
            <Route path="/defect-reject-type/entry" element={<DefectRejectTypeForm />} />

            {/* ==reports================================ */}
            <Route path="/">
                <Route
                    path="import-fabric-inspection-info-report"
                    element={<ImportFabricInspectionInfoReport />}
                />
            </Route>
            {/* ==end-reports================================ */}

            <Route path="*" element={<NotFound />} />
        </Routes>

    </Suspense>
);

export default IERoutes;
