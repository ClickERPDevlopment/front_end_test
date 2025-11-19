/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateWiseFabricPurchaseReceiveRegisterReportType } from "../date-wise-fabric-purchase-receive-register-report-type";
import ReportTable from "./report-table";

function UomWiseSummary({
    data,
}: {
    data: DateWiseFabricPurchaseReceiveRegisterReportType[];
}) {



    const uniqueKeys: Set<string> = new Set();

    function groupBy(
        data: DateWiseFabricPurchaseReceiveRegisterReportType[],
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
            items: DateWiseFabricPurchaseReceiveRegisterReportType[];
        };
    }

    let groupedByDate: GroupedByDate = {};

    if (data) {
        groupedByDate = groupBy(data, ["UOM"]);
    }

    const uniqueKeysArray: string[] = Array.from(uniqueKeys);


    // set table header
    const firstHeader = [
        "MOU",
        "QTY.",
        "VALUE",
    ];


    const challanQty = data?.reduce(
        (acc, item) => acc + Number(item.QUANTITY),
        0);


    const value = data?.reduce(
        (acc, item) => acc + (Number(item.QUANTITY) * Number(item.RATE)),
        0);


    return (


        <table className="border-collapse border border-gray-300  w-[100%] mt-3">
            <thead className="print:static">
                <tr style={{ fontSize: "12px" }} className="bg-indigo-200 text-center">
                    {firstHeader?.map((item) =>
                        <th className="border border-gray-950 p-0.5">{item}</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {uniqueKeysArray?.map((key) => (
                    <ReportTable
                        key={key}
                        data={groupedByDate[key].items}
                    ></ReportTable>
                ))}

                <tr style={{ fontSize: "12px" }} className="font-bold bg-lime-100">
                    <td className="border border-gray-950 p-0.5">Total</td>
                    <td className="border border-gray-950 p-0.5">{challanQty.toFixed(2)}</td>
                    <td className="border border-gray-950 p-0.5">{value.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>

    );
}

export default UomWiseSummary;
