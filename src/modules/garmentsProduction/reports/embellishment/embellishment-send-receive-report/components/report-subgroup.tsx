import { SupplierWiseEmbStockReportType } from "../embellishment-send-receive-report-type";

function ReportSubgroup({
  data,
}: {
  data: SupplierWiseEmbStockReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

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

  return (
    <>
      <tr style={{ fontSize: "12px" }} className="font-light">
        <td className="border border-gray-950 p-0.5">{data[0]?.BUYER}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.STYLENO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.STYLENAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.PONO}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.COLORNAME}</td>
        <td className="border border-gray-950 p-0.5 text-center">{orderQty}</td>

        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pSend}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eSend}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#aacde2" }}>{peSend}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e6e88d" }}>{wSend}</td>

        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pRcv}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eRcv}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#aacde2" }}>{peRcv}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e6e88d" }}>{wRcv}</td>

        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#c9eaa4" }}>{pStock}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e5b5ac" }}>{eStock}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#aacde2" }}>{peStock}</td>
        <td className="border border-gray-950 p-0.5 text-center" style={{ backgroundColor: "#e6e88d" }}>{wStock}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
