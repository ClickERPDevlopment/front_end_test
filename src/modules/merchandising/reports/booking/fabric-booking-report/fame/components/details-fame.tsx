import useAppCalculation from "@/hooks/use-app-calculation";
import { FabricBookingReportDto_FabricQtyDetails, FabricBookingReportDto_WastagePercentage } from "../../fabric-booking-type";
import { cn } from "@/lib/utils";

interface props {
    lstFabricQtyDetails?: FabricBookingReportDto_FabricQtyDetails[],
    lstWastagePercentage?: FabricBookingReportDto_WastagePercentage[],
    isPoWise?: boolean,
    totalOrderQty?: number
}
export default function Details_Fame({ lstFabricQtyDetails, lstWastagePercentage, isPoWise, totalOrderQty }: props) {
    const data = lstFabricQtyDetails?.filter(e => e.IS_CONSIDER_AS_RIB_FOR_REPORT != "1");

    const collarCuffData = lstFabricQtyDetails?.filter(e => e.IS_CONSIDER_AS_RIB_FOR_REPORT == "1");
    collarCuffData?.forEach(element => { element.PO = (element.PO ?? 'NA') });

    const calculation = useAppCalculation();

    // console.log('collarCuffData', collarCuffData);
    const uniqueCollarCuff = Array.from(
        new Map(
            collarCuffData
                ?.filter(item => (item?.PO) && item?.ARTSTYLE && item?.PARTS && item?.FABRICATION && item?.YARNCOUNT && item?.GMTCOLOR && item?.FABRICCOLOR && item?.UOM)
                .map(item => [
                    `${(item?.PO)}__${item?.ARTSTYLE}__${item?.PARTS}__${item?.FABRICATION}__${item?.YARNCOUNT}__${item?.GMTCOLOR}__${item?.FABRICCOLOR}__${item?.UOM}`, // composite key
                    {
                        PO: item?.PO,
                        ARTSTYLE: item?.ARTSTYLE,
                        PARTS: item?.PARTS,
                        FABRICATION: item?.FABRICATION,
                        YARNCOUNT: item?.YARNCOUNT,
                        GMTCOLOR: item?.GMTCOLOR,
                        FABRICCOLOR: item?.FABRICCOLOR,
                        UOM: item?.UOM,
                    }
                ])
        ).values()
    );

    const uniqueColors_RegularData = [...new Set(data?.map(item => item.GMTCOLOR))];

    function getTotalFabricQty() {
        let qty = 0;
        try {
            lstFabricQtyDetails?.forEach(element => {
                qty += Number(element.TOTALFINISHFABRICS);
            });
        } catch (error) {
            console.log(error)
        }
        return qty.toFixed(2);
    }

    function getTotalYarnQty(): number {
        let qty = 0;
        try {
            lstFabricQtyDetails?.forEach(element => {
                qty += Number(element.TOTALYARN);
            });
        } catch (error) {
            console.log(error)
        }
        return qty;
    }

    function getCollarCuffQty(
        item: {
            PO: string | undefined;
            ARTSTYLE: string | undefined;
            PARTS: string | undefined;
            FABRICATION: string | undefined;
            YARNCOUNT: string | undefined;
            GMTCOLOR: string | undefined;
            FABRICCOLOR: string | undefined;
            UOM: string | undefined;
        },
        fieldName: keyof FabricBookingReportDto_FabricQtyDetails) {

        let qty = 0;
        try {
            collarCuffData?.
                filter(f =>
                    f.PO === item.PO &&
                    f.ARTSTYLE === item.ARTSTYLE &&
                    f.PARTS === item.PARTS &&
                    f.FABRICATION === item.FABRICATION &&
                    f.YARNCOUNT === item.YARNCOUNT &&
                    f.GMTCOLOR === item.GMTCOLOR &&
                    f.FABRICCOLOR === item.FABRICCOLOR &&
                    f.UOM === item.UOM
                )?.
                forEach(element => {
                    qty += Number(element[fieldName]);
                    // console.log("d-", element[fieldName]);
                });
        } catch (error) {
            console.log(error)
        }
        return qty.toFixed(2);
    }

    function getAvgQty(
        item: {
            PO: string | undefined;
            ARTSTYLE: string | undefined;
            PARTS: string | undefined;
            FABRICATION: string | undefined;
            YARNCOUNT: string | undefined;
            GMTCOLOR: string | undefined;
            FABRICCOLOR: string | undefined;
            UOM: string | undefined;
        },
        fieldName: keyof FabricBookingReportDto_FabricQtyDetails
    ) {
        let totalQty = 0;
        let count = 0;

        try {
            collarCuffData?.filter(f =>
                f.PO === item.PO &&
                f.ARTSTYLE === item.ARTSTYLE &&
                f.PARTS === item.PARTS &&
                f.FABRICATION === item.FABRICATION &&
                f.YARNCOUNT === item.YARNCOUNT &&
                f.GMTCOLOR === item.GMTCOLOR &&
                f.FABRICCOLOR === item.FABRICCOLOR &&
                f.UOM === item.UOM
            )?.forEach(element => {
                const value = Number(element[fieldName]);
                if (!isNaN(value)) {
                    totalQty += value;
                    count++;
                    // console.log("Matched value:", value);
                }
            });
        } catch (error) {
            console.log("Error calculating average quantity:", error);
        }

        const avg = count > 0 ? totalQty / count : 0;
        return avg.toFixed(2);
    }


    function getAvgWastagePercentage(
        item: {
            PO: string | undefined;
            ARTSTYLE: string | undefined;
            PARTS: string | undefined;
            FABRICATION: string | undefined;
            YARNCOUNT: string | undefined;
            GMTCOLOR: string | undefined;
            FABRICCOLOR: string | undefined;
            UOM: string | undefined;
        },
        fieldName: keyof FabricBookingReportDto_WastagePercentage
    ) {
        try {
            const wastage = lstWastagePercentage?.filter(_ =>
                _.FABRIC == item.FABRICATION &&
                _.GMT_PART == item.PARTS &&
                _.GMT_COLOR == item.GMTCOLOR &&
                _.FABRIC_COLOR == item.FABRICCOLOR
            );

            return calculation.CalculateAverage((wastage ?? [] as FabricBookingReportDto_WastagePercentage[]), fieldName);

        } catch (error) {
            console.log("Error calculating average quantity:", error);
        }
    }

    const Row = ({ ele }: { ele: FabricBookingReportDto_FabricQtyDetails }) => {
        return (
            <tr style={{ pageBreakInside: "avoid" }}>
                <td className={cn('border border-gray-600 text-sm text-center', isPoWise ? '' : 'hidden')}>
                    <p>{ele.PO}</p>
                </td>
                <td className='border border-gray-600 text-sm text-center'>{ele.ARTSTYLE}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.PARTS}</td>
                <td className='border border-gray-600 text-sm text-center min-w-[15%]'>{ele.FABRICATION}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.YARNCOUNT}</td>
                <td className='border border-gray-600 text-sm text-center min-w-[110px]'>{ele.GMTCOLOR}</td>
                <td className='border border-gray-600 text-sm text-center min-w-[110px]'>{ele.FABRICCOLOR}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.COLORCODE}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.LABREFLD}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.GMT_SIZE}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.FINISHDIA}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.GSM}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.FABRICFORM}</td>
                <td className='border border-gray-600 text-sm text-center'>
                    {
                        lstWastagePercentage?.filter(_ =>
                            _.FABRIC == ele.FABRICATION &&
                            _.GMT_PART == ele.PARTS &&
                            _.GMT_COLOR == ele.GMTCOLOR &&
                            _.FABRIC_COLOR == ele.FABRICCOLOR
                        )[0]?.FABRIC_WASTAGE_PERCENTAGE_BUGET
                    }
                </td>
                <td className='border border-gray-600 text-sm text-center'>
                    {
                        lstWastagePercentage?.filter(_ =>
                            _.FABRIC == ele.FABRICATION &&
                            _.GMT_PART == ele.PARTS &&
                            _.GMT_COLOR == ele.GMTCOLOR &&
                            _.FABRIC_COLOR == ele.FABRICCOLOR
                        )[0]?.GMT_WASTAGE_PERCENTAGE_BUDGET
                    }
                </td>
                <td className='border border-gray-600 text-sm text-center'>{ele.FACTORY_TOTAL_GREY_BOOKING_CON_PERPCS_GMT}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.TOTALFINISHCONJDZN}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.TOTALFINISHFABRICS}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.TOTALYARN}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.SAMPLEFABRICQTY}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.UOM}</td>
                <td className='border border-gray-600 text-sm text-center'>{ele.REMARKS}</td>
            </tr>
        )

    }

    const RowWiseSum = ({ ele }: { ele: FabricBookingReportDto_FabricQtyDetails[] | undefined }) => {
        return (
            <tr className="font-bold bg-emerald-100">
                <td className='border border-gray-600 text-sm text-center font-bold' colSpan={isPoWise ? 17 : 16}>Sub-Total</td>
                <td className='border border-gray-600 text-sm text-center'>
                    {
                        ele?.reduce((p, c) => p + Number(c.TOTALFINISHFABRICS), 0).toFixed(2)
                    }
                </td>
                <td className='border border-gray-600 text-sm text-center'>
                    {
                        ele?.reduce((p, c) => p + Number(c.TOTALYARN), 0).toFixed(2)
                    }
                </td>
                <td className='border border-gray-600 text-sm text-center'>
                    {
                        ele?.reduce((p, c) => p + Number(c.SAMPLEFABRICQTY), 0).toFixed(2)
                    }
                </td>
                <td className='border border-gray-600 text-sm text-center' colSpan={2}></td>
            </tr>
        )
    }

    return (
        <div className='mt-10'>
            {/* {JSON.stringify(uniqueCollarCuff)} */}
            {/* {JSON.stringify(collarCuffData)} */}
            <table>
                <thead>
                    <tr>
                        <th className={cn('p-1 border border-gray-600 text-sm text-center', isPoWise ? '' : 'hidden')}>PO</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Art./Style</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Parts</th>
                        <th className='p-1 border border-gray-600 text-sm text-center min-w-[150px]'>Fabrication</th>
                        <th className='p-1 border border-gray-600 text-sm text-center min-w-[150px]'>Yarn count</th>
                        <th className='p-1 border border-gray-600 text-sm text-center min-w-[110px]'>GMT Color</th>
                        <th className='p-1 border border-gray-600 text-sm text-center min-w-[110px]'>FABRIC Color</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Color Code</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Lab Ref.LD</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Size</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>FINISH DIA</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>GSM</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Fabric Form</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Fabric W%</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Gmt W%</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Total Grey Conj./dz</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Total Finish Conj./dz</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Total Finish Fabrics</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Total Yarn</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Sample fabric qty</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>UOM</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueColors_RegularData?.map((color, index) => {
                        return (
                            <>
                                {data?.filter(ele => ele.GMTCOLOR === color)?.map((ele, i) =>
                                    <Row ele={ele} key={index + i} />
                                )}
                                <RowWiseSum key={index} ele={data?.filter(ele => ele.GMTCOLOR === color)} />
                            </>
                        )
                    })}
                    {uniqueCollarCuff?.map((ele, i) =>
                        <tr key={i} style={{ pageBreakInside: "avoid" }}>

                            <td className={cn('border border-gray-600 text-sm text-center', isPoWise ? '' : 'hidden')}>
                                <p>{ele.PO}</p>
                            </td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.ARTSTYLE}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.PARTS}</td>
                            <td className='border border-gray-600 text-sm text-center min-w-[15%]'>{ele.FABRICATION}</td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.YARNCOUNT}</td>
                            <td className='border border-gray-600 text-sm text-center min-w-[110px]'>{ele.GMTCOLOR}</td>
                            <td className='border border-gray-600 text-sm text-center min-w-[110px]'>{ele.FABRICCOLOR}</td>
                            <td className='border border-gray-600 text-sm text-center'></td>
                            <td className='border border-gray-600 text-sm text-center'></td>
                            <td className='border border-gray-600 text-sm text-center'></td>
                            <td className='border border-gray-600 text-sm text-center'></td>
                            <td className='border border-gray-600 text-sm text-center'></td>
                            <td className='border border-gray-600 text-sm text-center'></td>
                            <td className='border border-gray-600 text-sm text-center'>{getAvgWastagePercentage(ele, "FABRIC_WASTAGE_PERCENTAGE_BUGET")}</td>
                            <td className='border border-gray-600 text-sm text-center'>{getAvgWastagePercentage(ele, "GMT_WASTAGE_PERCENTAGE_BUDGET")}</td>
                            <td className='border border-gray-600 text-sm text-center'>{getAvgQty(ele, "FACTORY_TOTAL_GREY_BOOKING_CON_PERPCS_GMT")}</td>
                            <td className='border border-gray-600 text-sm text-center'>{getAvgQty(ele, "TOTALFINISHCONJDZN")}</td>
                            <td className='border border-gray-600 text-sm text-center'>{getCollarCuffQty(ele, "TOTALFINISHFABRICS")}</td>
                            <td className='border border-gray-600 text-sm text-center'>{getCollarCuffQty(ele, "TOTALYARN")}</td>
                            <td className='border border-gray-600 text-sm text-center'></td>
                            <td className='border border-gray-600 text-sm text-center'>{ele.UOM}</td>
                            <td className='border border-gray-600 text-sm text-center'></td>
                        </tr>
                    )}
                    <tr className="bg-emerald-300" style={{ pageBreakInside: "avoid" }}>
                        <th className='p-1 border border-gray-600 text-sm text-center' colSpan={isPoWise ? 17 : 16}>Total</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>{getTotalFabricQty()}</th>
                        <th className='p-1 border border-gray-600 text-sm text-center'>{getTotalYarnQty().toFixed(2)}</th>
                        <th className='p-1 border border-gray-600 text-sm text-center' colSpan={3}></th>
                    </tr>
                    <tr className="bg-white" style={{ pageBreakInside: "avoid" }}>
                        <th className='p-1 border border-gray-600 text-sm text-center' colSpan={isPoWise ? 22 : 21}>
                            <p className="hidden">(Total yarn *12 / Order Qty)</p>
                            Net grey Consumption= {totalOrderQty && ((getTotalYarnQty() * 12) / totalOrderQty).toFixed(2)} kg/dz
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
