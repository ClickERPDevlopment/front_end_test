/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportSubgroup from "./report-subgroup";
import { InternalProductPlacementSheetReportType } from "../internal-product-placement-sheet-report-type";

function ReportTable({
  data,
  firstHeader,
  trackIndex,
}: {
  data: InternalProductPlacementSheetReportType[];
  firstHeader: string[] | null;
  trackIndex: number;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: InternalProductPlacementSheetReportType[],
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

  interface IGroupe {
    [key: string]: {
      items: InternalProductPlacementSheetReportType[];
    };
  }

  let groupedData: IGroupe = {};

  if (data) {
    groupedData = groupBy(data, ["BUYERNAME",
      "PONO",
      "COMMERCIALFACTORYPREFIX",
      "STYLEID",
      "NOCOLOR",
      "PROPOSEDELIVERYDATE",
      "DELIVERYDATE",
      "PORECEIVEDATE",
      "FRIDATE",
      "PACKEDQTY",
      "ORDERQTY",]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalOrderQuantiy = data?.reduce(
    (acc, item) => acc + Number(item.ORDERQTY),
    0);

  return (
    <>
      <td colSpan={11} className="border border-gray-950 font-bold p-0.5 text-center">{data[0]?.ITEMTYPE}</td>
      {uniqueKeysArray?.map((key, index) => {
        return (
          <ReportSubgroup
            key={key}
            data={groupedData[key].items}
            index={index + trackIndex}
            firstHeader={firstHeader}
          ></ReportSubgroup>
        );
      })}
      <tr style={{ fontSize: "14px" }}>
        <td colSpan={4} className="border border-gray-950 font-bold p-0.5">Total</td>
        <td className="border border-gray-950 p-0.5 font-bold">{totalOrderQuantiy}</td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
        <td className="border border-gray-950 p-0.5"></td>
      </tr>
    </>
  );
}

export default ReportTable;
