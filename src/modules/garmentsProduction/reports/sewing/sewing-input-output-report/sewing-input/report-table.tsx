/* eslint-disable @typescript-eslint/no-explicit-any */

import moment from "moment";
import { SewingInputDetailsReportType } from "../sewing-input-output-report-type";


function ReportTable({
  data,
  firstHeader,
  sizeHeader,
}: {
  data: SewingInputDetailsReportType[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();



  const grandTotal: IGrandTotal = {
    SEWINGINPUTQTY: 0
  };


  data[0]?.SEWINGINPUTDATE



  function groupBy(data: SewingInputDetailsReportType[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          SEWINGINPUTDATE: item.SEWINGINPUTDATE,
          BUYER: item.BUYER,
          STYLENO: item.STYLENO,
          PONO: item.PONO,
          COLORNAME: item.COLORNAME,
          COLOR: item.GMT_COLOR_NAME,
          LINENAME: item.LINENAME,
          REMARKS: item.REMARKS,
          SEWINGINPUTQTY: 0,
          SIZES: {},
        };
      }

      if (!result[key].SIZES[item.SIZENAME]) {
        result[key].SIZES[item.SIZENAME] = 0;
      }

      result[key].SIZES[item.SIZENAME] += Number(item.SEWINGINPUTQTY);
      result[key].SEWINGINPUTQTY += Number(item.SEWINGINPUTQTY);

      grandTotal.SEWINGINPUTQTY += Number(item.SEWINGINPUTQTY);

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      SEWINGINPUTDATE: string;
      BUYER: string;
      STYLENO: string;
      PONO: string;
      COLORNAME: string;
      LINENAME: string;
      REMARKS: string;
      SEWINGINPUTQTY: number;
      SIZES: { [key: string]: number };
    };
  }

  interface IGrandTotal {
    SEWINGINPUTQTY: number;
  }

  let groupedData: GroupedData = {};

  if (data) {
    groupedData = groupBy(data, [
      "SEWINGINPUTDATE",
      "BUYER",
      "STYLENO",
      "PONO",
      "COLORNAME",
      "LINENAME",
      "REMARKS"
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const sizeGrandTotals: Record<string, number> = {};
  data.forEach((item) => {
    if (item.SIZENAME) {
      sizeGrandTotals[item.SIZENAME] =
        (sizeGrandTotals[item.SIZENAME] || 0) + item.SEWINGINPUTQTY;
    }
  });

  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <tr key={key}>
          <td className="border text-center border-gray-950 p-1">
            {moment(groupedData[key].SEWINGINPUTDATE).format("DD-MM-YYYY")}
          </td>
          <td className="border text-center border-gray-950 p-1">
            {groupedData[key].PONO}
          </td>
          <td className="border border-gray-950 p-1">
            {groupedData[key].COLORNAME}
          </td>
          <td className="border border-gray-950 p-1">
            {groupedData[key].LINENAME}
          </td>

          {sizeHeader?.map((size) => {
            return (
              <td className="border border-gray-950 p-1 text-center">
                {groupedData[key].SIZES[size]}
              </td>
            );
          })}
          <td className="border border-gray-950 p-1 text-center">
            {groupedData[key].SEWINGINPUTQTY}
          </td>
          <td className="border border-gray-950 p-1 text-center">
            {groupedData[key].REMARKS}
          </td>
        </tr>
      ))}
    </>
  );
}

export default ReportTable;
