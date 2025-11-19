import { IGreyFabricIssueChallanReport } from "../grey-fabric-issue-challan-report-type";
import moment from "moment";

export default function ReportTable({
  data,
}: {
  data: IGreyFabricIssueChallanReport[];
}) {
  const columns = [
    { name: "DATE", classes: "min-w-[150px]" },
    { name: "STYLE", classes: "min-w-[150px]" },
    { name: "ORDER", classes: "min-w-[150px]" },
    { name: "FABRIC TYPE", classes: "min-w-[100px]" },
    { name: "YARN COUNT/BRAND", classes: "min-w-[150px]" },
    { name: "YARN LOT", classes: "" },
    { name: "M/C DIA & GAUGE", classes: "" },
    { name: "FIN. DIA", classes: "" },
    { name: "P/GSM", classes: "" },
    { name: "COLOR", classes: "" },
    { name: "S/L", classes: "" },
    { name: "ROLL", classes: "" },
    { name: "QTY(KG)", classes: "" },
    { name: "PARTY CHALLAN NO", classes: "" },
  ];

  const totalRoll = data.reduce((acc, item) => {
    return (acc += item.ROLL_QTY);
  }, 0);
  const totalQty = data.reduce((acc, item) => {
    return (acc += item.QTY_KG);
  }, 0);

  return (
    <>
      <table className="w-[100%]">
        <thead className="">
          <tr id="table-header-row" className="bg-teal-200">
            {columns.map((c) => (
              <th
                key={Math.random()}
                className={"border p-1 text-xs  " + c.classes}
              >
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="table-body">
          {data.map((item) => (
            <tr>
              <td className="border text-center text-xs">
                {moment(item.CHALLAN_DATE).format("DD-MMM-YY")}
              </td>
              <td className="border text-center text-xs">{item.STYLE}</td>
              <td className="border text-center text-xs">{item.PO_NO}</td>
              <td className="border text-center text-xs">{item.FABRIC}</td>
              <td className="border text-center text-xs">{item.YARN_COUNT}</td>
              <td className="border text-center text-xs">
                {item.YARN_LOT_NUMBER}
              </td>
              <td className="border text-center text-xs">
                {item.YARN_CHALLAN_REQ_DIA} & {item.GAUGE}
              </td>
              <td className="border text-center text-xs">{item.GREY_SHAPE}</td>
              <td className="border text-center text-xs">{item.GMT_GSM}</td>
              <td className="border text-center text-xs">{item.GMT_COLOR}</td>
              <td className="border text-center text-xs">
                {item.STITCH_LENGTH}
              </td>
              <td className="border text-center text-xs">{item.ROLL_QTY}</td>
              <td className="border text-center text-xs">{item.QTY_KG}</td>
              <td className="border text-center text-xs">{item.CHALLAN_NO}</td>
            </tr>
          ))}
          <tr>
            <td className="border text-center text-xs font-bold" colSpan={11}>
              Total
            </td>
            <td className="border text-center text-xs font-bold">
              {totalRoll}
            </td>
            <td className="border text-center text-xs font-bold">{totalQty}</td>
            <td className="border text-center text-xs"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
