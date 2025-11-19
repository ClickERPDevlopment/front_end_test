import { PartyWiseKnittingProgramStripeMeasurementType } from "../stripe-measurement-type";
import StripeMeasurementTableSubGroupRow from "./stripe-measurement-table-subgroup-row";

function StripeMeasurementTableRow({
  data,
}: {
  data: PartyWiseKnittingProgramStripeMeasurementType[];
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: PartyWiseKnittingProgramStripeMeasurementType[],
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

  interface IGroupedData {
    [key: string]: {
      items: PartyWiseKnittingProgramStripeMeasurementType[];
    };
  }

  let groupedData: IGroupedData = {};

  if (data) {
    groupedData = groupBy(data, ["GMT_COLOR"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const totalFeeder = data.reduce((acc, item) => acc + item.FEEDER, 0)
  const totalStripeMeasure = data.reduce((acc, item) => acc + item.STRIPE_MEASUREMENT, 0)

  return (
    <>
      {uniqueKeysArray?.map((key) => (
        <StripeMeasurementTableSubGroupRow
          key={key}
          data={groupedData[key]?.items}
        ></StripeMeasurementTableSubGroupRow>
      ))}
      <tr style={{ fontSize: "11px" }} className="font-bold">
        <td colSpan={3} className="border border-gray-950 p-0.5">GMT Parts Wise Total</td>
        <td className="border border-gray-950 p-0.5">{totalFeeder.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalStripeMeasure.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
      </tr>
    </>
  );
}

export default StripeMeasurementTableRow;
