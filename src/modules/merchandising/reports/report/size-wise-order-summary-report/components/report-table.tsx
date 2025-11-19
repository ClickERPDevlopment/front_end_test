/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import { SizeWiseOrderSummaryReportType } from "../size-wise-order-summary-report-type";

function ReportTable({
  data,
  firstHeader,
  sizeHeader,
  secondHeader,
}: {
  data: SizeWiseOrderSummaryReportType[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: SizeWiseOrderSummaryReportType[],
    keys: string[],
    grandTotal: IGrandTotal,
    sizeWiseGrandTotal: { [size: string]: number }
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);

      if (!result[key]) {
        result[key] = {
          BUYER_NAME: item?.BUYER_NAME,
          STYLENO: item?.STYLENO,
          PONO: item?.PONO,
          ITEMTYPE: item?.ITEMTYPE,
          COLORNAME: item?.COLORNAME,
          SHIP_DATE: item?.SHIP_DATE,
          REVISED_DATE: item?.REVISED_DATE,
          TOTAL_QTY: 0,
          SIZES: {},
        };
      }

      const sizeName = item.SIZENAME;
      const qty = Number(item.QTY);

      if (!result[key].SIZES[sizeName]) {
        result[key].SIZES[sizeName] = 0;
      }
      result[key].SIZES[sizeName] += qty;
      result[key].TOTAL_QTY += qty;

      grandTotal.TOTAL_QTY += qty;

      if (!sizeWiseGrandTotal[sizeName]) {
        sizeWiseGrandTotal[sizeName] = 0;
      }
      sizeWiseGrandTotal[sizeName] += qty;

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      BUYER_NAME: string;
      STYLENO: string;
      PONO: string;
      ITEMTYPE: string;
      COLORNAME: string;
      SHIP_DATE: string;
      REVISED_DATE: string;
      TOTAL_QTY: number;
      SIZES: { [key: string]: number };
    };
  }

  interface IGrandTotal {
    TOTAL_QTY: number;
  }


  let groupedData: GroupedData = {};

  const grandTotal: IGrandTotal = {
    TOTAL_QTY: 0,
  };

  const sizeWiseGrandTotal: { [key: string]: number } = {};

  if (data) {
    groupedData = groupBy(
      data,
      ["BUYER_NAME", "STYLENO", "PONO", "ITEMTYPE", "COLORNAME", "SHIP_DATE", "REVISED_DATE"],
      grandTotal,
      sizeWiseGrandTotal
    );
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  let header;
  if (sizeHeader && secondHeader) {
    header = firstHeader?.concat(sizeHeader).concat(secondHeader);
  }

  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-300 w-[100%]">
        <thead>
          <tr>
            {header?.map((item) => (
              <th key={item} className="border border-gray-950 p-0.5">
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {uniqueKeysArray?.map((key) => (
            <tr key={key}>
              <td className="border text-center border-gray-950 p-0.5">
                {groupedData[key].BUYER_NAME}
              </td>
              <td className="border border-gray-950 p-0.5">
                {groupedData[key].STYLENO}
              </td>
              <td className="border border-gray-950 p-0.5">
                {groupedData[key].PONO}
              </td>
              <td className="border border-gray-950 p-0.5">
                {groupedData[key].ITEMTYPE}
              </td>
              <td className="border border-gray-950 p-0.5">
                {groupedData[key].COLORNAME}
              </td>

              {sizeHeader?.map((size) => (
                <td key={size} className="border border-gray-950 p-0.5 text-center">
                  {groupedData[key].SIZES[size] || "0"}
                </td>
              ))}

              <td className="border border-gray-950 p-0.5 text-center">
                {groupedData[key].TOTAL_QTY}
              </td>

              <td className="border border-gray-950 p-0.5 text-center text-nowrap">
                {
                  !groupedData[key].REVISED_DATE ||
                    moment(groupedData[key].REVISED_DATE).format("DD-MMM-YY") === "01-Jan-01"
                    ? ""
                    : moment(groupedData[key].REVISED_DATE).format("DD-MMM-YY")
                }
              </td>

              <td className="border border-gray-950 p-0.5 text-center text-nowrap">
                {moment(groupedData[key].SHIP_DATE).format("DD-MMM-YY")}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td
              className="border text-center border-gray-950 p-0.5 font-bold"
              colSpan={firstHeader?.length}
            >
              Grand Total
            </td>

            {sizeHeader?.map((size) => (
              <td key={size} className="border border-gray-950 p-0.5 text-center font-bold">
                {sizeWiseGrandTotal[size] || "0"}
              </td>
            ))}

            <td className="border border-gray-950 p-0.5 text-center font-bold">
              {grandTotal.TOTAL_QTY}
            </td>

            <td className="border border-gray-950 p-0.5 text-center"></td>
            <td className="border border-gray-950 p-0.5 text-center"></td>
          </tr>
        </tfoot>
      </table>
    </div>

  );
}

export default ReportTable;
