// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));


const ConfigurationRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />
      
            <Route path="*" element={<NotFound />} />
        </Routes>

    </Suspense>
);

export default ConfigurationRoutes;
