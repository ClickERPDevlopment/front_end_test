import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportGroup from "./report-group";
import { IFabricReceiveReturnChallanGatePassReport } from "../fabric-receive-return-challan-gate-pass-report-type";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  reportTitle?: string;
}

function Report({
  data,
}: {
  data: IFabricReceiveReturnChallanGatePassReport[];
}) {
  //set table header
  const firstHeader = [
    "Buyer",
    "Style",
    "PO",
    "Item Name",
    "Fabric Color",
    "UOM",
    "Received QTY",
    "Received Roll",
    "Return QTY",
    "Return Roll",
  ];

  console.log(data);

  return (
    <div className="text-sm">
      <div className="p-2">
        <ReportHeader
          companyName={data[0]?.COMPANY_NAME}
          companyAddress={data[0]?.COMPANY_ADDRESS}
        />
        <ReportGroup data={data} firstHeader={firstHeader}></ReportGroup>
        <p className="pt-2">Remarks: {data[0]?.REMARKS}</p>
        <div className="p-5">
        </div>
        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
