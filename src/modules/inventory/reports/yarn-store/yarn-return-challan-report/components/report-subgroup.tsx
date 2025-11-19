import { YarnReturnChallanReportType } from "../yarn-challan-report-type";

function ReportSubgroup({
  data
}: {
  data: YarnReturnChallanReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalQty = data.reduce((acc, item) => acc + item.QTY, 0)
  const totalCtnQty = Math.floor(data.reduce((acc, item) => acc + item.CTN, 0));
  const totalCone = Math.floor(data.reduce((acc, item) => acc + item.CONE, 0));

  return (
    <>
      <tr style={{ fontSize: "14px" }}>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN}</td>
        <td className="border border-gray-950 p-0.5 text-nowrap">{data[0]?.YARN_BRAND}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.YARN_LOT_NUMBER}</td>
        <td className="border border-gray-950 p-0.5 text-center">{totalQty}</td>
        <td className="border border-gray-950 p-0.5 text-center">B:{totalCtnQty} | C:{totalCone}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
