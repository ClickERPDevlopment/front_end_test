import { GreyBatchStatusReportGreyRcvSummaryDto } from "./Interfaces";

type props = {
  lstBookingSummary: GreyBatchStatusReportGreyRcvSummaryDto[];
  lstGreyRcvSummary: GreyBatchStatusReportGreyRcvSummaryDto[];
};

function getRowSpan(
  booking: GreyBatchStatusReportGreyRcvSummaryDto[],
  rcv: GreyBatchStatusReportGreyRcvSummaryDto[]
) {
  // alert(booking.length + "_" + rcv.length);
  return booking.length > rcv.length ? booking.length : rcv.length;
}

export default function PoColorWiseGroupSummaryRow({
  lstGreyRcvSummary,
  lstBookingSummary,
}: props) {
  function getTotalBookingQty(): number {
    let qty: number = 0;
    lstBookingSummary.forEach((element) => {
      qty += element.REQUIRED_QTY;
    });
    return Number(qty.toFixed(2));
  }

  function getTotalBookingQtyPcs(): number {
    let qty: number = 0;
    lstBookingSummary.forEach((element) => {
      qty += element.REQUIRED_QTY_PCS;
    });
    return Number(qty.toFixed(2));
  }

  function getTotalReceiveQty(): number {
    let qty: number = 0;
    lstGreyRcvSummary.forEach((element) => {
      qty += element.RCV_QTY;
    });
    return Number(qty.toFixed(2));
  }

  function getTotalReceiveQtyPcs(): number {
    let qty: number = 0;
    lstGreyRcvSummary.forEach((element) => {
      qty += element.RCV_QTY_PCS;
    });
    return Number(qty.toFixed(2));
  }

  return (
    <>
      <tr>
        <td
          rowSpan={getRowSpan(lstBookingSummary, lstGreyRcvSummary)}
          className="border border-black text-xs text-center p-1"
        >
          {lstBookingSummary[0]?.FABRIC}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstBookingSummary[0]?.FINISH_DIA}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstBookingSummary[0]?.REQUIRED_QTY}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstBookingSummary[0]?.REQUIRED_QTY_PCS}
        </td>
        <td
          rowSpan={getRowSpan(lstBookingSummary, lstGreyRcvSummary)}
          className="border border-black text-xs text-center p-1"
        >
          {getTotalBookingQty()}
        </td>
        <td
          rowSpan={getRowSpan(lstBookingSummary, lstGreyRcvSummary)}
          className="border border-black text-xs text-center p-1"
        >
          {getTotalBookingQtyPcs()}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstGreyRcvSummary[0]?.FINISH_DIA}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstGreyRcvSummary[0]?.RCV_QTY}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {lstGreyRcvSummary[0]?.RCV_QTY_PCS}
        </td>
        <td
          rowSpan={getRowSpan(lstBookingSummary, lstGreyRcvSummary)}
          className="border border-black text-xs text-center p-1"
        >
          {getTotalReceiveQty()}
        </td>
        <td
          rowSpan={getRowSpan(lstBookingSummary, lstGreyRcvSummary)}
          className="border border-black text-xs text-center p-1"
        >
          {getTotalReceiveQtyPcs()}
        </td>
        <td
          rowSpan={getRowSpan(lstBookingSummary, lstGreyRcvSummary)}
          className="border border-black text-xs text-center p-1"
        >
          {(getTotalBookingQty() - getTotalReceiveQty())?.toFixed(2)}
        </td>
        <td
          rowSpan={getRowSpan(lstBookingSummary, lstGreyRcvSummary)}
          className="border border-black text-xs text-center p-1"
        >
          {getTotalBookingQtyPcs() - getTotalReceiveQtyPcs()}
        </td>
      </tr>
      {/* end first row */}

      {/* other rows with in lstGreyRcvSummary total rows */}
      {lstBookingSummary
        ?.filter((_d, i) => i !== 0)
        .map((gRcv, gRcvgIndex) => (
          <tr>
            <td className="border border-black text-xs text-center p-1">
              {gRcv?.FINISH_DIA}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {gRcv?.REQUIRED_QTY}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {gRcv?.REQUIRED_QTY_PCS}
            </td>

            <td className="border border-black text-xs text-center p-1">
              {lstGreyRcvSummary[gRcvgIndex + 1]?.FINISH_DIA}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {lstGreyRcvSummary[gRcvgIndex + 1]?.RCV_QTY}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {lstGreyRcvSummary[gRcvgIndex + 1]?.RCV_QTY_PCS}
            </td>
          </tr>
        ))}
      {/* endother rows with in lstGreyRcvSummary total rows */}

      {/* other rows where grey rcv all rows not yet show. */}
      {lstGreyRcvSummary
        ?.filter((_d, i) => i >= lstBookingSummary.length)
        .map((gRcv) => (
          <tr key={Math.random()}>
            <td className="border border-black text-xs text-center p-1"></td>
            <td className="border border-black text-xs text-center p-1"></td>
            <td className="border border-black text-xs text-center p-1"></td>
            <td className="border border-black text-xs text-center p-1">
              {gRcv?.FINISH_DIA}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {gRcv?.RCV_QTY}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {gRcv?.RCV_QTY_PCS}
            </td>
          </tr>
        ))}
      {/* other rows where grey rcv all rows not yet show. */}
    </>
  );
}
