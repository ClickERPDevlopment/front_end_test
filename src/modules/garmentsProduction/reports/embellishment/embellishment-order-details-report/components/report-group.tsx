/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportSubgroup from "./report-subgroup";
import { EmbellishmentOrderDetailsReportType } from "../embellishment-order-details-report-type";

function ReportGroup({
  data,
  firstHeader,
}: {
  data: EmbellishmentOrderDetailsReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: EmbellishmentOrderDetailsReportType[],
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
      items: EmbellishmentOrderDetailsReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["SUPPLIER", "WORK_ORDER_NO", "BUYER", "STYLE", "PO_NO", "COLOR", "SIZE_NAME", "PARTS", "OS_BUYER", "OS_STYLE", "OS_PO_NO"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  const totalQtyPcs = data.reduce(
    (acc, item) => acc + (item.WO_QTY || 0),
    0
  );

  const totalValue = data.reduce(
    (acc, item) => acc + ((item.RATE || 0) * (item.WO_QTY || 0)),
    0
  );


  const totalRcvQty = data.reduce(
    (acc, item) => acc + (item.RCV_QTY || 0),
    0
  );

  const totalProdQty = data.reduce(
    (acc, item) => acc + (item.PRO_QTY || 0),
    0
  );

  const totalDelQty = data.reduce(
    (acc, item) => acc + (item.DELIVERY_QTY || 0),
    0
  );

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

      <tr style={{ fontSize: "14px" }} className="font-bold">
        <td colSpan={12} className="border border-gray-950 p-0.5 text-center">Work Order Wise Subtotal</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalQtyPcs}</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5 text-center">{totalValue.toFixed(3)}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalRcvQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalProdQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalDelQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalProdQty - totalDelQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">{ }</td>
      </tr>
    </>
  );
}

export default ReportGroup;
