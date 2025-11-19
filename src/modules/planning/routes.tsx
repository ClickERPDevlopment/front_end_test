// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import InternalProductPlacementSheetReport from './reports/internal-product-placement-sheet-summary-report/internal-product-placement-sheet-report-index';
import JobBreakdownReport from './reports/job-breakdown-report/job-breakdown-report-index';
import StyleWiseOrderDetailsReport from './reports/style-wise-order-details-report/style-wise-order-details-report-index';

const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const TnaDashboard = React.lazy(() => import('./pages/dashboard/TnaDashboard'));
const TnaTaskManager = React.lazy(() => import('./pages/tnaTaskSetup/TnaTaskManager'));
const TnaManager = React.lazy(() => import('./pages/tnaSetup/TnaManager'));
const TnaTemplateManager = React.lazy(() => import('./pages/tnaTemplateSetup/TnaTemplateManager'));
const PlanningWorkingTeamList = React.lazy(() => import('./pages/planningWorkingTeam/PlanningWorkingTeamList'));
const PlanningWorkingTeamForm = React.lazy(() => import('./pages/planningWorkingTeam/PlanningWorkingTeamForm'));
const PlanningCalendarForm = React.lazy(() => import('./pages/planningCalendar/PlanningCalendarForm'));
const TnaDetailReport = React.lazy(() => import('./pages/tnaReport/TnaDetailReport'));
const TnaAchievementReport = React.lazy(() => import('./pages/tnaReport/TnaAchievementReport'));
const TnaSummaryReport = React.lazy(() => import('./pages/tnaReport/TnaSummaryReport'));
const OtherBoard = React.lazy(() => import('./pages/tnaReport/ExternalApp'));

const AccountsRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/" element={<TnaDashboard />} />
            <Route path="/tna-dashboard" element={<TnaDashboard />} />
            <Route path="/tna-task-setup" element={<TnaTaskManager />} />
            <Route path="/tna-template-setup" element={<TnaTemplateManager />} />
            <Route path="/tna-entry" element={<TnaManager />} />

            <Route path="/planning-working-team-list" element={<PlanningWorkingTeamList />} />
            <Route path="/planning-working-team-save" element={<PlanningWorkingTeamForm />} />
            <Route path="/planning-calendar" element={<PlanningCalendarForm />} />

            <Route path="/tna-detail-report" element={<TnaDetailReport />} />
            <Route path="/tna-achievement-report" element={<TnaAchievementReport />} />
            <Route path="/tna-summary-report" element={<TnaSummaryReport />} />

            <Route path="/planning-board" element={<OtherBoard />} />

            {/* ==reports================================ */}
            <Route path="/">
                <Route
                    path="internal-product-placement-sheet-summary-report"
                    element={<InternalProductPlacementSheetReport />}
                />
                <Route
                    path="job-breakdown-report"
                    element={<JobBreakdownReport />}
                />
                <Route
                    path="style-wise-order-details-report"
                    element={<StyleWiseOrderDetailsReport />}
                />
            </Route>
            {/* ==end-reports================================ */}


            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default AccountsRoutes;
