import { EmbellishmentDeliveryReportType } from "../../embellishment-delivery-report-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
}: {
  data: EmbellishmentDeliveryReportType[];
  firstHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  const grandTotal: IGrandTotal = {
    TOTAL_QTY: 0,
  };

  function groupBy(data: EmbellishmentDeliveryReportType[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          PONO: item.PONO,
          OS_PONO: item.OS_PONO,
          COLOR_NAME: item.COLOR_NAME,
          TOTAL_DELIVERY_QTY: 0,
        };
      }

      result[key].TOTAL_DELIVERY_QTY += Number(item.DELIVERY_QTY);

      grandTotal.TOTAL_QTY += Number(item.DELIVERY_QTY);

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      PONO: string;
      OS_PONO: string;
      COLOR_NAME: string;
      TOTAL_DELIVERY_QTY: number;
    };
  }

  interface IGrandTotal {
    TOTAL_QTY: number;
  }

  let groupedData: GroupedData = {};

  if (data) {
    groupedData = groupBy(data, [
      "PONO",
      "OS_PONO",
      "COLOR_NAME",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);


  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
          <tr>
            {firstHeader?.map((item) => (
              <th className="border border-gray-300 p-1">{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueKeysArray?.map((key) => (
            <tr key={key}>
              <td className="border text-center border-gray-300 p-1">
                {groupedData[key].PONO || groupedData[key].OS_PONO}
              </td>
              <td className="border border-gray-300 p-1">
                {groupedData[key].COLOR_NAME}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {Number(groupedData[key].TOTAL_DELIVERY_QTY) || 0}
              </td>
            </tr>
          ))}

          <tr>
            <td
              className="border text-center border-gray-300 p-1 font-bold"
              colSpan={2}
            >
              Grand Total
            </td>
            <td className="border border-gray-300 p-1 text-center">
              {grandTotal.TOTAL_QTY || 0}
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
