import { EmbellishmentDeliveryReportType } from "../../embellishment-delivery-report-type";

/* eslint-disable @typescript-eslint/no-explicit-any */
function ReportTable({
  data,
  firstHeader,
  secondHeader,
}: {
  data: EmbellishmentDeliveryReportType[];
  firstHeader: string[] | null;
  sizeHeader: string[] | null;
  secondHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  const grandTotal: IGrandTotal = {
    TOTAL_QTY: 0,
  };

  const sizeWiseGrandTotal: { [size: string]: number } = {};

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
          SIZES: {},
        };
      }

      if (!result[key].SIZES[item.SIZE_NAME]) {
        result[key].SIZES[item.SIZE_NAME] = 0;
      }

      if (!sizeWiseGrandTotal[item.SIZE_NAME]) {
        sizeWiseGrandTotal[item.SIZE_NAME] = 0;
      }
      sizeWiseGrandTotal[item.SIZE_NAME] += Number(item.REJECT_QTY);

      result[key].SIZES[item.SIZE_NAME] += Number(item.REJECT_QTY);
      result[key].TOTAL_DELIVERY_QTY += Number(item.REJECT_QTY) || 0;

      grandTotal.TOTAL_QTY += Number(item.REJECT_QTY) || 0;

      return result;
    }, {});
  }

  interface GroupedData {
    [key: string]: {
      PONO: string;
      OS_PONO: string;
      COLOR_NAME: string;
      TOTAL_DELIVERY_QTY: number;
      SIZES: { [key: string]: number };
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

  const header = [...(firstHeader ?? []), ...(secondHeader ?? [])];


  return (
    <div className="text-sm">
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
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
              colSpan={firstHeader?.length}
            >
              Grand Total
            </td>

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
