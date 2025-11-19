/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import { IShipmentDelayReport } from "../import-fabric-inspection-report-type";

const ReportPDF = ({
  data,
  searchParams,
}: {
  data: IShipmentDelayReport[];
  searchParams: { toDate: string; fromDate: string };
}) => {
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.width;
    const margin = 10;
    const tableWidth = pageWidth - 2 * margin; // Full width for table

    // Function to add header content
    const addHeader = () => {
      // Header Title
      doc.setFontSize(13);
      doc.text(data[0]?.COMPANY_NAME || "", pageWidth / 2, 15, {
        align: "center",
      });

      // Address Info
      doc.setFontSize(9);
      doc.text(
        data[0]?.COMPANY_ADDRESS || "",
        pageWidth / 2,
        19,
        { align: "center" }
      );

      // Report Title
      doc.setFontSize(9);
      //doc.setTextColor('#4a90e2');
      doc.text("Shipment Delay Report", pageWidth / 2, 23, { align: "center" });

      // Date Range
      doc.setFontSize(9);
      //doc.setTextColor('#333');
      doc.text(
        `${searchParams.fromDate} - ${searchParams.toDate}`,
        pageWidth / 2,
        27,
        { align: "center" }
      );
    };

    // Add the first page and header
    addHeader();

    // Table Data Preparation
    const headers = [["BUYER", "MONTH", "PO", "TEAM LEADER", "QTY", "DELIVERY DATE", "DELAY"]];
    const tableData = data.map((item) => [
      item.BUYER_NAME,
      item.ORDER_PLACEMENT_MONTH
        ? moment(item.ORDER_PLACEMENT_MONTH).format("MMM-YY")
        : "",
      item.PO_NO,
      item.TEAM_LEAD,
      item.QTY.toString(),
      item.DELIVERY_DATE ? moment(item.DELIVERY_DATE).format("DD-MMM-YY") : "",
      item.DELIVERY_DATE
        ? `${moment().diff(moment(item.DELIVERY_DATE), "days")} days`
        : "",
    ]);

    // Define column widths dynamically for full page width
    const columnCount = headers[0].length;
    const columnWidth = tableWidth / columnCount;

    // Starting Y position for the table
    let yPosition = 30;

    // Function to check if a page break is needed and add a new page
    const checkPageOverflow = () => {
      if (yPosition > doc.internal.pageSize.height - margin) {
        doc.addPage();
        addHeader(); // Re-add the header on the new page
        yPosition = 30; // Reset yPosition after a page break
      }
      // addHeader(); // Re-add the header on the new page
      //yPosition = 15; // Reset yPosition after a page break
    };

    // Generate the table with autoTable plugin
    (doc as any).autoTable({
      head: headers,
      body: tableData,
      startY: yPosition,
      theme: "grid",
      headStyles: {
        fillColor: "#4a90e2", // Header background color
        textColor: "#ffffff", // Header text color
        fontSize: 8,
        halign: "center", // Header text alignment
        valign: "middle", // Header vertical alignment
        lineWidth: 0.1, // Border width
        lineColor: "#000000",
        font: "helvetica", // Font family for header (similar to Tailwind's default)
      },
      bodyStyles: {
        fontSize: 8,
        textColor: "#333",
        valign: "middle", // Body vertical alignment
        lineWidth: 0.1, // Border width
        lineColor: "#000000",
        font: "helvetica", // Font family for header (similar to Tailwind's default)
      },
      styles: {
        cellPadding: 0.5,
        lineColor: "#e0e0e0",
        lineWidth: 0.5,
      },
      alternateRowStyles: { fillColor: "#f9f9f9" }, // Stripe rows with alternate colors
      columnStyles: {
        0: { cellWidth: columnWidth, halign: "center", valign: "middle" }, // BUYER
        1: { cellWidth: columnWidth, halign: "center", valign: "middle" }, // MONTH
        2: { cellWidth: columnWidth, halign: "center", valign: "middle" }, // QTY
        3: { cellWidth: columnWidth, halign: "center", valign: "middle" }, // SHIP DATE
        4: { cellWidth: columnWidth, halign: "center", valign: "middle" }, // DELAY
        5: { cellWidth: columnWidth, halign: "center", valign: "middle" }, // DELAY
      },
      margin: { top: 10, left: margin, right: margin }, // Set left and right margins
      didDrawPage: (data: any) => {
        const currentPage = data.pageNumber;
        const currentDate = moment().format("DD-MMM-YYYY");

        // Add page number to bottom right
        doc.setFontSize(6);
        doc.text(
          `Page No. ${currentPage}`,
          pageWidth - margin - 20,
          doc.internal.pageSize.height - margin
        );

        // Add current date to bottom left
        doc.setFontSize(6);
        doc.text(
          `Date: ${currentDate}`,
          margin,
          doc.internal.pageSize.height - margin
        );

        checkPageOverflow(); // Check for page overflow after drawing the table
      },
    });

    // Trigger PDF download
    // Generate a unique name using the current date and time
    const timestamp = moment().format("YYYYMMDD_HHmmss");
    const uniqueFilename = `shipment_delay_report_${timestamp}.pdf`;

    // Trigger PDF download with the unique name
    doc.save(uniqueFilename);
  };

  return (
    <div className="text-right">
      <button
        onClick={generatePDF}
        className="my-2 px-2 py-2 bg-blue-500 text-white rounded"
      >
        Generate PDF
      </button>
    </div>
  );
};

export default ReportPDF;
