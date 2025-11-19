import { IPartyWiseKnittingProgram } from "../party-wise-knitting-program-report-type";

function ReportSummary({
  data,
  index
}: {
  data: IPartyWiseKnittingProgram[];
  index: number
}) {

  const totalQtyKg = data?.reduce(
    (acc, item) => acc + Number(item.DTLS_QTY),
    0
  );

  return (
    <>
      <tr style={{ fontSize: "14px" }} className="font-bold">
        <td className="border border-gray-950 p-0.5">{index + 1}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.BRAND_NAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalQtyKg.toFixed(2)}</td>
      </tr>
    </>
  );
}

export default ReportSummary;
