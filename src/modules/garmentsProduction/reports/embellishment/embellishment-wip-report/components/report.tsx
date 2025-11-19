/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { EmbellishmentWIPReportType } from "../embellishment-order-summary-report-type";

function Report({
  data,
  searchParamsObj
}: {
  data: EmbellishmentWIPReportType[];
  searchParamsObj: { fromDate: string; toDate: string; buyerId: string; styleId: string; poId: string; typeId: string; };
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: EmbellishmentWIPReportType[],
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
      items: EmbellishmentWIPReportType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  //set table header
  const firstHeader = [
    "Buyer",
    "Style",
    "PO",
    "PO Qty",
    "Order No",
  ];


  const printRcvQty = data.reduce((acc, item) => acc + item.PRINTING_RCV_QTY, 0);
  const embRcvQty = data.reduce((acc, item) => acc + item.EMBROIDERY_RCV_QTY, 0);

  const printProQty = data.reduce((acc, item) => acc + item.PRINTING_PRO_QTY, 0);
  const embProQty = data.reduce((acc, item) => acc + item.EMBROIDERY_PRO_QTY, 0);

  const printDelQty = data.reduce((acc, item) => acc + item.PRINTING_PRO_QTY, 0);
  const embDelQty = data.reduce((acc, item) => acc + item.EMBROIDERY_DEL_QTY, 0);

  const poQty = data.reduce((acc, item) => acc + item.PO_QTY, 0);

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
                <th rowSpan={2} className="border border-gray-950 p-0.5">{item}</th>
              )}
              <th colSpan={2} className="border border-gray-950 p-0.5">Input Qty</th>
              <th colSpan={2} className="border border-gray-950 p-0.5">Output Qty</th>
              <th colSpan={2} className="border border-gray-950 p-0.5">Delivery Qty</th>
              <th rowSpan={2} className="border border-gray-950 p-0.5">WIP</th>
            </tr>
            <tr className="bg-lime-200 text-center">
              <th className="border border-gray-950 p-0.5">Printing</th>
              <th className="border border-gray-950 p-0.5">Embroidery</th>
              <th className="border border-gray-950 p-0.5">Printing</th>
              <th className="border border-gray-950 p-0.5">Embroidery</th>
              <th className="border border-gray-950 p-0.5">Printing</th>
              <th className="border border-gray-950 p-0.5">Embroidery</th>
            </tr>
          </thead>

          <tbody>
            {uniqueKeysArray?.map((key) => (<>
              <ReportTable
                key={key}
                data={groupedData[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            </>
            ))}
            <tr style={{ fontSize: "14px" }} className="font-bold">
              <td colSpan={3} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{poQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{ }</td>
              <td className="border border-gray-950 p-0.5 text-center">{printRcvQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{embRcvQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{printProQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{embProQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{printDelQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{embDelQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{(printRcvQty + embRcvQty) - (printProQty + embProQty)}</td>
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
