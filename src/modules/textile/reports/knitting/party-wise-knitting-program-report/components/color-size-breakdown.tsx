import { IPartyWiseKnittingProgram } from "../party-wise-knitting-program-report-type"

function ColorSizeBreakdown({ data, fabricPart }: { data: IPartyWiseKnittingProgram[], fabricPart: string }
) {

    const uniqueKeys: Set<string> = new Set();

    function groupBy(data: IPartyWiseKnittingProgram[], keys: string[]) {
        return data.reduce((result: any, item: any) => {
            const key = keys.map((k) => item[k]).join("_");
            uniqueKeys.add(key);

            if (!result[key]) {
                result[key] = {
                    COLORNAME: item.COLORNAME,
                    SIZE_DIA_QTY_KG: {},
                    SIZE_DIA_PCS_KG: {},
                };
            }

            const sizeDiaKey = `${item.SIZENAME}::${item.FINISH_DIA}`;
            result[key].SIZE_DIA_QTY_KG[sizeDiaKey] = item.DTLS_QTY;
            result[key].SIZE_DIA_PCS_KG[sizeDiaKey] = item.DTLS_PICES;

            return result;
        }, {});
    }

    interface GroupedData {
        [key: string]: {
            COLORNAME: string;
            SIZE_DIA_QTY_KG: { [sizeDiaKey: string]: number };
            SIZE_DIA_PCS_KG: { [sizeDiaKey: string]: number };
        };
    }

    let groupedData: GroupedData = {};

    if (data) {
        groupedData = groupBy(data, [
            "COLORNAME",
        ]);
    }

    const uniqueKeysArray: string[] = Array.from(uniqueKeys);

    const uniqueSizeDiaSet: Set<string> = new Set();

    data.forEach((item) => {
        if (item.SIZENAME && item.FINISH_DIA != null) {
            uniqueSizeDiaSet.add(`${item.SIZENAME}::${item.FINISH_DIA}`);
        }
    });

    const uniqueSizeDiaPairs = Array.from(uniqueSizeDiaSet).map((key) => {
        const [SIZENAME, FINISH_DIA] = key.split("::");
        return { SIZENAME, FINISH_DIA };
    });

    let header = ["COLORNAME", ...uniqueSizeDiaPairs.map((p, idx) => <span key={idx}>
        <span className="block border-b border-gray-950 w-full text-center">{p.SIZENAME}</span>
        {p.FINISH_DIA}
    </span>), "Total Pcs", "Total Yarn(Kg)"];

    const columnWiseTotals: { [key: string]: number } = {};
    const columnWiseKgTotals: { [key: string]: number } = {};

    return (
        <div className="mt-5">
            <p className="font-bold">{fabricPart} - Color Size Breakdown in Pcs</p>
            <table className="border-collapse border border-gray-300  w-[100%]">
                <thead className="print:bg-transparent">
                    <tr style={{ fontSize: "11px" }} className="bg-indigo-200 text-center">
                        {header?.map((item) =>
                            <th className="border border-gray-950 p-0">{item}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {uniqueKeysArray.map((key) => {
                        const group = groupedData[key];
                        let rowTotalKg = 0;
                        let rowTotalPcs = 0;

                        return (
                            <tr key={key} style={{ fontSize: "11px" }}>
                                <td className="border border-gray-950  p-0.5">{group.COLORNAME}</td>

                                {uniqueSizeDiaPairs.map(({ SIZENAME, FINISH_DIA }) => {
                                    const sizeDiaKey = `${SIZENAME}::${FINISH_DIA}`;
                                    const pcs = group.SIZE_DIA_PCS_KG?.[sizeDiaKey] ?? 0;
                                    const kg = group.SIZE_DIA_QTY_KG?.[sizeDiaKey] ?? 0;
                                    rowTotalKg += kg;
                                    rowTotalPcs += pcs;

                                    if (!columnWiseTotals[sizeDiaKey]) {
                                        columnWiseTotals[sizeDiaKey] = 0;
                                    }
                                    columnWiseTotals[sizeDiaKey] += pcs;

                                    if (!columnWiseKgTotals[sizeDiaKey]) {
                                        columnWiseKgTotals[sizeDiaKey] = 0;
                                    }
                                    columnWiseKgTotals[sizeDiaKey] += kg;

                                    return (
                                        <td
                                            key={sizeDiaKey}
                                            className="border border-gray-950 p-0.5 text-center"
                                        >
                                            {pcs}
                                        </td>
                                    );
                                })}

                                <td className="border border-gray-950  p-0.5 font-semibold text-center">
                                    {rowTotalPcs}
                                </td>

                                <td className="border border-gray-950  p-0.5 font-semibold text-center">
                                    {rowTotalKg}
                                </td>
                            </tr>
                        );
                    })}

                    <tr className="font-bold text-sm">
                        <td className="border border-gray-950  p-0.5" colSpan={1}>
                            Total
                        </td>

                        {uniqueSizeDiaPairs.map(({ SIZENAME, FINISH_DIA }) => {
                            const sizeDiaKey = `${SIZENAME}::${FINISH_DIA}`;
                            const colTotal = columnWiseTotals[sizeDiaKey] ?? 0;
                            return (
                                <td
                                    key={sizeDiaKey}
                                    className="border border-gray-950  p-0.5 text-center"
                                >
                                    {colTotal}
                                </td>
                            );
                        })}

                        <td className="border border-gray-950  p-0.5 text-center font-bold">
                            {Object.values(columnWiseTotals).reduce((a, b) => a + b, 0)}
                        </td>

                        <td className="border border-gray-950  p-0.5 text-center font-bold">
                            {Object.values(columnWiseKgTotals).reduce((a, b) => a + b, 0).toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ColorSizeBreakdown