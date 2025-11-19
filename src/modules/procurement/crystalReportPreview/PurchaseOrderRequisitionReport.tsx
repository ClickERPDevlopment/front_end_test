import ReportViewer from "@/components/data-display/ReportViewer";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const PurchaseOrderRequisitionReport: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const reportUrl = `Reports/Procurement/rptPurchaseRequisition.aspx?id=${id}`;

    useEffect(() => {
        if (id) {
            document.title = "Requisition Report";
        }
    }, [id])

    return (
        <ReportViewer
            url={reportUrl}
            title="Requisition Report"
            height="900px"
        />
    );
};

export default PurchaseOrderRequisitionReport;
