/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { iaccWorkOrder } from "../../components/iaccWorkOrder";

function ReportTable({
  data,
  firstHeader,
  sizeHeader,
  secondHeader,
}: {
  data: iaccWorkOrder[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: iaccWorkOrder[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          ART_NO: item.STYLENO,
          ORDER_NO: item.PO_NO,
          PRODUCT_DEPT: item.PRODUCTFAMILY,
          ITEM: item.MTL_NAME,
          GMT_COLOR: item.GMT_COLOR_NAME,
          UOM: item.UOM,
          RATE: item.SUPPLIER_RATE_PER_PCS,
          TOTAL_AMOUNT: 0,
          ITEM_DESCRIPTION: item.DESCRIPTION,
          QUALITY: item.MTL_DESCRIPTION_2,
          TOTAL_QTY: 0,
          SIZES: {},
        };
      }

      result[key].SIZES[item.GMT_SIZE_NAME] = item.WORK_ORDER_QTY;
      result[key].TOTAL_QTY += Number(item.WORK_ORDER_QTY);
      result[key].TOTAL_AMOUNT += Number(item.TOTAL_AMOUNT);

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      ART_NO: string;
      ORDER_NO: string;
      PRODUCT_DEPT: string;
      ITEM: string;
      GMT_COLOR: string;
      UOM: string;
      RATE: string;
      TOTAL_AMOUNT: number;
      TOTAL_QTY: number;
      ITEM_DESCRIPTION: string;
      QUALITY: string;
      SIZES: { [key: string]: number };
    };
  }

  let groupedData: GroupedData = {};

  if (data) {
    groupedData = groupBy(data, [
      "STYLENO",
      "PO_NO",
      "PRODUCTFAMILY",
      "MTL_NAME",
      "GMT_COLOR_NAME",
      "UOM",
      "SUPPLIER_RATE_PER_PCS",
      "DESCRIPTION",
      "MTL_DESCRIPTION_2",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  return (
    <div className="text-sm mt-3">
      <div className="flex items-center font-semibold">
        <p>BUYER: {data[0]?.BUYER_NAME}</p>
        <p className="ml-2">BRAND: {data[0]?.BRAND_NAME}</p>
      </div>
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
          <tr>
            {firstHeader?.map((item) => (
              <th rowSpan={2} key={item} className="border border-gray-300 p-1">
                {item}
              </th>
            ))}

            {sizeHeader && sizeHeader.length > 0 ? (
              <th colSpan={sizeHeader?.length}>SIZE RANGE WITH QTY</th>
            ) : (
              ""
            )}

            {secondHeader?.map((item) => (
              <th rowSpan={2} key={item} className="border border-gray-300 p-1">
                {item}
              </th>
            ))}
          </tr>
          <tr>
            {sizeHeader?.map((item) => (
              <th key={item} className="border border-gray-300 p-1">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key, _index) => {
            const current = groupedData[key];
            return (
              <tr key={key}>
                <td className="border border-gray-300 p-1">{current.ART_NO}</td>
                <td className="border border-gray-300 p-1">
                  {current.ORDER_NO}
                </td>
                <td className="border border-gray-300 p-1">
                  {current.PRODUCT_DEPT}
                </td>
                <td className="border border-gray-300 p-1">{current.ITEM}</td>

                <td className="border border-gray-300 p-1">
                  {current.GMT_COLOR}
                </td>
                {sizeHeader?.map((size) => {
                  return (
                    <td
                      key={size}
                      className="border border-gray-300 p-1 text-center"
                    >
                      {current.SIZES[size]}
                    </td>
                  );
                })}
                <td className="border border-gray-300 p-1 text-center">
                  {current.TOTAL_QTY}
                </td>
                <td className="border border-gray-300 p-1">{current.UOM}</td>
                <td className="border border-gray-300 p-1">{current.RATE}</td>
                <td className="border border-gray-300 p-1">
                  {Number(current.TOTAL_AMOUNT).toFixed(2)}
                </td>
                <td className="border border-gray-300 p-1">
                  {current.ITEM_DESCRIPTION}
                </td>
                <td className="border border-gray-300 p-1">
                  {current.QUALITY}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
