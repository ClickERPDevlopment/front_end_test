/* eslint-disable @typescript-eslint/no-explicit-any */

import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";

function ReportTable({
  data,
  firstHeader,
  sizeHeader,
}: {
  data: IAccessoriesReportWithPo[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  const grandTotal: IGrandTotal = {
    AMOUNT: 0,
    TOTAL_QTY: 0,
  };


  function groupBy(data: IAccessoriesReportWithPo[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          CONSUMPTION_PER_UNIT: item.CONSUMPTION_PER_UNIT,
          STYLE: item.STYLENO,
          JOB: item.PO_NO,
          PO: item.SUB_PO,
          ORDER: item.PO_NO,
          COLOR: item.GMT_COLOR_NAME,
          MTL_COLOR: item.MTL_COLOR_NAME,
          REF_SWATCH: item.REF_SWATCH,
          MTL_SIZE: item.MTL_SIZE_NAME,
          ITEM_NAME: item.MTL_NAME,
          UOM: item.UOM,
          ITEM_REF: item.DESCRIPTION,
          TOTAL_QTY: 0,
          EXTRA_PERCENT: item.EXTRA_PERCENT,
          RATE: item.SUPPLIER_RATE_PER_DZN / 12,
          AMOUNT: 0,
          SIZES: {},
        };
      }

      if (!result[key].SIZES[item.GMT_SIZE_NAME]) {
        result[key].SIZES[item.GMT_SIZE_NAME] = 0;
      }

      result[key].SIZES[item.GMT_SIZE_NAME] += Number(item.WORK_ORDER_QTY);
      result[key].TOTAL_QTY += Number(item.WORK_ORDER_QTY);
      result[key].AMOUNT += Number(item.SUPPLIER_RATE_PER_PCS * item.WORK_ORDER_QTY);

      grandTotal.AMOUNT += Number(item.SUPPLIER_RATE_PER_PCS * item.WORK_ORDER_QTY);
      grandTotal.TOTAL_QTY += Number(item.WORK_ORDER_QTY);

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      CONSUMPTION_PER_UNIT: number;
      STYLE: string;
      JOB: string;
      PO: string;
      ORDER: string;
      COLOR: string;
      MTL_COLOR: string;
      REF_SWATCH: string;
      MTL_SIZE: string;
      ITEM_NAME: string;
      UOM: string;
      ITEM_REF: string;
      TOTAL_QTY: number;
      EXTRA_PERCENT: number;
      RATE: number;
      AMOUNT: number;
      SIZES: { [key: string]: number };
    };
  }

  interface IGrandTotal {
    AMOUNT: number;
    TOTAL_QTY: number;
  }

  let groupedData: GroupedData = {};

  if (data) {
    groupedData = groupBy(data, [
      "STYLENO",
      "PO_NO",
      "SUB_PO",
      "GMT_COLOR_NAME",
      "MTL_COLOR_NAME",
      "REF_SWATCH",
      "MTL_SIZE_NAME",
      "MTL_NAME",
      "UOM",
      "DESCRIPTION",
      "SUPPLIER_RATE_PER_PCS",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const sizeGrandTotals: Record<string, number> = {};
  data.forEach((item) => {
    if (item.GMT_SIZE_NAME) {
      sizeGrandTotals[item.GMT_SIZE_NAME] =
        (sizeGrandTotals[item.GMT_SIZE_NAME] || 0) + item.WORK_ORDER_QTY;
    }
  });

  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <tr key={key}>
          <td className="border text-center border-gray-950 p-1">
            {groupedData[key].STYLE}
          </td>
          <td className="border text-center border-gray-950 p-1">
            {groupedData[key].JOB}
          </td>
          <td className="border text-center border-gray-950 p-1">
            {groupedData[key].PO}
          </td>
          <td className="border border-gray-950 p-1">
            {groupedData[key].COLOR}
          </td>
          <td className="border border-gray-950 p-1">
            {groupedData[key].MTL_COLOR}
          </td>
          <td className="border border-gray-950 p-1">
            {groupedData[key].ITEM_NAME}
          </td>

          {sizeHeader?.map((size) => {
            return (
              <td className="border border-gray-950 p-1 text-center">
                {groupedData[key].SIZES[size]}
              </td>
            );
          })}
          <td className="border border-gray-950 p-1 text-center">
            {groupedData[key].TOTAL_QTY}
          </td>
          <td className="border border-gray-950 p-1 text-center">
            {groupedData[key].EXTRA_PERCENT}
          </td>
          <td className="border border-gray-950 p-1 text-center">
            {groupedData[key].CONSUMPTION_PER_UNIT}
          </td>
          <td className="border border-gray-950 p-1">
            {groupedData[key].UOM}
          </td>
          <td className="border border-gray-950 p-1 text-center">
            {groupedData[key].RATE.toFixed(6)}
          </td>
          <td className="border border-gray-950 p-1 text-center">
            {Number(groupedData[key].AMOUNT).toFixed(4)}
          </td>
        </tr>
      ))}
      <tr className="font-bold bg-yellow-100" style={{ backgroundColor: "#fbffdd" }}>
        <td colSpan={firstHeader?.length} className="border text-center border-gray-950 p-1 font-bold">
          PO Wise Sub Total
        </td>

        {sizeHeader?.map((size) => (
          <td key={`grand-${size}`} className="border border-gray-950 p-1 text-center font-bold">
            {sizeGrandTotals[size] || 0}
          </td>
        ))}

        <td className="border border-gray-950 p-1 text-center font-bold">{grandTotal?.TOTAL_QTY}</td>
        <td className="border border-gray-950 p-1 text-center font-bold"></td>
        <td className="border border-gray-950 p-1 text-center font-bold"></td>
        <td className="border border-gray-950 p-1 text-center font-bold"></td>
        <td className="border border-gray-950 p-1 text-center font-bold"></td>
        <td className="border border-gray-950 p-1 text-center font-bold">{grandTotal?.AMOUNT.toFixed(4)}</td>
      </tr>
    </>
  );
}

export default ReportTable;
