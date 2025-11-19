/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { FabricQualityProblemReportType } from "../fabric-quality-problem-report-type";

function Report({
  data,
}: {
  data: FabricQualityProblemReportType[];
}) {



  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: FabricQualityProblemReportType[],
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
      items: FabricQualityProblemReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Color",
    "Batch. NO",
    "Fabric",
    "STL.",
    "Yarn Count",
    "Brand",
    "Lot",
    "Batch Qty",
    "Problem Qty",
    "Problem Qty Pcs",
    "Problem %",
  ];

  return (
    <div style={{ fontFamily: "Times New Roman, serif", fontSize: "14px" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3" style={{ fontSize: "14px" }}>
          <div>
            <table className="font-bold align-top">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Date</td>
                  <td className="align-top">: {moment(data[0]?.PROBLEM_DATE).format("DD-MM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">Address Dept.</td>
                  <td className="align-top">: {data[0]?.DEPARTMENT_NAME}</td>
                </tr>
                <tr>
                  <td className="align-top">Buyer</td>
                  <td className="align-top">: {data[0]?.BUYER}</td>
                </tr>
                <tr>
                  <td className="align-top">Style</td>
                  <td className="align-top">: {data[0]?.STYLENO}</td>
                </tr>
                <tr>
                  <td className="align-top">Order</td>
                  <td className="align-top">: {data[0]?.PONO}</td>
                </tr>
                <tr>
                  <td className="align-top">Req. GSM</td>
                  <td className="align-top">
                    : {[...new Set(data.map(item => item.REQ_GSM).filter(gsm => gsm && gsm.trim() !== ""))].join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Knitting House</td>
                  <td className="align-top">
                    {[...new Set(
                      data.flatMap(item => [
                        item.KNITTING_HOUSE_NAME,
                        item.KNITTING_HOUSE_NAME2,
                        item.KNITTING_HOUSE_NAME3,
                        item.KNITTING_HOUSE_NAME4
                      ])
                    )]
                      .filter(Boolean)
                      .join(", ")}
                  </td>

                </tr>
                <tr>
                  <td className="align-top">Dyeing Unit</td>
                  <td className="align-top">
                    : {[...new Set(data.map(item => item.SUPPLIER).filter(s => s && s.trim() !== ""))].join(", ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            <tr style={{ fontSize: "14px" }} className="bg-indigo-200 text-center">
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

        <div className="mt-5 border border-gray-950">
          <p className="text-center font-bold">Problem Details</p>
          <p className="p-2 border-t border-gray-950">
            {data[0]?.REMARKS}
          </p>
        </div>

        <div style={{ marginTop: "144px" }}>
          <ReportFooter data={data}></ReportFooter>
        </div>

        <div className="w-full mt-10">
          <div className="">
            <table className="border-collapse border border-gray-300  w-[100%]">
              <thead className="sticky top-0 print:static bg-white print:bg-transparent">
                <tr style={{ fontSize: "14px" }} className="bg-indigo-200 text-center font-bold">
                  <th className="border border-gray-950 p-0.5">Explanation By Default Party</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ fontSize: "14px" }} className="font-bold">
                  <td className="border border-gray-950 p-3"></td>
                </tr>
                <tr style={{ fontSize: "14px" }} className="font-bold">
                  <td className="border border-gray-950 p-3"></td>
                </tr>
                <tr style={{ fontSize: "14px" }} className="font-bold">
                  <td className="border border-gray-950 p-3"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-right mt-10 font-bold" style={{ marginTop: "100px" }}>
            <p><span className="p-1 border-t border-gray-950">Party-{data[0]?.DEPARTMENT_NAME}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
