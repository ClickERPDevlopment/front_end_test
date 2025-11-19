import { PartyWiseKnittingProgramStripeMeasurementType } from "../stripe-measurement-type";

function StripeMeasurementTableSubGroupRow({
  data,
}: {
  data: PartyWiseKnittingProgramStripeMeasurementType[];
}) {

  const totalFeeder = data.reduce((acc, item) => acc + item.FEEDER, 0)
  const totalStripeMeasure = data.reduce((acc, item) => acc + item.STRIPE_MEASUREMENT, 0)

  return (
    <>
      {
        data?.length > 0 && data
          .map((item, index) => (
            <tr key={index} style={{ fontSize: "11px" }}>
              <td className="border border-gray-950 p-0.5">{item.GMT_PARTS}</td>
              <td className="border border-gray-950 p-0.5">{item.GMT_COLOR}</td>
              <td className="border border-gray-950 p-0.5">{item.YARN_COLOR}</td>
              <td className="border border-gray-950 p-0.5">{item.FEEDER.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{item.STRIPE_MEASUREMENT.toFixed(2)}</td>
              <td className="border border-gray-950 p-0.5">{item.UNIT}</td>
            </tr>
          ))
      }
      <tr style={{ fontSize: "11px" }} className="font-bold">
        <td colSpan={3} className="border border-gray-950 p-0.5">GMT Color Wise Total</td>
        <td className="border border-gray-950 p-0.5">{totalFeeder.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{totalStripeMeasure.toFixed(2)}</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
      </tr>
    </>
  );
}

export default StripeMeasurementTableSubGroupRow;
