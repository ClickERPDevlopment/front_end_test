/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import { EmbellishmentDeliveryReportType } from "../../embellishment-delivery-report-type";


function Report({
  data,
}: {
  data: EmbellishmentDeliveryReportType[];
}) {

  //set table header
  const firstHeader = [
    "PO",
    "Color",
    "Parts",
  ];

  //set second header
  const secondHeader = [
    "Total"
  ];

  const uniqueSizes: Set<string> = new Set();

  data.forEach((item) => {
    if (item.SIZE_NAME != null) uniqueSizes.add(item.SIZE_NAME);
  });

  // Create size header based on unique sizes
  const sizeHeader = new Array();
  uniqueSizes.forEach((size) => {
    sizeHeader.push(size);
  });



  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="text-gray-950">
      <div>
        <p className="text-center font-bold m-0 p-0 mt-4" style={{ fontSize: "15px" }}>Reject Qty</p>
        <ReportTable
          data={data}
          firstHeader={firstHeader}
          secondHeader={secondHeader}
          sizeHeader={sizeHeader}
        ></ReportTable>
      </div>
    </div>
  );
}

export default Report;
