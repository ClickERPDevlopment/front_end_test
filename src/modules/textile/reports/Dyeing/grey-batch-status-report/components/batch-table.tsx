import moment from "moment";
import { GreyBatchStatusReportBatchDetailsDto } from "./Interfaces";

//up
export interface props {
  batchDtls: GreyBatchStatusReportBatchDetailsDto[];
}

export default function BatchTable({ batchDtls }: props) {
  function getTotalQty(): number {
    let total = 0;
    batchDtls.forEach((element) => {
      total += element.QUANTITY;
    });
    return total;
  }

  return (
    <>
      <table>
        <thead className="bg-green-300">
          <tr>
            <th className="text-xs border border-black min-w-28" colSpan={7}>
              BATCH DETAILS
            </th>
          </tr>
          <tr>
            <th className="text-xs border border-black p-2 min-w-28">
              BATCH DATE
            </th>
            <th className="text-xs border border-black p-2 min-w-28">
              BATCH NO
            </th>
            <th className="text-xs border border-black p-2 min-w-32">COLOR</th>
            <th className="text-xs border border-black p-2 min-w-48">
              Quantity
            </th>
            <th className="text-xs border border-black p-2 min-w-32">FABRIC</th>
            <th className="text-xs border border-black p-2 min-w-32">
              FIN. DIA
            </th>
            <th className="text-xs border border-black p-2 min-w-32">
              FIN. SHAPE
            </th>
          </tr>
        </thead>
        <tbody>
          {batchDtls.map((dtls) => (
            <tr key={Math.random()}>
              <td className="text-xs border border-black p-1 text-center">
                {moment(dtls.BATCH_DATE).format("DD-MMM-YYYY")}
              </td>
              <td className="text-xs border border-black p-1 text-center">
                {dtls.BATCH_NO}
              </td>
              <td className="text-xs border border-black p-1 text-center">
                {dtls.GMT_COLOR}
              </td>
              <td className="text-xs border border-black p-1 text-center">
                {dtls.QUANTITY}
              </td>
              <td className="text-xs border border-black p-1 text-center">
                {dtls.FABRIC}
              </td>
              <td className="text-xs border border-black p-1 text-center">
                {dtls.FIN_DIA}
              </td>
              <td className="text-xs border border-black p-1 text-center">
                {dtls.FIN_REQ_SHAPE}
              </td>
            </tr>
          ))}
          <tr key={Math.random()}>
            <td className="text-xs border border-black p-1 text-center font-bold">
              TOTAL
            </td>
            <td className="text-xs border border-black p-1 text-center"></td>
            <td className="text-xs border border-black p-1 text-center"></td>
            <td className="text-xs border border-black p-1 text-center font-bold">
              {getTotalQty()}
            </td>
            <td className="text-xs border border-black p-1 text-center"></td>
            <td className="text-xs border border-black p-1 text-center"></td>
            <td className="text-xs border border-black p-1 text-center"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
