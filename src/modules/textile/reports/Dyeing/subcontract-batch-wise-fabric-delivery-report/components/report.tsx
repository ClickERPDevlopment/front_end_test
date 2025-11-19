import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportGroup from "./report-group";
import { ISubcontractBatchWiseFabricDeliveryReport } from "../subcontract-batch-wise-fabric-delivery-report-type";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  reportTitle?: string;
  fromDate?: string;
  toDate?: string;
}

function Report({
  data,
  dtFrom,
  dtTo,
}: {
  data: ISubcontractBatchWiseFabricDeliveryReport[];
  dtFrom: string;
  dtTo: string;
}) {
  //set table header
  const firstHeader = [
    "Dyeing Date",
    "Order",
    "Color",
    "Fabric",
    "GSM",
    "Batch No",
    "Batch Qty",
    "Delivery Date",
    "Delivery Challan",
    "Grey Weight",
    "Finish Qty",
    "P/Loss(%)",
  ];

  console.log(data);

  return (
    <div className="text-sm">
      <div className="p-2">
        <ReportHeader
          dtFrom={dtFrom}
          dtTo={dtTo}
          companyName={data[0]?.COMPANY_NAME}
          companyAddress={data[0]?.COMPANY_ADDRESS}
        />
        <ReportGroup data={data} firstHeader={firstHeader}></ReportGroup>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
