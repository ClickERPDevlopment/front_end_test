import ReportViewer from "@/components/data-display/ReportViewer";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PurchaseOrderCrystalReport: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const reportUrl = `Reports/Procurement/rptPurchaseOrder.aspx?id=${id}`;

    useEffect(() => {
        if (id) {
            document.title = "Purchase Order Report";
        }
    }, [id])

    return (
        <ReportViewer
            url={reportUrl}
            title="Purchase Order Report"
            height="900px"
        />
    );
};

export default PurchaseOrderCrystalReport;
