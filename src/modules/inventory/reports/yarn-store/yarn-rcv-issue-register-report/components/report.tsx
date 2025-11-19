/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { YarnRcvIssueRegisterReportType } from "../yarn-rcv-issue-register-report-index-type";
import useAppClient from "@/hooks/use-AppClient";

function Report({
  data,
}: {
  data: YarnRcvIssueRegisterReportType[];
}) {

  const clients = useAppClient();
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: YarnRcvIssueRegisterReportType[],
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
      items: YarnRcvIssueRegisterReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["YARN_LOT_NUMBER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "L/C NO",
    "YARN",
    (clients.currentClient == clients.FAME ? "LOCATION" : "BRAND"),
    "DATE",
    "BUYER",
    "ORDER NO",
    "CHALLAN",
    "LOT NO",
    "KNITTING HOUSE",
    "TYPE",
    "RECEIVE CTN",
    "PER CTN",
    "RECEIVE KG",
    "ISSUE CTN",
    "ISSUE KG",
    "BALANCE CTN",
    "BALANCE KG",
  ];


  const rcvCtn = data?.reduce((acc, item) => acc + item.RECEIVE_CTN, 0)
  const rcvKg = data?.reduce((acc, item) => acc + item.RECEIVE_KG, 0)
  const issueCtn = data?.reduce((acc, item) => acc + item.ISSUE_CTN, 0)
  const issueKg = data?.reduce((acc, item) => acc + item.ISSUE_KG, 0)


  // let CHECK_COLUMN2 = "";
  // let CHECK_COLUMN = "";
  // let blncCtn = 0;
  // let blncKg = 0;

  // data?.forEach(item => {
  //   // Balance CTN logic
  //   if (CHECK_COLUMN2 === item.CHECK_COLUMN) {
  //     blncCtn += item.RECEIVE_CTN - item.ISSUE_CTN;
  //   } else {
  //     blncCtn = (item.RECEIVE_CTN - item.ISSUE_CTN) + item.TOTAL_BALANCE_CTN;
  //   }
  //   if (CHECK_COLUMN2 !== item.CHECK_COLUMN) {
  //     CHECK_COLUMN2 = item.CHECK_COLUMN;
  //   }

  //   // Balance KG logic
  //   if (CHECK_COLUMN === item.CHECK_COLUMN) {
  //     blncKg += item.RECEIVE_KG - item.ISSUE_KG;
  //   } else {
  //     blncKg = (item.RECEIVE_KG - item.ISSUE_KG) + item.TOTAL_BALANCE;
  //   }
  //   if (CHECK_COLUMN !== item.CHECK_COLUMN) {
  //     CHECK_COLUMN = item.CHECK_COLUMN;
  //   }
  // });


  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
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
              ></ReportTable>
            ))}

            <tr style={{ fontSize: "12px" }} className="font-bold">
              <td colSpan={10} className="border border-gray-950 p-0.5">Grand Total</td>
              <td className="border border-gray-950 p-0.5">{rcvCtn.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{rcvKg.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{issueCtn.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{issueKg.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
            </tr>

          </tbody>
        </table>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
