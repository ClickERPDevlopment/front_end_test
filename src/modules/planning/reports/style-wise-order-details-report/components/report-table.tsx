/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleWiseOrderDetailsType } from "../style-wise-order-details-report-type";
import moment from "moment";

function ReportTable({
  data,
  sizeHeader,
}: {
  data: StyleWiseOrderDetailsType[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
}) {

  const grandTotal: {
    QUANTITY: number;
    SIZES: { [key: string]: number };
  } = {
    QUANTITY: 0,
    SIZES: {}
  };

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: StyleWiseOrderDetailsType[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          STYLENO: item.STYLENO,
          PONO: item.PONO,
          COLORNAME: item.COLORNAME,
          DELIVERYDATE: item.DELIVERYDATE,
          SIZES: {},
        };
      }

      result[key].SIZES[item.SIZENAME] = (result[key].SIZES[item.SIZENAME] || 0) + item.QTY;
      result[key].QUANTITY = (result[key].QUANTITY || 0) + item.QTY;
      grandTotal.SIZES[item.SIZENAME] = (grandTotal.SIZES[item.SIZENAME] || 0) + item.QTY;
      grandTotal.QUANTITY += item.QTY;

      return result;
    }, {});
  }

  interface GroupedByDate {
    [key: string]: {
      STYLENO: string;
      PONO: string;
      COLORNAME: string;
      DELIVERYDATE: string;
      QUANTITY: number;
      SIZES: { [key: string]: number };
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["STYLENO", "PONO", "COLORNAME", "DELIVERYDATE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <tr style={{ fontSize: "14px" }} key={key}>
          <td className="border border-gray-950 p-0.5 ">{groupedByDate[key]?.STYLENO}</td>
          <td className="border border-gray-950 p-0.5 ">{groupedByDate[key]?.PONO}</td>
          <td className="border border-gray-950 p-0.5 ">{groupedByDate[key]?.COLORNAME}</td>
          <td className="border border-gray-950 p-0.5 text-nowrap">{moment(groupedByDate[key]?.DELIVERYDATE).format("DD-MMM-YY")}</td>
          {sizeHeader?.map((size) =>
            <td key={size} className="border border-gray-950 p-0.5 text-right">{groupedByDate[key]?.SIZES[size] ? groupedByDate[key]?.SIZES[size] : ''}</td>
          )}
          <td className="border border-gray-950 p-0.5 text-right">{groupedByDate[key]?.QUANTITY}</td>
        </tr>
      ))}
      <tr style={{ fontSize: "14px", backgroundColor: "#e0fcef" }}>
        <td colSpan={4} className="border border-gray-950 font-bold p-0.5 text-right">Total</td>
        {sizeHeader?.map((size) =>
          <td key={size} className="border border-gray-950 p-0.5 font-bold text-right">{grandTotal.SIZES[size] ? grandTotal.SIZES[size] : ''}</td>
        )}
        <td className="border border-gray-950 p-0.5 font-bold text-right">{grandTotal?.QUANTITY}</td>
      </tr>
    </>
  );
}

export default ReportTable;
