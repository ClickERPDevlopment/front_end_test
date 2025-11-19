import React from "react";
import { FloorData, LineData, ProductionData } from "../pages/report/types";
import { array, map } from "zod";
import Tooltip from '@/components/data-display/Tooltip';
import DynamicTooltipText from "@/components/data-display/DynamicTooltipText";

interface Props {
    data: ProductionData;
}

const cellStyle: React.CSSProperties = {
    border: "1px solid #000000",
    padding: "2px 0 2px 0",
    textAlign: "center",
};

const ProductionReport: React.FC<Props> = ({ data }) => {
    const meta = data.meta;
    const maxHour = data.floors.length > 0 ? Object.entries(data.floors[0].lines[0].hourlyProduction).length : 0;

    let firstLineIdx = 0;

    // Totals to track grand totals
    const grandTotals = {
        required: { op: 0, hp: 0, im: 0 },
        present: { op: 0, hp: 0, im: 0 },
        totalTarget: 0,
        totalAchieved: 0,
        difference: 0,
        efficiency: 0,
        efficiencyCount: 0,
        produceMin: 0,
        availMin: 0,
        efficiencySum: 0,
        floorCount: 0,
        hourly: {} as { [key: string]: number }
    };



    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Row 1: Meta Info + Summary */}
            <div className="flex justify-between ">
                {/* Left Meta Table */}
                <table className="border border-gray-300 min-w-[250px] border-collapse mb-5">
                    <tbody>
                        <tr>
                            <td style={cellStyle}>Date</td>
                            <td style={cellStyle}>{meta.date}</td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>Total Manpower</td>
                            <td style={cellStyle}>{meta.totalManpower}</td>
                        </tr>
                        <tr>
                            <td style={cellStyle}>Avg. Work Hour</td>
                            <td style={cellStyle}>{meta.averageWorkingHour}</td>
                        </tr>
                    </tbody>
                </table>
                {/* Right: Summary */}
                <table className="border border-gray-300 min-w-[300px] text-center border-collapse mb-5">
                    <thead>
                        <tr>
                            <th style={cellStyle}>Time</th>
                            {Object.keys(meta.totalAchieved).map((key) => (
                                <th style={cellStyle} key={key}>
                                    {key.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={cellStyle}>Total Target</td>
                            {Object.keys(meta.totalTarget).map((key) => (
                                <td style={cellStyle} key={key}>
                                    {meta.totalTarget[key as keyof typeof meta.totalTarget]}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td style={cellStyle}>Total Achieved</td>
                            {Object.keys(meta.totalAchieved).map((key) => (
                                <td style={cellStyle} key={key}>
                                    {meta.totalAchieved[key as keyof typeof meta.totalAchieved]}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td style={cellStyle}>Difference</td>
                            {Object.keys(meta.difference).map((key) => (
                                <td style={cellStyle} key={key}>
                                    {meta.difference[key as keyof typeof meta.difference]}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Row 2: Floor-wise Production Tables */}
            <div>
                <table className="w-full border border-gray-300 border-collapse">
                    <thead>
                        <tr className="bg-orange-200 font-bold">
                            <th style={{ ...cellStyle, width: "20px" }} rowSpan={2}>Line</th>
                            <th style={{ ...cellStyle, width: "50px" }} rowSpan={2}>Buyer</th>
                            <th style={{ ...cellStyle, width: "70px" }} rowSpan={2}>Style</th>
                            <th style={{ ...cellStyle, width: "70px" }} rowSpan={2}>PO</th>
                            <th style={{ ...cellStyle, width: "70px" }} rowSpan={2}>Item Type</th>
                            <th style={{ ...cellStyle, width: "70px" }} rowSpan={2}>Style Name</th>
                            <th style={{ ...cellStyle, width: "48px" }} rowSpan={2}>Start Day</th>
                            <th style={{ ...cellStyle, width: "48px" }} rowSpan={2}>Running Day</th>
                            <th style={cellStyle} colSpan={4}>Required Manpower</th>
                            <th style={cellStyle} colSpan={4}>Present Manpower</th>
                            <th style={cellStyle} colSpan={3}>Target</th>
                            <th style={{ ...cellStyle, width: "48px" }} rowSpan={2}>Actual Hours</th>
                            <th style={cellStyle} colSpan={maxHour > 5 ? maxHour + 1 : maxHour}>Hourly Production</th>
                            <th style={{ ...cellStyle, width: "30px" }} rowSpan={2}>TTL TGT</th>
                            <th style={{ ...cellStyle, width: "37px" }} rowSpan={2}>Total Achivd</th>
                            <th style={{ ...cellStyle, width: "37px" }} rowSpan={2}>Diff</th>
                            <th style={{ ...cellStyle, width: "37px" }} rowSpan={2}>Effi (%)</th>
                            <th style={{ ...cellStyle, width: "37px" }} rowSpan={2}>Comt.</th>
                        </tr>
                        <tr className="bg-orange-200 font-bold">

                            {/* Required Manpower */}
                            <th style={{ ...cellStyle, width: "20px" }}>OP</th>
                            <th style={{ ...cellStyle, width: "20px" }}>HP</th>
                            <th style={{ ...cellStyle, width: "20px" }}>IM</th>
                            <th style={{ ...cellStyle, width: "20px" }}>Total</th>

                            {/* Present Manpower */}
                            <th style={{ ...cellStyle, width: "20px" }}>OP</th>
                            <th style={{ ...cellStyle, width: "20px" }}>HP</th>
                            <th style={{ ...cellStyle, width: "20px" }}>IM</th>
                            <th style={{ ...cellStyle, width: "20px" }}>Total</th>

                            {/* Target */}
                            <th style={{ ...cellStyle, width: "25px" }}>TGT/ Hour</th>
                            <th style={{ ...cellStyle, width: "25px" }}>Total TGT</th>
                            <th style={{ ...cellStyle, width: "25px" }}>TGT Effi</th>

                            {/* Hourly Production columns */}
                            {Array.from({ length: maxHour }, (_, i) => (
                                i === 5 ?
                                    <>
                                        <td style={{ ...cellStyle, width: "20px" }} key={i + 1} rowSpan={length}>

                                        </td>
                                        <td style={{ ...cellStyle, width: "20px" }} key={i + 1}>
                                            {i + 1}
                                        </td>
                                    </> :
                                    <td style={{ ...cellStyle, width: "20px" }} key={i + 1}>
                                        {i + 1}
                                    </td>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.floors.map((floor: FloorData, parentIdx: number) => (
                            <>
                                {floor.lines // inside each floor
                                    && (() => {
                                        // Group lines by line name ONLY for this floor
                                        const linesByLineName: { [lineName: string]: LineData[] } = {};
                                        const linesOddEvenMap: { [lineName: string]: number } = {};
                                        let counter = 0;
                                        floor.lines.forEach((line) => {
                                            if (!linesByLineName[line.line]) {
                                                linesByLineName[line.line] = [];
                                            }
                                            linesByLineName[line.line].push(line);
                                            if (!linesOddEvenMap[line.line]) {
                                                linesOddEvenMap[line.line] = counter;
                                                counter++;
                                            }
                                        });

                                        return Object.entries(linesByLineName).map(([lineName, lines]) =>
                                            lines.map((line, idx) => {

                                                firstLineIdx++;

                                                const reqManpowerTotal = (line.requiredManPower.op ?? 0) + (line.requiredManPower.hp ?? 0) + (line.requiredManPower.im ?? 0);
                                                const presManpowerTotal = (line.presentManPower.op ?? 0) + (line.presentManPower.hp ?? 0) + (line.presentManPower.im ?? 0);

                                                return (
                                                    <tr key={lineName + "-" + idx} style={{ backgroundColor: linesOddEvenMap[line.line] % 2 === 0 ? "aliceblue" : "#d6f7ff" }}>
                                                        {/* Render 'line' cell only once with rowSpan */}
                                                        {idx === 0 && (
                                                            <td style={cellStyle} rowSpan={lines.length}>
                                                                {lineName}
                                                            </td>
                                                        )}
                                                        <td style={cellStyle}>{line.buyer}</td>
                                                        <td style={cellStyle}>
                                                            <DynamicTooltipText text={line.style} maxLength={10} />
                                                        </td>
                                                        <td style={cellStyle}>
                                                            <DynamicTooltipText text={line.po} maxLength={7} />
                                                        </td>
                                                        <td style={cellStyle}>
                                                            <DynamicTooltipText text={line.itemType} maxLength={5} />
                                                        </td>
                                                        <td style={cellStyle}>
                                                            <DynamicTooltipText text={line.styleName} maxLength={8} />
                                                        </td>
                                                        <td style={cellStyle}>{line.startDay}</td>
                                                        <td style={cellStyle}>{line.runningDay}</td>

                                                        <td style={cellStyle}>{line.requiredManPower.op === 0 ? '-' : line.requiredManPower.op}</td>
                                                        <td style={cellStyle}>{line.requiredManPower.hp === 0 ? '-' : line.requiredManPower.hp}</td>
                                                        <td style={cellStyle}>{line.requiredManPower.im === 0 ? '-' : line.requiredManPower.im}</td>

                                                        <td style={cellStyle}>{reqManpowerTotal}</td>
                                                        {idx === 0 && (
                                                            <>
                                                                <td style={cellStyle} rowSpan={lines.length}>{line.presentManPower.op}</td>
                                                                <td style={cellStyle} rowSpan={lines.length}>{line.presentManPower.hp}</td>
                                                                <td style={cellStyle} rowSpan={lines.length}>{line.presentManPower.im}</td>
                                                                <td style={cellStyle} rowSpan={lines.length}>{presManpowerTotal}</td>
                                                            </>
                                                        )}

                                                        <td style={cellStyle}>{line.tgtPerHour === 0 ? '-' : line.tgtPerHour}</td>
                                                        {
                                                            idx === 0 && (
                                                                <td style={cellStyle} rowSpan={lines.length}>{line.totalTarget}</td>
                                                            )
                                                        }

                                                        <td style={cellStyle}>{line.targetEff}</td>
                                                        {idx === 0 && (
                                                            <td style={cellStyle} rowSpan={lines.length}>
                                                                {line.actualHour}
                                                            </td>
                                                        )}

                                                        {Array.from({ length: maxHour }, (_, i) => (
                                                            i === 5 && firstLineIdx === 1 ?
                                                                <>
                                                                    <td key={i + 1} rowSpan={length}>
                                                                        <p className="-rotate-90 text-nowrap">Lunch Break</p>
                                                                    </td >
                                                                    <td style={cellStyle} key={i + 1}>
                                                                        {line.hourlyProduction && line.hourlyProduction[String(i + 1)] > 0
                                                                            ? line.hourlyProduction[String(i + 1)]
                                                                            : ""}
                                                                    </td>
                                                                </> :
                                                                <td style={cellStyle} key={i + 1}>
                                                                    {line.hourlyProduction && line.hourlyProduction[String(i + 1)] > 0
                                                                        ? line.hourlyProduction[String(i + 1)]
                                                                        : ""}
                                                                </td>
                                                        ))}
                                                        {idx === 0 && (
                                                            <>
                                                                <td style={cellStyle} rowSpan={lines.length}>{line.totalTarget}</td>

                                                                <td style={cellStyle} rowSpan={lines.length}>{line.totalAchieve}</td>
                                                                <td style={cellStyle} rowSpan={lines.length} className="text-red-500">{line.difference}</td>
                                                                <td style={cellStyle} rowSpan={lines.length}>{line.efficiency}</td>
                                                                <td style={cellStyle} rowSpan={lines.length}>
                                                                    <button
                                                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                                                                        onClick={() => {
                                                                            alert(`Comments for ${line.line}: ${line.coummentCount}`);
                                                                        }}
                                                                        disabled={line.coummentCount === 0}
                                                                    >
                                                                        {line.coummentCount}
                                                                    </button>
                                                                </td>
                                                            </>
                                                        )}
                                                    </tr >

                                                );
                                            })
                                        );
                                    })()
                                }


                                {(() => {
                                    const uniqueLines = new Map<string, LineData>();
                                    floor.lines.forEach((line) => {
                                        if (!uniqueLines.has(line.line)) {
                                            uniqueLines.set(line.line, line); // take first subline only
                                        }
                                    });

                                    const required = { op: 0, hp: 0, im: 0 };
                                    const present = { op: 0, hp: 0, im: 0 };
                                    let totalTarget = 0;
                                    let totalAchieved = 0;

                                    const hourly: { [key: string]: number } = {};

                                    let floorProduceMin = 0;
                                    let floorAvailMin = 0;

                                    floor.lines.forEach((line) => {
                                        required.op += line.requiredManPower.op ?? 0;
                                        required.hp += line.requiredManPower.hp ?? 0;
                                        required.im += line.requiredManPower.im ?? 0;

                                        totalTarget += Number(line.totalTarget) || 0;
                                        totalAchieved += Number(line.totalAchieve) || 0;

                                        floorProduceMin += line.produceMin ?? 0;
                                        floorAvailMin += line.availMin ?? 0;

                                        Object.entries(line.hourlyProduction || {}).forEach(([h, val]) => {
                                            hourly[h] = (hourly[h] || 0) + Number(val || 0);
                                        });
                                    });

                                    uniqueLines.forEach((line) => {
                                        // required.op += line.requiredManPower.op ?? 0;
                                        // required.hp += line.requiredManPower.hp ?? 0;
                                        // required.im += line.requiredManPower.im ?? 0;

                                        present.op += line.presentManPower.op ?? 0;
                                        present.hp += line.presentManPower.hp ?? 0;
                                        present.im += line.presentManPower.im ?? 0;

                                        totalTarget += Number(line.totalTarget) || 0;
                                        totalAchieved += Number(line.totalAchieve) || 0;

                                        floorProduceMin += line.produceMin ?? 0;
                                        floorAvailMin += line.availMin ?? 0;

                                        grandTotals.produceMin += floorProduceMin;
                                        grandTotals.availMin += floorAvailMin;
                                        grandTotals.floorCount += 1;

                                    });
                                    const floorEfficiency = floorAvailMin > 0 ? Number(((floorProduceMin / floorAvailMin) * 100).toFixed(2)) : 0;

                                    const difference = totalAchieved - totalTarget;

                                    grandTotals.efficiency = Number((grandTotals.produceMin / grandTotals.availMin * 100).toFixed(2));

                                    // Update grand totals
                                    grandTotals.required.op += required.op;
                                    grandTotals.required.hp += required.hp;
                                    grandTotals.required.im += required.im;

                                    grandTotals.present.op += present.op;
                                    grandTotals.present.hp += present.hp;
                                    grandTotals.present.im += present.im;

                                    grandTotals.totalTarget += totalTarget;
                                    grandTotals.totalAchieved += totalAchieved;
                                    grandTotals.difference = grandTotals.totalAchieved - grandTotals.totalTarget;

                                    Object.entries(hourly).forEach(([h, val]) => {
                                        grandTotals.hourly[h] = (grandTotals.hourly[h] || 0) + val;
                                    });

                                    const totalReq = required.op + required.hp + required.im;
                                    const totalPres = present.op + present.hp + present.im;


                                    return (
                                        <tr style={{ backgroundColor: "#ff973e" }} className="font-bold">
                                            <td colSpan={8} style={cellStyle}><strong>{floor.floorName + " Total"}</strong></td>

                                            {/* Required */}
                                            <td style={cellStyle}><strong>{required.op}</strong></td>
                                            <td style={cellStyle}><strong>{required.hp}</strong></td>
                                            <td style={cellStyle}><strong>{required.im}</strong></td>
                                            <td style={cellStyle}><strong>{totalReq}</strong></td>

                                            {/* Present */}
                                            <td style={cellStyle}><strong>{present.op}</strong></td>
                                            <td style={cellStyle}><strong>{present.hp}</strong></td>
                                            <td style={cellStyle}><strong>{present.im}</strong></td>
                                            <td style={cellStyle}><strong>{totalPres}</strong></td>

                                            <td style={cellStyle}></td>
                                            <td style={cellStyle}><strong>{totalTarget}</strong></td>
                                            <td style={cellStyle}></td>

                                            <td style={cellStyle}></td>

                                            {Array.from({ length: maxHour }, (_, i) => (
                                                <td style={cellStyle} key={i}>
                                                    <strong>{hourly[String(i + 1)] ?? 0}</strong>
                                                </td>
                                            ))}

                                            <td style={cellStyle}><strong>{totalTarget}</strong></td>
                                            <td style={cellStyle}><strong>{totalAchieved}</strong></td>
                                            <td style={cellStyle} className="text-red-500"><strong>{difference}</strong></td>
                                            <td style={cellStyle}><Tooltip content={`${floorEfficiency}%`} dotted> <strong>{`${floorEfficiency}%`}</strong></Tooltip></td>
                                            <td style={cellStyle}></td>
                                        </tr>
                                    );
                                })()}

                            </>
                        ))}

                        <tr style={{ backgroundColor: "#f9ca4f" }} className="font-bold">
                            <td colSpan={8} style={cellStyle}><strong>Grand Total</strong></td>

                            {/* Required */}
                            <td style={cellStyle}><strong>{grandTotals.required.op}</strong></td>
                            <td style={cellStyle}><strong>{grandTotals.required.hp}</strong></td>
                            <td style={cellStyle}><strong>{grandTotals.required.im}</strong></td>
                            <td style={cellStyle}><strong>{grandTotals.required.op + grandTotals.required.hp + grandTotals.required.im}</strong></td>

                            {/* Present */}
                            <td style={cellStyle}><strong>{grandTotals.present.op}</strong></td>
                            <td style={cellStyle}><strong>{grandTotals.present.hp}</strong></td>
                            <td style={cellStyle}><strong>{grandTotals.present.im}</strong></td>
                            <td style={cellStyle}><strong>{grandTotals.present.op + grandTotals.present.hp + grandTotals.present.im}</strong></td>

                            <td style={cellStyle}></td>
                            <td style={cellStyle}><strong>{grandTotals.totalTarget}</strong></td>
                            <td style={cellStyle}></td>

                            <td style={cellStyle}></td>

                            {Array.from({ length: maxHour }, (_, i) => (
                                <td style={cellStyle} key={i}>
                                    <strong>{grandTotals.hourly[String(i + 1)] ?? 0}</strong>
                                </td>
                            ))}

                            <td style={cellStyle}><strong>{grandTotals.totalTarget}</strong></td>
                            <td style={cellStyle}><strong>{grandTotals.totalAchieved}</strong></td>
                            <td style={cellStyle} className="text-red-500"><strong>{grandTotals.difference}</strong></td>
                            <td style={cellStyle}><strong>{`${grandTotals.efficiency}%`}</strong>
                            </td>

                            <td style={cellStyle}></td>
                        </tr>

                    </tbody>

                </table>

            </div>
        </div >
    );
};

export default ProductionReport;
