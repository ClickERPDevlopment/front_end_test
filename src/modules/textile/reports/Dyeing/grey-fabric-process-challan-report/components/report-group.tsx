import { GreyFabricProcessChallanReportType } from "../grey-fabric-process-challan-report-type";
import ReportSubgroup from "./report-subgroup";

function Reportgroup({
  data
}: {
  data: GreyFabricProcessChallanReportType[];
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: GreyFabricProcessChallanReportType[],
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
      items: GreyFabricProcessChallanReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, [
      "YARN_LOT",
      "YARN_BRAND",
      "YARN_NAME",
      "COLORNAME",
      "TREATMENT",
      "FIN_DIA",
      "GREY_SHAPE",
      "GSM",
      "STITCH_LENGTH",
      "DTL_REMARKS",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  return (
    <>
      <tr style={{ fontSize: "13px" }} className="bg-gray-300">
        <td colSpan={12} className="border border-gray-950 font-bold p-0.5">Fabric: {data[0]?.FABRIC}</td>
      </tr>
      {uniqueKeysArray?.map((key) => (
        <ReportSubgroup
          key={key}
          data={groupedByDate[key].items}
        ></ReportSubgroup>
      ))}
    </>
  );
}

export default Reportgroup;
