import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const CrystalReportLayout = () => {
    return (
        <div className="min-h-screen default flex justify-center bg-white">
            <Outlet  />
        </div>
    );
};

export default CrystalReportLayout;
