/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMaterialOrderYarnDyeingReport } from "../../material-order-yarn-dyeing-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
}: {
  data: IMaterialOrderYarnDyeingReport[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IMaterialOrderYarnDyeingReport[],
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
      items: IMaterialOrderYarnDyeingReport[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["STYLENAME", "PO_NO", "MTL_NAME", "MTL_COLOR_NAME", "GMT_COLOR_NAME", "UOM", "SUPPLIER_RATE_PER_PCS"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  // const totalQuantiy = data?.reduce(
  //   (acc, item) => acc + Number(item.WORK_ORDER_QTY),
  //   0
  // );

  // const totalIsseQty = data?.reduce(
  //   (acc, item) => acc + Number(item.ISSUE_QTY),
  //   0
  // );

  // const totalAmount = data?.reduce(
  //   (acc, item) => acc + Number(item.WORK_ORDER_QTY * item.SUPPLIER_RATE_PER_PCS),
  //   0
  // );

  return (
    <>
      {/* <tr style={{ fontSize: "11px" }} className="font-bold">
        <td colSpan={9} className="border border-gray-950 p-0.5">PO: {data[0]?.PO_NO} | MTL NAME: {data[0]?.MTL_NAME}</td>
      </tr> */}
      {uniqueKeysArray?.map((key) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}

      {/* <tr style={{ fontSize: "11px" }} className="font-bold">
        <td colSpan={6} className="border border-gray-950 p-0.5 text-center">Sub Total</td>
        <td className="border border-gray-950 p-0.5">{totalQuantiy.toFixed(2)}</td> */}
      {/* <td className="border border-gray-950 p-0.5">{totalIsseQty.toFixed(2)}</td> */}
      {/* <td className="border border-gray-950 p-0.5">{(totalQuantiy - totalIsseQty).toFixed(2)}</td> */}
      {/* <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5">{totalAmount.toFixed(2)}</td>
      </tr> */}
    </>
  );
}

export default ReportTable;
