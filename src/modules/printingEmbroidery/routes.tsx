// src/modules/dashboard/dashboardRoutes.tsx
import React, { Suspense, } from 'react';
import { Routes, Route, } from 'react-router-dom';
import NotFound from '../../pages/NotFound';
import PrintEmbMaterialReceiveList from './pages/PrintEmbMaterialReceive/PrintEmbMaterialReceiveList';
import PrintEmbMaterialReceiveForm from './pages/PrintEmbMaterialReceive/PrintEmbMaterialReceiveForm';
import EmbellishmentWIPReport from '../garmentsProduction/reports/embellishment/embellishment-wip-report/embellishment-wip-report-index';
import EmbellishmentQualityReport from '../garmentsProduction/reports/embellishment/embellishment-quality-report/embellishment-quality-report-index';
import EmbellishmentSendReceiveReport from '../garmentsProduction/reports/embellishment/embellishment-send-receive-report/embellishment-send-receive-report-index';
import SupplierWiseEmbStockColorWiseReport from '../garmentsProduction/reports/embellishment/supplier-wise-emb-stock-color-wise-report/supplier-wise-emb-stock-color-wise-report-index';
import EmbellishmentHourlyProductionReport from '../garmentsProduction/reports/embellishment/embellishment-hourly-production-report/embellishment-hourly-production-report-index';
import EmbellishmentPIReport from '../garmentsProduction/reports/embellishment/embellishment-pi-report/embellishment-pi-report-index';
import SupplierWiseEmbStockReport from '../garmentsProduction/reports/embellishment/supplier-wise-emb-stock-report/supplier-wise-emb-stock-report-index';
import SupplierWiseEmbStockColorSizeWiseReport from '../garmentsProduction/reports/embellishment/supplier-wise-emb-stock-color-size-wise-report/supplier-wise-emb-stock-color-size-wise-report-index';
import EmblishmentBudgetSheet from '../garmentsProduction/reports/embellishment/embellishment-budget-sheet/embellishment-budget-sheet-index';
import EmbellishmentDailyProductionReport from '../garmentsProduction/reports/embellishment/embellishment-daily-production-report/embellishment-daily-production-report-index';
import EmbellishmentDailySummaryProductionReport from '../garmentsProduction/reports/embellishment/embellishment-daily-summary-production-report/embellishment-daily-summary-production-report-index';
import EmbellishmentOrderDetailsReport from '../garmentsProduction/reports/embellishment/embellishment-order-details-report/embellishment-order-details-report-index';
import EmbellishmentOrderSummaryReport from '../garmentsProduction/reports/embellishment/embellishment-order-summary-report/embellishment-order-summary-report-index';
import EmbellishmentDeliveryReport from '../garmentsProduction/reports/embellishment/embellishment-delivery-report/embellishment-delivery-report-index';

const GraphDashboard = React.lazy(() => import('./pages/graphs/index'));


const AccountsRoutes: React.FC = () => (
    <Suspense >
        <Routes>

            <Route path="/print-emb-material-receive" element={<PrintEmbMaterialReceiveList />} />
            <Route path="/print-emb-material-receive/entry" element={<PrintEmbMaterialReceiveForm />} />
            <Route path="/print-emb-material-receive/entry/:id" element={<PrintEmbMaterialReceiveForm />} />

            <Route path="/" element={<GraphDashboard />} />
            <Route path="*" element={<NotFound />} />


            {/* Report */}

            <Route
                path="embellishment-wip-report"
                element={<EmbellishmentWIPReport />}
            />
            <Route
                path="embellishment-quality-report"
                element={<EmbellishmentQualityReport />}
            />
            <Route
                path="embellishment-send-receive-report"
                element={<EmbellishmentSendReceiveReport />}
            />
            <Route
                path="supplier-wise-emb-stock-color-wise-report"
                element={<SupplierWiseEmbStockColorWiseReport />}
            />
            <Route
                path="embellishment-hourly-production-report"
                element={<EmbellishmentHourlyProductionReport />}
            />
            <Route
                path="embellishment-pi-report"
                element={<EmbellishmentPIReport />}
            />
            <Route
                path="supplier-wise-emb-stock-report"
                element={<SupplierWiseEmbStockReport />}
            />
            <Route
                path="supplier-wise-emb-stock-color-size-wise-report"
                element={<SupplierWiseEmbStockColorSizeWiseReport />}
            />
            <Route
                path="embellishment-budget-sheet"
                element={<EmblishmentBudgetSheet />}
            />
            <Route
                path="embellishment-daily-production-report"
                element={<EmbellishmentDailyProductionReport />}
            />
            <Route
                path="embellishment-daily-summary-production-report"
                element={<EmbellishmentDailySummaryProductionReport />}
            />
            <Route
                path="embellishment-order-details-report"
                element={<EmbellishmentOrderDetailsReport />}
            />

            <Route
                path="embellishment-order-summary-report"
                element={<EmbellishmentOrderSummaryReport />}
            />

            <Route
                path="embellishment-delivery-report"
                element={<EmbellishmentDeliveryReport />}
            />

        </Routes>

    </Suspense>
);

export default AccountsRoutes;
