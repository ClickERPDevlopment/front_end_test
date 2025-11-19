import GreyRcvTotalRow from "./grey-rcv-total";
import moment from "moment";
import { GreyBatchStatusReportGreyRcvDtlsDto } from "./Interfaces";

export interface props {
  greyRcvDtls: GreyBatchStatusReportGreyRcvDtlsDto[];
}

export default function GreyRcvChallanGroup({ greyRcvDtls }: props) {
  const poIds: number[] = [];

  greyRcvDtls?.forEach((element) => {
    if (!poIds.includes(element.PO_ID)) {
      poIds.push(element.PO_ID);
    }
  });

  return (
    <>
      {/* SINGLE CHALLAN ROWS */}
      {/* this is the first row */}
      <tr key={Math.random()}>
        <td
          className="border border-black text-xs text-center p-1"
          rowSpan={greyRcvDtls.length}
        >
          {moment(greyRcvDtls[0]?.RCV_DATE.toString()).format("DD-MMM-YYYY")}
        </td>
        <td
          className="border border-black text-xs text-center p-1"
          rowSpan={greyRcvDtls.length}
        >
          {greyRcvDtls[0]?.RCV_CHALLAN_NO}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.BUYER}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.FABRIC}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.GSM}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.GMT_COLOR}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.YARN_COUNT}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.YARN_BRAND}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.YARN_LOT}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.FIN_DIA}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.FIN_REQ_SHAPE}
        </td>
        <td className="border border-black text-xs text-center p-1">
          {greyRcvDtls[0]?.QUANTITY}
        </td>
      </tr>
      {/* end first row */}

      {/* other row */}
      {greyRcvDtls
        .filter((_x, i) => i !== 0)
        .map((dtls) => (
          <tr key={Math.random()}>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.BUYER}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.FABRIC}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.GSM}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.GMT_COLOR}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.YARN_COUNT}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.YARN_BRAND}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.YARN_LOT}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.FIN_DIA}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.FIN_REQ_SHAPE}
            </td>
            <td className="border border-black text-xs text-center p-1">
              {dtls?.QUANTITY}
            </td>
          </tr>
        ))}
      {/* end other row */}

      {/* challan tottal qty */}
      <GreyRcvTotalRow greyRcvDtls={greyRcvDtls} title="TOTAL" />
    </>
  );
}
