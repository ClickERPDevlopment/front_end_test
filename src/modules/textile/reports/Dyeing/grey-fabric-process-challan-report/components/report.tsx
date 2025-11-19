/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { GreyFabricProcessChallanReportType } from "../grey-fabric-process-challan-report-type";

function Report({
  data,
  challanType
}: {
  data: GreyFabricProcessChallanReportType[];
  challanType: string;
}) {



  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: GreyFabricProcessChallanReportType[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface GroupedByDate {
    [key: string]: {
      items: GreyFabricProcessChallanReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["JOB_NUMBER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Yarn Lot",
    "Brand",
    "Yarn",
    "Color",
    "Process",
    "MC Dia",
    "FIN Dia",
    "GSM",
    "S/L",
    "Roll Qty",
    "Qty (Kg)",
    "Remarks",
  ];

  const totalQuantiy = data.reduce((sum, item) => sum + (item.ISSUE_QTY_KG || 0), 0);
  const totalRollQty = data.reduce((sum, item) => sum + (item.ISSUE_QTY_ROLL || 0), 0);

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3 font-bold">
          {/* Left Table */}
          <table className="align-top">
            <tbody>
              <tr>
                <td className="align-top">Party</td>
                <td className="align-top">: {data[0]?.SUPPLIER}</td>
              </tr>
              <tr>
                <td className="align-top">Address</td>
                <td className="align-top">: {data[0]?.SUPPLIER_ADDRESS}</td>
              </tr>
              <tr>
                <td className="align-top">Driver Name</td>
                <td className="align-top">: {data[0]?.DRIVER_NAME}</td>
              </tr>
              <tr>
                <td className="align-top">Driver Mobile</td>
                <td className="align-top">: {data[0]?.DRIVER_MOBILE}</td>
              </tr>
              <tr>
                <td className="align-top">Vehicle No</td>
                <td className="align-top">: {data[0]?.VEHICLE_NO}</td>
              </tr>
            </tbody>
          </table>

          {/* Right Table */}
          <table className="align-top">
            <tbody>
              <tr>
                <td className="align-top">Challan No</td>
                <td className="align-top">: {data[0]?.ISSUE_CHALLAN}</td>
              </tr>
              <tr>
                <td className="align-top">Challan Date</td>
                <td className="align-top">
                  : {data[0]?.ISSUE_DATE ? moment(data[0]?.ISSUE_DATE).format("DD-MMM-YY") : ""}
                </td>
              </tr>
              <tr>
                <td className="align-top">Supervisor Name</td>
                <td className="align-top">: {data[0]?.SUPERVISOR_NAME}</td>
              </tr>
              <tr>
                <td className="align-top">Supervisor Mobile</td>
                <td className="align-top">: {data[0]?.SUPERVISOR_MOBILE}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
                challanType={challanType}
              ></ReportTable>
            ))}
            <tr style={{ fontSize: "13px" }}>
              <td colSpan={9} className="border border-gray-950 font-bold p-0.5 text-right">Total</td>
              <td className="border border-gray-950 p-0.5 font-bold">{totalRollQty}</td>
              <td className="border border-gray-950 p-0.5 font-bold">{totalQuantiy}</td>
              <td className="border border-gray-950 p-0.5 font-bold">{ }</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3">
          <p className="font-bold">Remarks: {data[0]?.REMARKS}</p>
        </div>
        <div style={{ marginTop: "90px" }}>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
