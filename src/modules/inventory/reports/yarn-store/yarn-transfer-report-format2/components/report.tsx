/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { YarnTransferReportType } from "../yarn-transfer-report-type";

function Report({
  data,
}: {
  data: YarnTransferReportType[];
}) {


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: YarnTransferReportType[],
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
      items: YarnTransferReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "SL NO.",
    "BBLC NO",
    "YARN",
    "LOT",
    "BRAND",
    "QTY(KG)",
    "BAG & CONE",
  ];

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3">
          <div>
            <table className="font-bold align-top">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Challan No</td>
                  <td className="align-top">: {data[0]?.CHALLAN_NO}</td>
                </tr>
                <tr>
                  <td className="align-top">Date</td>
                  <td className="align-top">: {moment(data[0]?.CHALLAN_DATE).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">Wo No</td>
                  <td className="align-top">: {data[0]?.WORK_ORDER_NUMBER}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">To</td>
                  <td className="align-top">: {data[0]?.PARTY}<br></br>{data[0]?.PARTY_ADDRESS}</td>
                </tr>
                <tr>
                  <td className="align-top">Issue Type</td>
                  <td className="align-top">: {data[0]?.ISSUE_TYPE}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
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
              ></ReportTable>
            ))}
          </tbody>
        </table>

        <div className="mt-1">
          <p className="font-bold">Receive The Above Goods In Good Conditions.</p>
        </div>
        <div className="mt-3">
          <p className="font-bold">Remarkd: {data[0]?.REMARKS}</p>
        </div>
        <div className="mt-[144px]"></div>

        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
