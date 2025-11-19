import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import { gmtProductionReportRoutes } from "./garmentsProduction/gmtProductionReportRoutesConfig";
import { tnaReportRoutes } from "./tna/tnaReportRoutesConfig";

const IERoutes: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {gmtProductionReportRoutes.map(({ path, element }, idx) => (
                <Route key={idx} path={path} element={element} />
            ))}

            {tnaReportRoutes.map(({ path, element }, idx) => (
                <Route key={idx} path={path} element={element} />
            ))}


            <Route path="*" element={<NotFound />} />
        </Routes>
    </Suspense>
);

export default IERoutes;
