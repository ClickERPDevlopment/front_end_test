/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { DateWiseShiplentSummaryReportType } from "../date-wise-shiplent-summary-report-type";
import ReportDateGroup from "./report-date-group";

function Report({
  data,
  searchParams,
}: {
  data: DateWiseShiplentSummaryReportType[];
  searchParams: { toDate: any; fromDate: any };
}) {
  
  //set table header
  const firstHeader = [
    "CHALLAN DATE",
    "BUYER",
    "STYLE NO",
    "STYLE NAME",
    "PO NO",
    "ORDER QTY",
    "PREV. SHIP QTY",
    "REM. SHIP QTY",
    "SHIP QTY",
    "UOM",
    "SHIP VALUE",
  ];


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: DateWiseShiplentSummaryReportType[],
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
      items: DateWiseShiplentSummaryReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["CHALLANDATE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalOrderQty = data.reduce((sum, item) => sum + item.ORDER_QTY, 0);
  const totalShipmentQty = data.reduce((sum, item) => sum + item.SHIPMENTQTY, 0);
  const totalValue = data.reduce((sum, item) => sum + item.SHIPMENTQTY * item.FOB, 0);


  return (
    <div className="px-10">
      <div className="p-2">
        <ReportHeader
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
            COMPANY_NAME: data[0]?.COMPANY_NAME || "",
            COMPANY_ADDRESS: data[0]?.COMPANY_ADDRESS || "",
            COMPANY_REMARKS: "",
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead>
            <tr className="bg-emerald-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>

            {
              uniqueKeysArray.map((key) => {
                const group = groupedByDate[key];
                return <>
                  <ReportDateGroup data={group?.items}></ReportDateGroup>
                </>
              }
              )
            }

            <tr className="text-center bg-emerald-100 font-bold">
              <td colSpan={5} className="border border-gray-300 p-1 text-right">Grand Total</td>
              <td className="border border-gray-300 p-1 text-right">{totalOrderQty}</td>
              <td className="border border-gray-300 p-1">{ }</td>
              <td className="border border-gray-300 p-1">{ }</td>
              <td className="border border-gray-300 p-1 text-right">{totalShipmentQty}</td>
              <td className="border border-gray-300 p-1">{ }</td>
              <td className="border border-gray-300 p-1 text-right">{totalValue.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
