/* eslint-disable @typescript-eslint/no-explicit-any */
import { SewingInputChallanReportType } from "../sewing-input-challan-report-type";

function ReportTable({
  data,
  sizeHeader,
}: {
  data: SewingInputChallanReportType[];
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
    data: SewingInputChallanReportType[],
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

      result[key].SIZES[item.SIZENAME] = (result[key].SIZES[item.SIZENAME] || 0) + item.SEWINGINPUTQTY;
      result[key].QUANTITY = (result[key].QUANTITY || 0) + item.SEWINGINPUTQTY;
      grandTotal.SIZES[item.SIZENAME] = (grandTotal.SIZES[item.SIZENAME] || 0) + item.SEWINGINPUTQTY;
      grandTotal.QUANTITY += item.SEWINGINPUTQTY;

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
    groupedByDate = groupBy(data, ["PONO", "COLORNAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <tr style={{ fontSize: "11px" }} key={key}>
          <td className="border border-gray-950 p-0.5 text-center">{groupedByDate[key]?.PONO}</td>
          <td className="border border-gray-950 p-0.5 text-center">{groupedByDate[key]?.COLORNAME}</td>
          {sizeHeader?.map((size) =>
            <td key={size} className="border border-gray-950 p-0.5 text-center">{groupedByDate[key]?.SIZES[size] ? groupedByDate[key]?.SIZES[size] : ''}</td>
          )}
          <td className="border border-gray-950 p-0.5 text-center">{groupedByDate[key]?.QUANTITY}</td>
        </tr>
      ))}
    </>
  );
}

export default ReportTable;
