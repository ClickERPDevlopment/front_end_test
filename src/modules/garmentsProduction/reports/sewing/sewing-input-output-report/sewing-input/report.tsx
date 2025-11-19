/* eslint-disable @typescript-eslint/no-explicit-any */
import { SewingInputDetailsReportType } from "../sewing-input-output-report-type";
import ReportTable from "./report-table";

function SewingInputReport({
  data,
}: {
  data: SewingInputDetailsReportType[];
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: SewingInputDetailsReportType[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) result[key] = { items: [] };
      result[key].items.push(item);
      return result;
    }, {} as Record<string, { items: SewingInputDetailsReportType[] }>);
  }

  let groupedByBuyer = groupBy(data, [""]);

  const uniqueKeysArray = Array.from(uniqueKeys);

  const firstHeader = ["Date", "PO", "Color", "Line"];
  const secondHeader = ["Input Qty", "Remarks"];

  data[0]?.SEWINGINPUTQTY

  const uniqueSizes: Set<string> = new Set();
  data.forEach((item) => item.SIZENAME && uniqueSizes.add(item.SIZENAME));
  const sizeHeader = Array.from(uniqueSizes);

  const header = firstHeader.concat(sizeHeader).concat(secondHeader);

  const totalQty = data.reduce((acc, item) => acc + item.SEWINGINPUTQTY, 0);

  const sizeGrandTotals: Record<string, number> = {};
  data.forEach((item) => {
    if (item.SIZENAME) {
      sizeGrandTotals[item.SIZENAME] =
        (sizeGrandTotals[item.SIZENAME] || 0) + item.SEWINGINPUTQTY;
    }
  });

  return (
    <div style={{ fontFamily: "" }}>
      <div>
        <div className="text-sm mt-1">
          <p>
            <span className="font-bold">Buyer: </span>{data[0]?.BUYER}<span className="font-bold ms-2">Style: </span>{data[0]?.STYLENO}
          </p>
          <table className="data-table border-collapse border border-gray-950 w-full">
            <thead>
              <tr>
                {header.map((item) => (
                  <th key={item} className="border border-gray-950 p-1">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {uniqueKeysArray.map((key) => (
                <ReportTable
                  key={key}
                  data={groupedByBuyer[key].items}
                  firstHeader={firstHeader}
                  sizeHeader={sizeHeader}
                  secondHeader={secondHeader}
                />
              ))}

              <tr className="font-bold bg-yellow-100" style={{ backgroundColor: "#fbffdd" }}>
                <td colSpan={firstHeader.length} className="border text-center border-gray-950 p-1 font-bold">
                  Grand Total
                </td>

                {sizeHeader.map((size) => (
                  <td key={`grand-${size}`} className="border border-gray-950 p-1 text-center font-bold">
                    {sizeGrandTotals[size] || 0}
                  </td>
                ))}

                <td className="border border-gray-950 p-1 text-center font-bold">{totalQty}</td>
                <td className="border border-gray-950 p-1 text-center font-bold"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SewingInputReport;
