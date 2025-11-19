
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';


const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const CountryList = React.lazy(() => import('./pages/country/CountryList'));


const ConfigurationRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />
            <Route path="/countries" element={<CountryList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default ConfigurationRoutes;
