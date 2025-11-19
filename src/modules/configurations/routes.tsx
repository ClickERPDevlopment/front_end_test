import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import UserGroupList from './pages/userGroupSetup/userGroupList';
import UserGroupForm from './pages/userGroupSetup/userGroupForm';
import UserWiseMenuPermissionList from './pages/userWiseMenuPermission/userWiseMenuPermissionList';
import UserWiseMenuPermissionForm from './pages/userWiseMenuPermission/userWiseMenuPermissionForm';
import { GatePassTest } from './pages/test/gate_pass_test';
// lazy loaded
const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const SectionList = React.lazy(() => import('./pages/sectionSetup/SectionList'));
const SectionForm = React.lazy(() => import('./pages/sectionSetup/SectionForm'));
const FloorForm = React.lazy(() => import('./pages/floorSetup/FloorForm'));
const FloorList = React.lazy(() => import('./pages/floorSetup/FloorList'));
const LineForm = React.lazy(() => import('./pages/lineSetup/LineForm'));
const LineList = React.lazy(() => import('./pages/lineSetup/LineList'));
const FactoryWiseMenuPermissionList = React.lazy(() => import('./pages/factoryWiseMenuPermission/FactoryWiseMenuPermissionList'));
const FactoryWiseMenuPermission = React.lazy(() => import('./pages/factoryWiseMenuPermission/FactoryWiseMenuPermission'));


const ConfigurationRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/index" element={<GraphDashboard />} />
            <Route path="/floor" element={<FloorList />} />
            <Route path="/floors/entry" element={<FloorForm />} />
            <Route path="/floors/entry/:id" element={<FloorForm />} />
            <Route path="/sections" element={<SectionList />} />
            <Route path="/sections/entry" element={<SectionForm />} />
            <Route path="/lines" element={<LineList />} />
            <Route path="/lines/entry" element={<LineForm />} />
            <Route path="/factory-wise-menu-permission-list" element={<FactoryWiseMenuPermissionList />} />
            <Route path="/factory-wise-menu-permission/:id" element={<FactoryWiseMenuPermission />} />
            <Route path="/factory-wise-menu-permission" element={<FactoryWiseMenuPermission />} />

            <Route path="/user-group" element={<UserGroupList />} />
            <Route path="/user-group/entry" element={<UserGroupForm />} />
            <Route path="/user-group/entry/:id" element={<UserGroupForm />} />


            <Route path="/user-wise-menu-permission" element={<UserWiseMenuPermissionList />} />
            <Route path="/user-wise-menu-permission/entry" element={<UserWiseMenuPermissionForm />} />
            <Route path="/user-wise-menu-permission/entry/:id" element={<UserWiseMenuPermissionForm />} />


             <Route path="/test" element={<GatePassTest />} />



            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default ConfigurationRoutes;
