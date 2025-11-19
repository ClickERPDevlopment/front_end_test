// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

// lazy loaded
const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const BudgetApprovalList = React.lazy(() => import('./pages/budgetApproval/BudgetApprovalList'));

const IERoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />

            <Route path="budget-approval-list" element={<BudgetApprovalList />} />


            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default IERoutes;
