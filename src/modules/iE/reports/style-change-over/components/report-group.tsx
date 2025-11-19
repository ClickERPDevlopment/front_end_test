/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStyleChangeOver } from "../style-change-over-type";
import ReportRow from "./report-row";

function ReportGroup({ data, indexOffset }: { data: IStyleChangeOver[], indexOffset: number }) {
    const uniqueKeys: Set<string> = new Set();

    function groupBy(data: IStyleChangeOver[], keys: string[]) {
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

    interface GroupedByEntryDate {
        [key: string]: {
            items: IStyleChangeOver[];
        };
    }

    let groupedByEntryDate: GroupedByEntryDate = {};

    if (data) {
        groupedByEntryDate = groupBy(data, ["ENTRY_DATE"]);
    }

    const uniqueKeysArray: string[] = Array.from(uniqueKeys);

    const totalTgtTptMin = data.reduce((sum, item) => sum + ((Number(item.OPERATOR) + Number(item.HP)) * Number(item.SMV) || 0), 0);


    const convertToMinutes = (timeStr: string): number => {
        if (!timeStr) return 0;
        if (/^\d+$/.test(timeStr.trim())) {
            return Number(timeStr);
        }

        const match = timeStr.match(/^\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*$/i);

        if (!match) return 0;

        const hours = match[1] ? parseInt(match[1], 10) : 0;
        const minutes = match[2] ? parseInt(match[2], 10) : 0;

        return hours * 60 + minutes;
    };


    const totalTptMin = data.reduce((sum, item) => {
        const totalTime = isNaN(Number(item.TOTAL_TIME))
            ? convertToMinutes(item.TOTAL_TIME)
            : Number(item.TOTAL_TIME);

        return sum + (totalTime || 0);
    }, 0);


    const totalExcessTime = data.reduce((sum, item) => {
        const operator = Number(item.OPERATOR) || 0;
        const hp = Number(item.HP) || 0;
        const smv = Number(item.SMV) || 0;

        const totalTime = isNaN(Number(item.TOTAL_TIME))
            ? convertToMinutes(item.TOTAL_TIME)
            : Number(item.TOTAL_TIME);

        const totalSmvTime = (operator + hp) * smv;
        const excessTime = totalTime - totalSmvTime;

        return sum + excessTime;
    }, 0);



    let dataLength = indexOffset;
    return (
        <>
            <tr className="text-start text-sm">
                <td colSpan={21} className="border border-gray-950 p-0.5 font-bold">Floor: {data[0]?.FLOOR_NAME}</td>
            </tr>
            {uniqueKeysArray?.map((key) => {
                let prevLength = dataLength;
                dataLength = dataLength + groupedByEntryDate[key].items.length;
                return <ReportRow
                    key={key}
                    data={groupedByEntryDate[key].items}
                    indexOffset={prevLength}
                ></ReportRow>
            })}
            <tr className="text-start text-sm">
                <td colSpan={13} className="border border-gray-950 p-0.5 font-bold">Total</td>
                <td className="border border-gray-950 p-0.5 font-bold text-center">{Math.round(totalTgtTptMin)}</td>
                <td className="border border-gray-950 p-0.5 font-bold"></td>
                <td className="border border-gray-950 p-0.5 font-bold"></td>
                <td className="border border-gray-950 p-0.5 font-bold text-center">{Math.round(totalTptMin)}</td>
                <td className="border border-gray-950 p-0.5 font-bold text-center">
                    {totalExcessTime >= 0
                        ? `+${Math.round(totalExcessTime)}`
                        : `-${Math.abs(Math.round(totalExcessTime))}`}
                </td>
                <td className="border border-gray-950 p-0.5 font-bold text-center">{Math.round(totalTgtTptMin * 100 / totalTptMin)}%</td>
                <td className="border border-gray-950 p-0.5 font-bold"></td>
                <td className="border border-gray-950 p-0.5 font-bold"></td>
            </tr>
        </>
    )
}

export default ReportGroup;
