import useAppClient from "@/hooks/use-AppClient";
import { IPartyWiseKnittingProgram } from "../party-wise-knitting-program-report-type";

function ReportSubgroup({
  data,
  index,
  rowSpansByProgramNO,
  rowSpansByBuyer,
  rowSpansByStyle,
  rowSpansByYarn,
  rowSpansByFabric,
  fabricWiseTotalQtyKg,
  collarCuffDataLength,
}: {
  data: IPartyWiseKnittingProgram[];
  firstHeader: string[] | null;
  index: number;
  rowSpansByProgramNO?: number[];
  rowSpansByBuyer?: number[];
  rowSpansByStyle?: number[];
  rowSpansByYarn?: number[];
  rowSpansByFabric?: number[];
  fabricWiseTotalQtyKg?: number;
  collarCuffDataLength?: number;
}) {


  const totalQtyKg = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_QTY),
    0
  );

  const client = useAppClient();


  return (
    <>
      <tr style={{ fontSize: "11px" }}>
        <td className="border border-gray-950 p-0.5">{index + 1 + (collarCuffDataLength ?? 0)}</td>
        {
          rowSpansByProgramNO && rowSpansByProgramNO[index] > 0 &&
          <td className="border border-gray-950 p-0.5 font-bold" rowSpan={rowSpansByProgramNO[index]}>
            {data[0]?.KNITTING_PROGRAM_NO}
          </td>
        }

        {rowSpansByBuyer && rowSpansByBuyer[index] > 0 && (
          <td className="border border-gray-950 p-0.5" rowSpan={rowSpansByBuyer[index]}>
            {data[0]?.BUYER}
          </td>
        )}

        {rowSpansByStyle && rowSpansByStyle[index] > 0 && (
          <td className="border border-gray-950 p-0.5" rowSpan={rowSpansByStyle[index]}>
            {data[0]?.STYLENO}
          </td>
        )}

        {rowSpansByFabric && rowSpansByFabric[index] > 0 && (
          <td className="border border-gray-950 p-0.5" rowSpan={rowSpansByFabric[index]}>
            {data[0]?.FABRIC}
          </td>
        )}

        {
          rowSpansByYarn && rowSpansByYarn[index] > 0 &&
          <td className="border border-gray-950 p-0.5" rowSpan={rowSpansByYarn[index]}>
            {data[0]?.YARN}
          </td>
        }
        {client.isFame ?
          <td className="border border-gray-950 p-0.5">{data[0]?.YARN_SUPPLIER_CODE} x {data[0]?.YARN_LOT}</td> :
          <td className="border border-gray-950 p-0.5">{data[0]?.BRAND_NAME} x {data[0]?.YARN_LOT}</td>}

        {client.isFame &&
          <td className="border border-gray-950 p-0.5">{data[0]?.BRAND_NAME}</td>
        }
        <td className="border border-gray-950 p-0.5">
          {data[0]
            &&
            data[0].FABRIC_PART !== "COLLAR"
            &&
            data[0].FABRIC_PART !== "CUFF"
            &&
            (data[0]?.MC_DIA || data[0]?.GAUGE
              ? `${data[0]?.MC_DIA ?? ''}${data[0]?.MC_DIA && data[0]?.GAUGE ? ' x ' : ''}${data[0]?.GAUGE ?? ''}`
              : '')}
        </td>
        <td className="border border-gray-950 p-0.5">
          {
            data[0]
            &&
            data[0].FABRIC_PART !== "COLLAR"
            &&
            data[0].FABRIC_PART !== "CUFF"
            &&
            data[0]?.FINISH_DIA}
          {data[0]?.FABRIC_TYPE && (' x ' + data[0]?.FABRIC_TYPE)}
        </td>
        <td className="border border-gray-950 p-0.5">{data[0]?.GSM}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.COLORNAME}</td>
        <td style={{ fontSize: "14px" }} className="border border-gray-950 p-0.5 font-bold">{data[0]?.STITCH_LENGTH}</td>
        <td className="border border-gray-950 p-0.5">{totalQtyKg?.toFixed(2)}</td>
        {rowSpansByFabric && rowSpansByFabric[index] > 0 && (
          <td className="border border-gray-950 p-0.5 text-center font-bold" rowSpan={rowSpansByFabric[index]}>
            {fabricWiseTotalQtyKg?.toFixed(2)}
          </td>
        )}
        <td className="border border-gray-950 p-0.5">{data[0]?.REMARKS}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
