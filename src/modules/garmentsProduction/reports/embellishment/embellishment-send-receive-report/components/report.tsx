/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { SupplierWiseEmbStockReportType } from "../embellishment-send-receive-report-type";

function Report({
  data,
  searchParamsObj
}: {
  data: SupplierWiseEmbStockReportType[];
  searchParamsObj: {
    fromOpmDate: string,
    toOpmDate: string,
    fromSendRcvDate: string,
    toSendRcvDate: string,
    isOpmDate: boolean,
    isSendRcvDate: boolean,
  }
}) {


  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: SupplierWiseEmbStockReportType[],
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
      items: SupplierWiseEmbStockReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["BUYER"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "Buyer",
    "Style No",
    "Style Name",
    "PO No",
    "Color",
    "Order Qty",
  ];

  const middleHeader = [
    "Print",
    "Emb",
    "Print Emb",
    "Wash"
  ];

  const lastHeader: string[] = [];


   const pSend = data?.reduce((acc, item) => acc + item.P_SENDQTY, 0)
  const eSend = data?.reduce((acc, item) => acc + item.E_SENDQTY, 0)
  const peSend = data?.reduce((acc, item) => acc + item.PE_SENDQTY, 0)
  const wSend = data?.reduce((acc, item) => acc + item.W_SENDQTY, 0)

  const pRcv = data?.reduce((acc, item) => acc + item.P_RECEIVEQTY, 0)
  const eRcv = data?.reduce((acc, item) => acc + item.E_RECEIVEQTY, 0)
  const peRcv = data?.reduce((acc, item) => acc + item.PE_RECEIVEQTY, 0)
  const wRcv = data?.reduce((acc, item) => acc + item.W_RECEIVEQTY, 0)

  // const pProcess = data?.reduce((acc, item) => acc + item.P_PROCESS_QTY, 0)
  // const eProcess = data?.reduce((acc, item) => acc + item.E_PROCESS_QTY, 0)
  // const peProcess = data?.reduce((acc, item) => acc + item.PE_PROCESS_QTY, 0)
  // const wProcess = data?.reduce((acc, item) => acc + item.W_PROCESS_QTY, 0)

  const pStock = data?.reduce((acc, item) => acc + item.P_STOCK, 0)
  const eStock = data?.reduce((acc, item) => acc + item.E_STOCK, 0)
  const peStock = data?.reduce((acc, item) => acc + item.PE_STOCK, 0)
  const wStock = data?.reduce((acc, item) => acc + item.W_STOCK, 0)

  const orderQty = data?.reduce((acc, item) => acc + item.ORDQTY, 0)


  console.log(data);


  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          searchParamsObj={searchParamsObj}
          data={data}
        />
        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
          <thead className="sticky top-0 print:static">
            {/* First header row */}
            <tr style={{ fontSize: "13px" }} className="bg-indigo-200 text-center">
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
                Embellishment Send
              </th>
              <th
                colSpan={middleHeader.length}
                className="border border-gray-950 p-0.5"
              >
                Embellishment Receive
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

            <tr style={{ fontSize: "13px" }} className="font-bold">
              <td colSpan={5} className="border border-gray-950 p-0.5 text-right">Grand Total</td>
              <td className="border border-gray-950 p-0.5 text-center">{orderQty}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pSend}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eSend}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#aacde2" }}>{peSend}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e6e88d" }}>{wSend}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pRcv}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eRcv}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#aacde2" }}>{peRcv}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e6e88d" }}>{wRcv}</td>
              {/* <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pProcess}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eProcess}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#aacde2" }}>{peProcess}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e6e88d" }}>{wProcess}</td> */}
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pStock}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eStock}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#aacde2" }}>{peStock}</td>
              <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e6e88d" }}>{wStock}</td>
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
