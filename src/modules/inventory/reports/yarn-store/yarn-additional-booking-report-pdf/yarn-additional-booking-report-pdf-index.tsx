/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useApiUrl from "@/hooks/use-ApiUrl";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { YarnAdditionalBookingReportType } from "./yarn-additional-booking-report-pdf-type";
import moment from "moment";

function YarnAdditionalBookingReportPDF() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const api = useApiUrl();

  let dtFrom = "01-Sep-25";
  let dtTo = "30-Sep-25";

  if (searchParams.get("dtFrom")) dtFrom = String(searchParams.get("dtFrom"));
  if (searchParams.get("dtTo")) dtTo = String(searchParams.get("dtTo"));

  useEffect(() => {
    document.title = "Yarn Additional Booking Report";
  }, []);

  useEffect(() => {
    async function getData(): Promise<YarnAdditionalBookingReportType[] | null> {
      try {
        setIsLoading(true);
        const response = await axios.get<YarnAdditionalBookingReportType[]>(
          `${api.ProductionUrl}/production/YarnStoreReport/YarnAdditionalBookingReport?dtFrom=${dtFrom}&dtTo=${dtTo}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    }

    getData().then((data) => {
      if (data && data.length > 0) generateYarnAdditionalBookingPDF(data);
    });
  }, []);

  function generateYarnAdditionalBookingPDF(data: YarnAdditionalBookingReportType[]) {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    // Footer content
    const footer = (doc: any) => {
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const printDate = moment().format("DD-MMM-YY");

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        // Left side: Powered by Click
        doc.text("Powered by Click", 15, pageHeight - 8);
        // Center: Print Date
        doc.text(`Print Date: ${printDate}`, pageWidth / 2, pageHeight - 8, { align: "center" });
        // Right side: Page number
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, pageHeight - 8, { align: "right" });
      }
    };

    // ========== HEADER ==========
    const reportTitle = "Yarn Additional Booking Status";
    const dateRange = `On Dated ${dtFrom} To ${dtTo}`;

    doc.setFont("helvetica", "bold");
    doc.text(reportTitle, 148, 15, { align: "center" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(dateRange, 148, 22, { align: "center" });

    // ========== GROUPING AND MAIN TABLE ==========

    const groupedByPO: Record<string, YarnAdditionalBookingReportType[]> = {};
    data.forEach((row) => {
      const key = row.PONO || "NO_PO";
      if (!groupedByPO[key]) groupedByPO[key] = [];
      groupedByPO[key].push(row);
    });

    const headers = [
      [
        "OPM",
        "Booking No",
        "Buyer",
        "PO",
        "Factory",
        "Style",
        "Quantity",
        "Reasons",
        "Category",
        "Debit V.",
        "Status",
      ],
    ];

    const allBody: any[] = [];
    let grandTotal = 0;

    Object.entries(groupedByPO).forEach(([po, rows]) => {
      let groupTotal = 0;
      rows.forEach((row) => {
        allBody.push([
          row.ORDERPLACEMENTMONTH ? moment(row.ORDERPLACEMENTMONTH).format("MMM-YY") : "N/A",
          row.BOOKING_NO,
          row.DISPLAY_NAME,
          row.PONO,
          row.FACTORY_NAME,
          row.STYLENAME,
          row.QUANTITY,
          row.APPROVAL_REMARKS,
          row.PROBLEM_CATEGORY_NAME,
          row.DEBIT_VOUCHER,
          row.STATUS,
        ]);
        groupTotal += row.QUANTITY || 0;
      });

      grandTotal += groupTotal;

      allBody.push([
        { content: `PO Wise Total (${po})`, colSpan: 6, styles: { fontStyle: "bold", halign: "right" } },
        { content: groupTotal.toFixed(2), styles: { fontStyle: "bold", halign: "center" } },
        { content: "", colSpan: 4, styles: { fontStyle: "bold", halign: "right" } },
      ]);
    });

    allBody.push([
      { content: "Grand Total", colSpan: 6, styles: { fontStyle: "bold", halign: "right" } },
      { content: grandTotal.toFixed(2), styles: { fontStyle: "bold", halign: "center" } },
      { content: "", colSpan: 4, styles: { fontStyle: "bold", halign: "right" } },
    ]);

    (doc as any).autoTable({
      startY: 25,
      head: headers,
      body: allBody,
      styles: { fontSize: 8, textColor: [20, 20, 20], cellPadding: 2.5, valign: "middle", lineWidth: 0.2, lineColor: [0, 0, 0] },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        halign: "center",
        valign: "middle",
        fontStyle: "bold",
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
        overflow: "hidden"
      },
      bodyStyles: {
        lineWidth: 0.2,
        lineColor: [0, 0, 0]
      },
      columnStyles: {
        0: {
          cellWidth: 18,
          whiteSpace: "nowrap"
        },
        1: {
          cellWidth: 30,
          whiteSpace: "nowrap"
        },
        2: { cellWidth: 18, whiteSpace: "nowrap" },
        4: { cellWidth: 18, whiteSpace: "nowrap" },
        6: { cellWidth: 18, whiteSpace: "nowrap" },
        7: { cellWidth: 60 },
        8: {
          cellWidth: 20,
          whiteSpace: "nowrap"
        },
        9: {
          cellWidth: 18,
          whiteSpace: "nowrap"
        },
      },
    });

    // ========== SUMMARY TABLES ==========
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    const summaries = calculateSummaries(data);

    let currentX = 15;
    const startY = finalY;

    currentX = addSummaryTable(doc, "Factory Wise Summary", summaries.factory, startY, currentX);
    currentX = addSummaryTable(doc, "Buyer Wise Summary", summaries.buyer, startY, currentX);
    addSummaryTable(doc, "Category Wise Summary", summaries.category, startY, currentX);


    footer(doc);

    doc.save("Yarn_Additional_Booking_Report.pdf");
  }


  // ========== SUMMARY HELPERS ==========

  function calculateSummaries(data: YarnAdditionalBookingReportType[]) {
    const totalQty = data.reduce((sum, row) => sum + (row.QUANTITY || 0), 0);

    const factoryMap: Record<string, number> = {};
    const buyerMap: Record<string, number> = {};
    const categoryMap: Record<string, number> = {};

    data.forEach((row) => {
      const factory = row.FACTORY_NAME?.trim() || "";
      const buyer = row.DISPLAY_NAME?.trim() || "";
      const category = row.PROBLEM_CATEGORY_NAME?.trim() || "";

      if (factory) factoryMap[factory] = (factoryMap[factory] || 0) + (row.QUANTITY || 0);
      if (buyer) buyerMap[buyer] = (buyerMap[buyer] || 0) + (row.QUANTITY || 0);
      if (category) categoryMap[category] = (categoryMap[category] || 0) + (row.QUANTITY || 0);
    });

    const formatSummary = (map: Record<string, number>) =>
      Object.entries(map)
        .filter(([_, qty]) => qty > 0)
        .map(([name, qty]) => ({
          name,
          qty: qty.toFixed(1),
          percent: ((qty / totalQty) * 100).toFixed(1) + " %",
        }));

    return {
      totalQty,
      factory: formatSummary(factoryMap),
      buyer: formatSummary(buyerMap),
      category: formatSummary(categoryMap),
    };
  }

  function addSummaryTable(
    doc: any,
    title: string,
    rows: { name: string; qty: string; percent: string }[],
    startY: number,
    startX = 15
  ): number {
    if (!rows || rows.length === 0) return 0;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(title, startX, startY);

    const filteredRows = rows.filter((r) => r.name && parseFloat(r.qty) > 0);
    const body = filteredRows.map((r) => [r.name, r.qty, r.percent]);

    const totalQty = filteredRows.reduce((sum, r) => sum + parseFloat(r.qty), 0).toFixed(1);
    body.push(["Total", totalQty, ""]);

    const colWidths = [0, 0, 0];
    const allRows = [["Name", "Quantity", "Percentage"], ...body];
    allRows.forEach((row) => {
      row.forEach((cell, i) => {
        const textWidth = doc.getTextWidth(cell.toString()) + 8;
        if (textWidth > colWidths[i]) colWidths[i] = textWidth;
      });
    });
    const totalTableWidth = colWidths.reduce((a, b) => a + b, 0) + 6;

    doc.autoTable({
      startY: startY + 2,
      head: [["Name", "Quantity", "Percentage"]],
      body,
      theme: "grid",
      styles: {
        fontSize: 8,
        halign: "center",
        valign: "middle",
        lineColor: [50, 50, 50],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [200, 200, 200],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        lineWidth: 0.2,
        lineColor: [50, 50, 50],
      },
      margin: { left: startX },
      tableWidth: totalTableWidth,
      columnStyles: {
        0: { halign: "left", cellWidth: colWidths[0] },
        1: { halign: "right", cellWidth: colWidths[1] },
        2: { halign: "right", cellWidth: colWidths[2] },
      },
      didParseCell: function (data: any) {
        if (data.row.index === body.length - 1) {
          data.cell.styles.fontStyle = "bold";
        }
      },
    });

    return startX + totalTableWidth;
  }





  return isLoading ? (
    <div className="container">Loading...</div>
  ) : (
    <div></div>
  );
}

export default YarnAdditionalBookingReportPDF;
