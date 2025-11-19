/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { YarnReturnChallanReportType } from "../yarn-challan-report-type";
import ReportFooter from "./report-footer";
import moment from "moment";

function Report({
  data
}: {
  data: YarnReturnChallanReportType[];
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: YarnReturnChallanReportType[],
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

  interface IGroupedData {
    [key: string]: {
      items: YarnReturnChallanReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Yarn",
    "Brand",
    "Lot No",
    "Qty (Kg)",
    "Bag & Cone",
  ];

  const totalQty = data.reduce((acc, item) => acc + item.QTY, 0)
  const totalCtnQty = Math.floor( data.reduce((acc, item) => acc + item.CTN, 0));
  const totalCone = Math.floor(data.reduce((acc, item) => acc + item.CONE, 0));

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950 font-bold">
      <div className="p-2">
        <ReportHeader
          data={data}
        />

        <div className="flex justify-between items-start">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td className="p-0.5 font-bold">Date</td>
                <td className="p-0.5">
                  : {moment(data[0]?.CHALLAN_DATE).format("DD-MMM-YY hh:mm A")}
                </td>
              </tr>
              <tr>
                <td className="p-0.5 font-bold">Challan No</td>
                <td className="p-0.5">
                  : {data[0]?.CHALLAN_NO}
                </td>
              </tr>
              <tr>
                <td className="p-0.5 font-bold">LC No</td>
                <td className="p-0.5">
                  : {data[0]?.LC_NUMBER}
                </td>
              </tr>
              <tr>
                <td className="p-0.5 font-bold">WO No</td>
                <td className="p-0.5">
                  : {data[0]?.WORK_ORDER_NUMBER}
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead></thead>
            <tbody>
              <tr >
                <td className="p-0.5 font-bold align-top">To</td>
                <td className="p-0.5">
                  : {data[0]?.YARN_SUPPLIER}<br></br> {data[0]?.SUPPLIER_ADDRESS}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "15px" }} className="bg-lime-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>



          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedData[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}
            <tr style={{ fontSize: "14px" }} className="font-bold">
              <td colSpan={3} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">B:{totalCtnQty} | C:{totalCone}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3" style={{ fontSize: "14px" }}><p><span className="font-bold">Remarks:</span> {data[0]?.REMARKS}</p></div>
        <div className="pt-10">
          <ReportFooter></ReportFooter>
        </div>

      </div>
    </div>
  );
}

export default Report;
