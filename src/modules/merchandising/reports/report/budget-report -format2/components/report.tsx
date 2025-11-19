/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import moment from "moment";
import { BudgetReportType } from "../budget-report -format2-type";

function Report({
  data,
}: {
  data: BudgetReportType[];
}) {

  const uniqueKeys: Set<string> = new Set();
  function groupBy(
    data: BudgetReportType[],
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
      items: BudgetReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["DS"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "PARTICULARS",
    "MTL",
    "QTY",
    "UOM",
    "PRICE($)",
    "TOTAL($)",
  ];

  const totalBudgetValue = data?.reduce(
    (acc, item) => acc + Number(item.BUDGET_TOTAL_VALUE),
    0
  );

  return (
    <div style={{ fontFamily: "Times New Roman, serif", fontSize: "12px" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <div className="flex justify-between mt-3 gap-3">
          <div>
            <table className="font-bold align-top">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Budget No.</td>
                  <td className="align-top">: {data[0]?.BUDGET_NO}</td>
                </tr>
                <tr>
                  <td className="align-top">Budget For</td>
                  <td className="align-top">: {moment(data[0]?.BUYER).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">Style</td>
                  <td className="align-top">: {moment(data[0]?.STYLENO).format("DD-MMM-YY")}</td>
                </tr>
                <tr>
                  <td className="align-top">Item</td>
                  <td className="align-top">: {data[0]?.ITEM}</td>
                </tr>
                <tr>
                  <td className="align-top">PO</td>
                  <td className="align-top">: {data[0]?.COMBINE_PONO}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table className="font-bold">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="align-top">Qty(Pcs)</td>
                  <td className="align-top">: {data[0]?.PO_QTY.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="align-top">Total FOB Value($)</td>
                  <td className="align-top">: {data[0]?.TOTAL_FOB_VALUE.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="align-top">Buying Commission($)</td>
                  <td className="align-top">: {(data[0]?.TOTAL_FOB_VALUE - data[0]?.BALANCE_VALUE).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="align-top">Balance($)</td>
                  <td className="align-top">: {data[0]?.BALANCE_VALUE.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="bg-white print:bg-transparent">
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
        <div className="flex justify-between">
          <div></div>
          <table className="font-bold align-top">
            <thead></thead>
            <tbody>
              <tr>
                <td className="align-top">TOTAL EXPENDITURES($)</td>
                <td className="align-top">: {totalBudgetValue.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="align-top">BUDGETED MARKUP($)</td>
                <td className="align-top">: {(data[0]?.TOTAL_FOB_VALUE - totalBudgetValue).toFixed((2))}</td>
              </tr>
              <tr>
                <td className="align-top">MARKUP %</td>
                <td className="align-top">: {(((data[0]?.TOTAL_FOB_VALUE - totalBudgetValue) / data[0]?.TOTAL_FOB_VALUE) * 100).toFixed((2))}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <ReportFooter data={data}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
