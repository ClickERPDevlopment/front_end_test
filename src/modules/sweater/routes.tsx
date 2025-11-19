// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import ImportFabricInspectionInfoReport from '../quality/reports/import-fabric-inspection-info/import-fabric-inspection-info-report-index';
import LineLoadingPlanIndex from './reports/line-loading-plan-report/line-loading-plan-index';

const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));

const SweaterRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />
            {/* ==reports================================ */}
            <Route path="/">
                <Route path="swt-planning">
                    {/* <Route index element={<PlanningBoardConfigureIndex />} /> */}
                    <Route
                        path="line-loading-plan"
                        element={<LineLoadingPlanIndex />}
                    />
                </Route>
            </Route>
            {/* ==end-reports================================ */}

            <Route path="*" element={<NotFound />} />
        </Routes>

    </Suspense>
);

export default SweaterRoutes;
