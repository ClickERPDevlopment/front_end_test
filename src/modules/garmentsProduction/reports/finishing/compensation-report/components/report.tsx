/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { CompensationReportType } from "../compensation-report-type";

function Report({
  data,
  searchParamsObj
}: {
  data: CompensationReportType[];
  searchParamsObj: { fromDate: string; toDate: string; companyId: number }

}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: CompensationReportType[],
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
      items: CompensationReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, ["COMPENSATION_NO"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Date",
    "Party",
    "Compensation No.",
    "OPM",
    "Buyer",
    "PO",
    "Item Type",
    "Qty.",
    "UOM",
    "Rate",
    "Amount",
    "Total Amount",
    "Local Sale",
    "Net Comp. Amount",
  ];

  const totalQty = data.reduce((acc, item) => acc + item.QTY, 0);
  const totalAmount = data.reduce((acc, item) => acc + item.RATE * item.QTY, 0);

  let totalSale = 0;


  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
          searchParamsObj={searchParamsObj}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr style={{ fontSize: "15px" }} className="bg-lime-200 text-center">
              {firstHeader?.map((item) =>
                <th className="border border-gray-950 p-0.5">{item}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {uniqueKeysArray?.map((key) => {

              totalSale += groupedData[key].items[0].LOCAL_EARNING_AMT;

              return <ReportTable
                key={key}
                data={groupedData[key].items}
                firstHeader={firstHeader}
              ></ReportTable>

            })}

            <tr style={{ fontSize: "14px" }} className="font-bold">
              <td className="border border-gray-950 p-0.5 text-center" colSpan={7}>Total</td>
              <td className="border border-gray-950 p-0.5 text-end">{totalQty.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{ }</td>
              <td className="border border-gray-950 p-0.5 text-center">{ }</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalAmount.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalAmount.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{totalSale.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5 text-center">{(totalAmount - totalSale).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="pt-10">
          {/* <ReportFooter></ReportFooter> */}
        </div>

      </div>
    </div>
  );
}

export default Report;
