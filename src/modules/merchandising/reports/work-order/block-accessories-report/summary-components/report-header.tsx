import moment from "moment";
import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";

function ReportHeader({
  masterData,
}: {
  masterData: IAccessoriesReportWithPo | null;
  searchParams: { currency: string };
}) {
  return (
    <div>
      <div className="">
        {/* <p className="font-bold text-xs text-left w-[100%] text-sm">
             {moment().format("DD-MMM-YYYY")}
           </p> */}
        <h1 className="font-bold text-lg text-center">
          {masterData?.COMPANY_NAME}
        </h1>
        <h4 className="text-sm text-center">
          {masterData?.COMPANY_ADDRESS}
        </h4>
        <h4 className="font-bold text-base text-center mt-2">
          Accessories Workorder With PO
        </h4>
      </div>
      <table style={{ fontSize: "12px" }} className="border border-gray-950 w-[100%] mt-2">
        <tr className="text-left">
          <th className="border border-gray-950 px-1 font-bold">Company</th>
          <th className="border border-gray-950 px-1 font-bold">Supplier</th>
        </tr>
        <tr className="">
          <td className="border border-gray-950 p-0">
            <table className="w-[100%] m-0">
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">Name: </td>
                <td className="px-1 ">{masterData?.COMPANY_NAME}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">
                  Factory Address:{" "}
                </td>
                <td className="px-1 "> {masterData?.COMPANY_ADDRESS}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">Work Order: </td>
                <td className="px-1 "> {masterData?.WORK_ORDER_NO}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">
                  Contact Person Name:{" "}
                </td>
                <td className="px-1">{masterData?.STORE_PERSONNEL}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">Mobile: </td>
                <td className="px-1"> {masterData?.MOBILE_NO}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">Email: </td>
                <td className="px-1"> {masterData?.COMPANY_EMAIL}</td>
              </tr>
              <tr>
                <td className="px-1 border-r border-gray-950 font-bold">Workorder Date: </td>
                <td className="px-1"> {moment(masterData?.ISSUE_DATE).format("DD-MMM-YY")}</td>
              </tr>
            </table>
          </td>
          <td className="border border-gray-950 p-0">
            <table className="w-[100%] m-0">
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">Name: </td>
                <td className="px-1">{masterData?.SUPPLIER_NAME}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">Address: </td>
                <td className="px-1"> {masterData?.SUPPLIER_ADDRESS}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">
                  Delivery Store:
                </td>
                <td className="px-1">
                  {masterData?.RCV_STORE}
                </td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">
                  Contact Person Name:{" "}
                </td>
                <td className="px-1">{masterData?.ATTENTION}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">Mobile: </td>
                <td className="px-1"> {masterData?.SUPPLIER_MOBILE_NO}</td>
              </tr>
              <tr className="border-b border-gray-950">
                <td className="px-1 border-r border-gray-950 font-bold">Email: </td>
                <td className="px-1">{masterData?.SUPPLIER_EMAIL}</td>
              </tr>
              <tr>
                <td className="px-1 border-r border-gray-950 font-bold">Delivery Date:</td>
                <td className="px-1">{masterData?.DELIVERY_DATE
                  ? moment(masterData?.DELIVERY_DATE).format("D MMM YY")
                  : ""}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div>

      </div>
    </div>
  );
}

export default ReportHeader;
