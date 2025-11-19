/* eslint-disable @typescript-eslint/no-explicit-any */
import { MaterialReceiveReportType } from "../material-receive-report-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
}: {
  data: MaterialReceiveReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: MaterialReceiveReportType[],
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
      items: MaterialReceiveReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["PURCHASE_ORDER_NO", "ITEM_NAME", "MODEL", "BRAND_NAME", "ORIGIN_NAME", "ACTUAL_PRICE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalRcvQty = data.reduce((acc, item) => acc + item.RECEIVE_QTY, 0)
  const totalAdditionalQty = data.reduce((acc, item) => acc + item.ADDITIONAL_QTY, 0)
  const totalAmount = data.reduce((acc, item) => acc + (item.RECEIVE_QTY * item.ACTUAL_PRICE), 0)


  return (
    <>
      {uniqueKeysArray?.map((key, index) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
          index={index}
          firstHeader={firstHeader}
        ></ReportSubgroup>
      ))}
      <tr style={{ fontSize: "14px" }}>
        <td colSpan={7} className="border border-gray-950 font-bold p-0.5">Total</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalRcvQty}</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalAdditionalQty}</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalAmount}</td>
      </tr>
    </>
  );
}

export default ReportTable;
