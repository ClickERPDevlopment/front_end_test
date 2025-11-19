/* eslint-disable @typescript-eslint/no-explicit-any */

import { IAccessoriesReportWithPo } from "../../accessories-report-with-po/accessories-with-po-type";

function ReportTable({
  data,
  firstHeader,
  sizeHeader,
  secondHeader,
}: {
  data: IAccessoriesReportWithPo[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IAccessoriesReportWithPo[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      console.log(item);

      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          STYLE: item.STYLENO,
          COLOR: item.GMT_COLOR_NAME,
          MTL_COLOR: item.MTL_COLOR_NAME,
          MTL_SIZE: item.MTL_SIZE_NAME,
          ITEM_NAME: item.MTL_NAME,
          REF_SWATCH: item.REF_SWATCH,
          UOM: item.UOM,
          ITEM_REF: item.DESCRIPTION,
          TOTAL_QTY: 0,
          RATE: item.SUPPLIER_RATE_PER_PCS,
          AMOUNT: 0,
          SIZES: {},
        };
      }

      if (!result[key].SIZES[item.GMT_SIZE_NAME]) {
        result[key].SIZES[item.GMT_SIZE_NAME] = 0;
      }

      result[key].SIZES[item.GMT_SIZE_NAME] += item.WORK_ORDER_QTY;
      result[key].TOTAL_QTY += item.WORK_ORDER_QTY;
      result[key].AMOUNT += item.SUPPLIER_RATE_PER_PCS * item.WORK_ORDER_QTY;

      return result;
    }, {});
  }

  const totalQty = data.reduce((acc, item) => {
    return (acc += Number(item.WORK_ORDER_QTY));
  }, 0);
  const totalAmount = data.reduce((acc, item) => {
    return (acc += Number(item?.SUPPLIER_RATE_PER_PCS * item.WORK_ORDER_QTY));
  }, 0);



  interface GroupedData {
    [key: string]: {
      STYLE: string;
      COLOR: string;
      MTL_COLOR: string;
      MTL_SIZE: string;
      ITEM_NAME: string;
      REF_SWATCH: string;
      UOM: string;
      ITEM_REF: string;
      TOTAL_QTY: number;
      RATE: number;
      AMOUNT: number;
      SIZES: { [key: string]: number };
    };
  }

  let groupedData: GroupedData = {};


  data[0]?.MTL_SIZE_NAME

  if (data) {
    groupedData = groupBy(data, [
      "STYLENO",
      "GMT_COLOR_NAME",
      "MTL_COLOR_NAME",
      "MTL_SIZE_NAME",
      "UOM",
      "DESCRIPTION",
      "SUPPLIER_RATE_PER_PCS",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  let header;
  if (sizeHeader && secondHeader) {
    header = firstHeader?.concat(sizeHeader).concat(secondHeader);
  }

  return (
    <div className="text-sm mt-3">
      <div className="flex items-center font-semibold justify-between">
        <p>BUYER: {data[0]?.BUYER_NAME}</p>
        <p className="text-right">
          <span className="font-bold">Currency:</span> {data[0]?.CURRENCY}
        </p>
      </div>
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead style={{ backgroundColor: "#a4f4cf" }}>
          <tr>
            {header?.map((item) => (
              <th className="border border-gray-300 p-1">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <tr key={key}>
              <td className="border border-gray-300 p-1">
                {groupedData[key].STYLE}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].COLOR}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].MTL_COLOR}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].REF_SWATCH}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].MTL_SIZE}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].ITEM_NAME}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].UOM}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].ITEM_REF}
              </td>

              {sizeHeader?.map((size) => {
                return (
                  <td className="border border-gray-300 p-1 text-center">
                    {groupedData[key].SIZES[size]}
                  </td>
                );
              })}

              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].TOTAL_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {groupedData[key].RATE}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {Number(groupedData[key].AMOUNT).toFixed(2)}
              </td>
            </tr>
          ))}
          <tr className="font-bold">
            <td
              colSpan={8 + Number(sizeHeader?.length)}
              className="border border-gray-300 p-1 text-center font-bold"
            >
              Total
            </td>

            <td className="border border-gray-300 p-1 text-center">
              {totalQty}
            </td>
            <td className="border border-gray-300 p-1 text-center"></td>
            <td className="border border-gray-300 p-1 text-center">
              {totalAmount.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
