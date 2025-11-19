/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGarmentsDispatchDetailsReportDto } from "../garments-dispatch-details-report-type";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportRow from "./report-row";

function Report({
  data,
  searchParams,
}: {
  data: IGarmentsDispatchDetailsReportDto[];
  searchParams: { toDate: any; fromDate: any };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IGarmentsDispatchDetailsReportDto[], keys: string[]) {
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
      items: IGarmentsDispatchDetailsReportDto[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["REJECTDATE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "Date",
    "Challan No.",
    "Buyer",
    "Style",
    "Item",
    "PO",
    "Color",
    "Size",
    "Dispatch Qty.",
    "Dispatch Reason",
    "Send To",
    "Remarks",
  ];

  const totalRejectQty = data.reduce((acc, item) => acc + item.REJECTQTY, 0);

  return (
    <div className="px-10 text-sm">
      <div className="p-2">
        <ReportHeader
          data={data[0]}
          searchParams={{
            toDate: searchParams?.toDate,
            fromDate: searchParams?.fromDate,
          }}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static bg-white print:bg-transparent">
            <tr className="bg-lime-200 text-center">
              {firstHeader?.map((item) => (
                <th className="border border-gray-300 p-1">{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportRow key={key} data={groupedByDate[key].items}></ReportRow>
            ))}
            <tr className="font-bold">
              <td className="border border-gray-300 p-1 text-sm text-center">
                Grand Total
              </td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center">
                {totalRejectQty}
              </td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
              <td className="border border-gray-300 p-1 text-sm text-center"></td>
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
