/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { SupplierWiseEmbStockColorSizeWiseReportType } from "../supplier-wise-emb-stock-color-size-wise-report-type";

function Report({
  data,
}: {
  data: SupplierWiseEmbStockColorSizeWiseReportType[];
}) {


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: SupplierWiseEmbStockColorSizeWiseReportType[],
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
      items: SupplierWiseEmbStockColorSizeWiseReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["SUPPLIER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "Buyer",
    "Style No",
    "Style Name",
    "PO No",
    "Color",
    "Size",
    "Order Qty",
  ];

  const middleHeader = [
    "Print",
    "Emb",
    "Print Emb",
    "Wash"
  ];

  const lastHeader = [
    "Remarks",
  ];

  const pRcv = data?.reduce((acc, item) => acc + item.P_RECEIVEQTY, 0)
  const eRcv = data?.reduce((acc, item) => acc + item.E_RECEIVEQTY, 0)
  const peRcv = data?.reduce((acc, item) => acc + item.PE_RECEIVEQTY, 0)
  const wRcv = data?.reduce((acc, item) => acc + item.W_RECEIVEQTY, 0)

  const pProcess = data?.reduce((acc, item) => acc + item.P_SENDQTY, 0)
  const eProcess = data?.reduce((acc, item) => acc + item.E_SENDQTY, 0)
  const peProcess = data?.reduce((acc, item) => acc + item.PE_SENDQTY, 0)
  const wProcess = data?.reduce((acc, item) => acc + item.W_SENDQTY, 0)

  const pStock = data?.reduce((acc, item) => acc + item.P_STOCK, 0)
  const eStock = data?.reduce((acc, item) => acc + item.E_STOCK, 0)
  const peStock = data?.reduce((acc, item) => acc + item.PE_STOCK, 0)
  const wStock = data?.reduce((acc, item) => acc + item.W_STOCK, 0)

  const orderQty = data?.reduce((acc, item) => acc + item.ORDQTY, 0)



  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            {/* First header row */}
            <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
              {firstHeader?.map((item) => (
                <th
                  key={item}
                  rowSpan={2}
                  className="border border-gray-950 p-0.5"
                >
                  {item}
                </th>
              ))}

              <th
                colSpan={middleHeader.length}
                className="border border-gray-950 p-0.5"
              >
                Embellishment Rcv from Factory
              </th>
              <th
                colSpan={middleHeader.length}
                className="border border-gray-950 p-0.5"
              >
                Embellishment Return to Factory
              </th>
              <th
                colSpan={middleHeader.length}
                className="border border-gray-950 p-0.5"
              >
                Embellishment Stock in Supplier
              </th>

              {lastHeader?.map((item) => (
                <th
                  key={item}
                  rowSpan={2}
                  className="border border-gray-950 p-0.5"
                >
                  {item}
                </th>
              ))}
            </tr>

            {/* Second header row */}
            <tr style={{ fontSize: "12px" }} className="bg-indigo-100 text-center">
              {middleHeader?.map((item) => (
                <th key={`rcv-${item}`} className="border border-gray-950 p-0.5">
                  {item}
                </th>
              ))}
              {middleHeader?.map((item) => (
                <th key={`proc-${item}`} className="border border-gray-950 p-0.5">
                  {item}
                </th>
              ))}
              {middleHeader?.map((item) => (
                <th key={`stock-${item}`} className="border border-gray-950 p-0.5">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {uniqueKeysArray?.map((key) => (
              <ReportTable
                key={key}
                data={groupedByDate[key].items}
                firstHeader={firstHeader}
              ></ReportTable>
            ))}

            <tr style={{ fontSize: "12px" }} className="font-bold">
              <td colSpan={6} className="border border-gray-950 p-0.5 text-center">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{orderQty}</td>
              <td className="border border-gray-950 p-0.5 text-center">{pRcv}</td>
              <td className="border border-gray-950 p-0.5 text-center">{eRcv}</td>
              <td className="border border-gray-950 p-0.5 text-center">{peRcv}</td>
              <td className="border border-gray-950 p-0.5 text-center">{wRcv}</td>
              <td className="border border-gray-950 p-0.5 text-center">{pProcess}</td>
              <td className="border border-gray-950 p-0.5 text-center">{eProcess}</td>
              <td className="border border-gray-950 p-0.5 text-center">{peProcess}</td>
              <td className="border border-gray-950 p-0.5 text-center">{wProcess}</td>
              <td className="border border-gray-950 p-0.5 text-center">{pStock}</td>
              <td className="border border-gray-950 p-0.5 text-center">{eStock}</td>
              <td className="border border-gray-950 p-0.5 text-center">{peStock}</td>
              <td className="border border-gray-950 p-0.5 text-center">{wStock}</td>
              <td className="border border-gray-950 p-0.5">{ }</td>
            </tr>

          </tbody>
        </table>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
