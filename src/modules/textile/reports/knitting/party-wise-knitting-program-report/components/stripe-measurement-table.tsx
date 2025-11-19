import { PartyWiseKnittingProgramStripeMeasurementType } from "../stripe-measurement-type"
import StripeMeasurementTableRow from "./stripe-measurement-table-row";

function StripeMeasurementTable({ data }: { data: PartyWiseKnittingProgramStripeMeasurementType[] }) {


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
        groupedData = groupBy(data, ["GMT_PARTS"]);
    }

    const uniqueKeysArray: string[] = Array.from(uniqueKeys);

    const header = [
        "GMT Parts",
        "GMT Color",
        "Yarn Color",
        "Feeder",
        "Stripe Measurement",
        "Unit"
    ]

    const totalFeeder = data.reduce((acc, item) => acc + item.FEEDER, 0)
    const totalStripeMeasure = data.reduce((acc, item) => acc + item.STRIPE_MEASUREMENT, 0)

    return (
        <>
            <table className="border-collapse border border-gray-300  w-[100%] mt-3">
                <thead className="print:bg-transparent">
                    <tr style={{ fontSize: "11px" }} className="bg-indigo-200 text-center">
                        {header?.map((item) =>
                            <th className="border border-gray-950 p-0.5">{item}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {uniqueKeysArray?.map((key) => (
                        <StripeMeasurementTableRow
                            key={key}
                            data={groupedData[key]?.items}
                        ></StripeMeasurementTableRow>
                    ))}

                    <tr style={{ fontSize: "11px" }} className="font-bold">
                        <td colSpan={3} className="border border-gray-950 p-0.5">Total</td>
                        <td className="border border-gray-950 p-0.5">{totalFeeder.toFixed(2)}</td>
                        <td className="border border-gray-950 p-0.5">{totalStripeMeasure.toFixed(2)}</td>
                        <td className="border border-gray-950 p-0.5">{ }</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default StripeMeasurementTable