import { EmbellishmentHourlyProductionReportType } from "../embellishment-hourly-production-report-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
  hourHeader,
  secondHeader,
}: {
  data: EmbellishmentHourlyProductionReportType[];
  firstHeader: string[] | null;
  hourHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  const grandTotal: IGrandTotal = {
    TOTAL_QTY: 0,
  };

  const hourWiseGrandTotal: { [hour: string]: number } = {};

  function groupBy(data: EmbellishmentHourlyProductionReportType[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          SUPPLIER: item.SUPPLIER,
          WORK_ORDER_NO: item.WORK_ORDER_NO,
          BUYER: item.BUYER,
          STYLE: item.STYLE,
          PO_NO: item.PO_NO,
          OS_BUYER: item.OS_BUYER,
          OS_STYLE: item.OS_STYLE,
          OS_PO_NO: item.OS_PO_NO,
          COLOR: item.COLOR,
          PARTS: item?.PARTS,
          SIZENAME: item.SIZENAME,
          QC_PASSED_QTY: 0,
          HOURS: {},
        };
      }

      if (!result[key].HOURS[item.PRODUCTION_HOUR]) {
        result[key].HOURS[item.PRODUCTION_HOUR] = 0;
      }

      if (!hourWiseGrandTotal[item.PRODUCTION_HOUR]) {
        hourWiseGrandTotal[item.PRODUCTION_HOUR] = 0;
      }
      hourWiseGrandTotal[item.PRODUCTION_HOUR] += Number(item.QC_PASSED_QTY);

      result[key].HOURS[item.PRODUCTION_HOUR] += Number(item.QC_PASSED_QTY);
      result[key].QC_PASSED_QTY += Number(item.QC_PASSED_QTY) || 0;

      grandTotal.TOTAL_QTY += Number(item.QC_PASSED_QTY) || 0;

      return result;
    }, {});
  }


  interface GroupedData {
    [key: string]: {
      SUPPLIER: string;
      WORK_ORDER_NO: string;
      BUYER: string;
      STYLE: string;
      PO_NO: string;
      OS_BUYER: string;
      OS_STYLE: string;
      OS_PO_NO: string;
      COLOR: string;
      SIZENAME: string;
      QC_PASSED_QTY: number;
      PARTS: string;
      HOURS: { [key: string]: number };
    };
  }

  interface IGrandTotal {
    TOTAL_QTY: number;
  }

  let groupedData: GroupedData = {};

  if (data) {
    groupedData = groupBy(data, [
      "SUPPLIER",
      "WORK_ORDER_NO",
      "STYLE",
      "PO_NO",
      "OS_BUYER",
      "OS_STYLE",
      "OS_PO_NO",
      "COLOR",
      "SIZENAME",
      "PARTS",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  let header;
  if (hourHeader && secondHeader) {
    header = firstHeader?.concat(hourHeader).concat(secondHeader);
  }

  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
          <tr>
            <th className="border border-gray-300 p-1" colSpan={firstHeader?.length}>ORDER DETAILS</th>
            <th className="border border-gray-300 p-1" colSpan={(hourHeader?.length || 0) + 1}>HOURLY INFORMATION</th>
          </tr>
          <tr>
            {header?.map((item) => (
              <th className="border border-gray-300 p-1">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <tr key={key}>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key]?.SUPPLIER}
              </td>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key]?.WORK_ORDER_NO}
              </td>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key]?.BUYER || groupedData[key]?.OS_BUYER}
              </td>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key]?.STYLE || groupedData[key]?.OS_STYLE}
              </td>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key].PO_NO || groupedData[key].OS_PO_NO}
              </td>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key]?.COLOR}
              </td>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key]?.SIZENAME}
              </td>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key]?.PARTS}
              </td>

              {hourHeader?.map((size) => {
                return (
                  <td className="border border-gray-300 p-1 text-center">
                    {groupedData[key].HOURS[size]}
                  </td>
                );
              })}
              <td className="border border-gray-300 p-1 text-center">
                {Number(groupedData[key].QC_PASSED_QTY) || 0}
              </td>
            </tr>
          ))}

          <tr className="font-bold">
            <td
              className="border text-center border-gray-300 p-1"
              colSpan={firstHeader?.length}
            >
              Grand Total
            </td>
            {hourHeader?.map((size) => {
              return <td className="border border-gray-300 p-1 text-center">
                {hourWiseGrandTotal[size] || 0}
              </td>;
            })}

            <td className="border border-gray-300 p-1 text-center">
              {grandTotal.TOTAL_QTY}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
