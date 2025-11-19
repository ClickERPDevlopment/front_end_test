import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportGroup from "./report-group";
import moment from "moment";
import { IAccessoriesReceiveReturnChallanGatePassReport } from "../accessories-receive-return-challan-gatepass-report-type";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  reportTitle?: string;
  fromDate?: string;
  toDate?: string;
}

function Report({
  data,
}: {
  data: IAccessoriesReceiveReturnChallanGatePassReport[];
}) {
  //set table header
  const firstHeader = [
    "ITEM NAME",
    "UOM",
    "MTL SIZE",
    "MTL COLOR",
    "RCV QTY",
    "RETURN QTY",
  ];

  return (
    <div className="container text-sm">
      <div className="p-2">
        <ReportHeader
          companyName={data[0]?.COMPANY_NAME}
          companyAddress={data[0]?.COMPANY_ADDRESS}
        />
        <table className="w-full mt-5">
          <tr className="font-bold text-start">
            <td className="w-[50%] text-start border-0">
              <p>Return No: {data[0]?.CHALLAN_NO}</p>
            </td>
            <td className="w-[50%] text-start border-0">
              <p>Supplier: {data[0]?.SUPPLIER_NAME}</p>
            </td>
          </tr>
          <tr className="font-bold">
            <td className="text-start border-0">
              <p>
                Return Date: {moment(data[0]?.RETURN_DATE).format("DD-MMM-YY")}
              </p>
            </td>
            <td className="text-start border-0">
              <p>Wo No: {data[0]?.WORK_ORDER_NO}</p>
            </td>
          </tr>
        </table>
        <ReportGroup data={data} firstHeader={firstHeader}></ReportGroup>
        <div className="p-5"></div>
        <div>
          <ReportFooter createdBy={data[0]?.CREATED_BY}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
