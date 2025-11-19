// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import OperationBulletinReport from './reports/operation-bulletin-report/operation-bulletin-report-index';
import StyleChangeOver from './reports/style-change-over/style-change-over';
import ThreadConsumptionReport from './reports/thread-consumption-report/thread-consumption-report-index';
import SewingSummaryReportForm from '../garmentsProduction/pages/report/SewingSummaryReportForm';

// lazy loaded
const OperationForm = React.lazy(() => import('./pages/operationSetup/OperationForm'));
const OperationList = React.lazy(() => import('./pages/operationSetup/OperationList'));
const MachinesForm = React.lazy(() => import('./pages/machinesSetup/MachinesSetupForm'));
const MachineStitchForm = React.lazy(() => import('./pages/machinetoStitch/machinesStitchForm'));
const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const MachinesList = React.lazy(() => import('./pages/machinesSetup/MachinesList'));
const OperationTypeList = React.lazy(() => import('./pages/operationTypeSetup/OperationTypeList'));
const OperationTypeForm = React.lazy(() => import('./pages/operationTypeSetup/OperationTypeForm'));

const IERoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />
            <Route path="/machines" element={<MachinesList />} />
            <Route path="/machines/save" element={<MachinesForm />} />
            <Route path="/machine-setup/save/:id" element={<MachinesForm />} />
            <Route path="/machine-to-stich-map" element={<MachineStitchForm />} />
            <Route path="/operation-type" element={<OperationTypeList />} />
            <Route path="/operation-type/entry" element={<OperationTypeForm />} />
            <Route path="/operation-list" element={<OperationList />} />
            <Route path="/operation-list/entry" element={<OperationForm />} />
            <Route path="/sewing-summary-report-form" element={<SewingSummaryReportForm />} />

            {/* ==reports================================ */}
            <Route path="/">
                <Route
                    path="style-change-over-report"
                    element={<StyleChangeOver />}
                />
                <Route
                    path="operation-bulletin-report"
                    element={<OperationBulletinReport />}
                />
                <Route
                    path="thread-consumption-report"
                    element={<ThreadConsumptionReport />}
                />
            </Route>
            {/* ==end-reports================================ */}


            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default IERoutes;
