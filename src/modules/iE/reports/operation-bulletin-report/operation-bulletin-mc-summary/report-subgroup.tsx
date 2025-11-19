import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function ReportSubgroup({
  data
}: {
  data: OperationBulletinReportType[];
  firstHeader: string[] | null;
  index: number;
}) {

  const totalQty = data.reduce((acc, item) => acc + item.ALLOTTEDMP, 0);


  return (
    <>
      <tr style={{ fontSize: "11px" }} className="font-bold">
        <td className="border border-gray-950 p-0.5">{data[0]?.MACHINENAME}</td>
        <td className="border border-gray-950 p-0.5">{data[0]?.SMV}</td>
        <td className="border border-gray-950 p-0.5">{totalQty}</td>
      </tr>
    </>
  );
}

export default ReportSubgroup;
