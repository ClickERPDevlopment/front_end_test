import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';

const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));
const ChartOfAccountsForm = React.lazy(() => import('./pages/chartOfAccounts/ChartOfAccountsForm'));
const ChartOfAccountsList = React.lazy(() => import('./pages/chartOfAccounts/ChartOfAccountsList'));
const VoucherEntry = React.lazy(() => import('./pages/voucherEntry/VoucherEntry'));
const VoucherList = React.lazy(() => import('./pages/voucherEntry/VoucherList'));
const CurrencyList = React.lazy(() => import('../accounts/pages/currencySetup/CurrencyList'));
const CurrencyForm = React.lazy(() => import('../accounts/pages/currencySetup/CurrencyForm'));

const AccountsRoutes: React.FC = () => (
    <Suspense >
        <Routes>
            <Route path="/" element={<GraphDashboard />} />
            <Route path="/chart-of-accounts-list" element={<ChartOfAccountsList />} />
            <Route path="/chart-of-accounts-create" element={<ChartOfAccountsForm />} />
            <Route path="/chart-of-accounts-update/:id" element={<ChartOfAccountsForm />} />
            <Route path="/voucher-list" element={<VoucherList />} />
            <Route path="/voucher-entry" element={<VoucherEntry />} />
            <Route path="/voucher-update/:id" element={<VoucherEntry />} />
            <Route path="/chart-of-accounts-form" element={<ChartOfAccountsForm />} />
            <Route path="/currencies" element={<CurrencyList />} />
            <Route path="/currencies/entry" element={<CurrencyForm />} />
            <Route path="/currencies/entry/:id" element={<CurrencyForm />} />
            <Route path="*" element={<NotFound />} />
        </Routes>

    </Suspense>
);

export default AccountsRoutes;
