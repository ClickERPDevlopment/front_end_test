import { FabricBookingReportDto_FabricQtyDetails, FabricBookingReportDto_Size } from '../fabric-booking-type'

export default function CollarCuffSummary({ lstFabricQtyDetails, lstSize }: { lstFabricQtyDetails?: FabricBookingReportDto_FabricQtyDetails[], lstSize?: FabricBookingReportDto_Size[] }) {
    const data = lstFabricQtyDetails?.filter(e => e.IS_CONSIDER_AS_RIB_FOR_REPORT == "1");

    const uniqueFabricCombos = Array.from(
        new Map(
            data?.filter(item => item.FABRICATION && item.PARTS)
                .map(item => [
                    `${item.FABRICATION}__${item.PARTS}`, // composite key
                    { FABRICATION: item.FABRICATION, PARTS: item.PARTS }
                ])
        ).values()
    );

    function getUniqueSizeCombosByFabricNPart(fabric?: string, part?: string) {
        let uniqueSizeCombos = Array.from(
            new Map(
                data?.filter(item => item.FABRICATION == fabric && item.PARTS == part)
                    .map(item => [
                        `${item.GMT_SIZE}__${item.FINISHDIA}`, // composite key
                        { GMT_SIZE: item?.GMT_SIZE, FINISHDIA: item?.FINISHDIA, SORTING_NO: 0 }
                    ])
            ).values()
        );

        uniqueSizeCombos?.forEach(element => {
            element.SORTING_NO = lstSize?.filter(s => s?.SIZENAME == element?.GMT_SIZE)[0]?.SORTINGNO ?? 0;
        });

        uniqueSizeCombos = uniqueSizeCombos?.sort((a, b) => a.SORTING_NO - b.SORTING_NO);

        return uniqueSizeCombos;
    }

    function getUniqueGmtAndFabricColorByFabricNPart(fabric?: string, part?: string) {
        return Array.from(
            new Map(
                data?.filter(item => item.FABRICATION == fabric && item.PARTS == part)
                    .map(item => [
                        `${item.GMTCOLOR}__${item.FABRICCOLOR}`, // composite key
                        { GMTCOLOR: item.GMTCOLOR, FABRICCOLOR: item.FABRICCOLOR }
                    ])
            ).values()
        );
    }

    function get_SizeQy({ FABRICATION, PARTS, GMTCOLOR, FABRICCOLOR, GMT_SIZE, FINISHDIA }: { FABRICATION?: string, PARTS?: string, GMTCOLOR?: string, FABRICCOLOR?: string, GMT_SIZE?: string, FINISHDIA?: string }) {

        const lst = data?.filter(f => f.FABRICATION == FABRICATION && f.PARTS == PARTS && f.GMTCOLOR == GMTCOLOR && f.FABRICCOLOR == FABRICCOLOR && f.GMT_SIZE == GMT_SIZE
            && f.FINISHDIA == FINISHDIA);
        return lst ? lst.reduce((p, c) => p + Number(c.PCSQTY), 0).toFixed(0) : 0;
    }

    function get_ColTotalQy({ FABRICATION, PARTS, GMT_SIZE, FINISHDIA }: { FABRICATION?: string, PARTS?: string, GMTCOLOR?: string, FABRICCOLOR?: string, GMT_SIZE?: string, FINISHDIA?: string }) {

        const lst = data?.filter(f => f.FABRICATION == FABRICATION && f.PARTS == PARTS && f.GMT_SIZE == GMT_SIZE && f.FINISHDIA == FINISHDIA);
        return lst ? lst.reduce((p, c) => p + Number(c.PCSQTY), 0).toFixed(0) : 0;
    }

    function getColorFabric_SizeWiseTotalQty({ FABRICATION, PARTS, GMTCOLOR, FABRICCOLOR }: { FABRICATION?: string, PARTS?: string, GMTCOLOR?: string, FABRICCOLOR?: string }) {

        const lst = data?.filter(f => f.FABRICATION == FABRICATION && f.PARTS == PARTS && f.GMTCOLOR == GMTCOLOR && f.FABRICCOLOR == FABRICCOLOR);
        return lst ? lst.reduce((p, c) => p + Number(c.PCSQTY), 0).toFixed(0) : 0;
    }
    function getColorFabric_ColTotalQty({ FABRICATION, PARTS }: { FABRICATION?: string, PARTS?: string, GMTCOLOR?: string, FABRICCOLOR?: string }) {

        const lst = data?.filter(f => f.FABRICATION == FABRICATION && f.PARTS == PARTS);
        return lst ? lst.reduce((p, c) => p + Number(c.PCSQTY), 0).toFixed(0) : 0;
    }

    function get_RowTotalFabricQty({ FABRICATION, PARTS, GMTCOLOR, FABRICCOLOR }: { FABRICATION?: string, PARTS?: string, GMTCOLOR?: string, FABRICCOLOR?: string }) {

        const lst = data?.filter(f => f.FABRICATION == FABRICATION && f.PARTS == PARTS && f.GMTCOLOR == GMTCOLOR && f.FABRICCOLOR == FABRICCOLOR);
        return lst ? lst.reduce((p, c) => p + Number(c.TOTALFINISHFABRICS), 0).toFixed(0) : 0;
    }

    function get_TotalFabricQty({ FABRICATION, PARTS }: { FABRICATION?: string, PARTS?: string, GMTCOLOR?: string, FABRICCOLOR?: string }) {

        const lst = data?.filter(f => f.FABRICATION == FABRICATION && f.PARTS == PARTS);
        return lst ? lst.reduce((p, c) => p + Number(c.TOTALFINISHFABRICS), 0).toFixed(0) : 0;
    }

    function get_RowGsm({ FABRICATION, PARTS, GMTCOLOR, FABRICCOLOR }: { FABRICATION?: string, PARTS?: string, GMTCOLOR?: string, FABRICCOLOR?: string }) {
        const lst = data?.filter(f => f.FABRICATION == FABRICATION && f.PARTS == PARTS && f.GMTCOLOR == GMTCOLOR && f.FABRICCOLOR == FABRICCOLOR);
        const yarns = Array.from(
            new Set(lst?.map(item => item.GSM).filter((s): s is string => !!s))
        );
        return yarns[0] ?? '';
    }
    return (

        <div>
            {
                uniqueFabricCombos?.map((fabric_part, mindex) =>
                    <table key={mindex}>
                        <thead>
                            <tr>
                                <th colSpan={5 + getUniqueSizeCombosByFabricNPart(fabric_part.FABRICATION, fabric_part.PARTS)?.length} className='border border-gray-600'>{fabric_part.FABRICATION} - Color Size Breakdown in Pcs</th>
                            </tr>
                            <tr>
                                <th className='border border-gray-600 p-1 text-xs text-center'>Size</th>
                                <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>Fabrics Color</th>
                                {getUniqueSizeCombosByFabricNPart(fabric_part.FABRICATION, fabric_part.PARTS).map((s, i) =>
                                    <th className='border border-gray-600 min-w-16 text-xs text-center' key={i}>{s.GMT_SIZE}</th>
                                )}
                                <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>Total (Pcs)</th>
                                <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>Total Fabric(KG)</th>
                                {/* <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>Yarn</th> */}
                                <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>GSM</th>
                                {/* <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>Total Yarn(KG)</th> */}
                            </tr>
                            <tr>
                                <th className='border border-gray-600 p-1 text-xs text-center'>{fabric_part.PARTS}</th>
                                {getUniqueSizeCombosByFabricNPart(fabric_part.FABRICATION, fabric_part.PARTS).map((s, i) =>
                                    <th className='border border-gray-600 min-w-12 p-1 text-xs text-center' key={i}>{s.FINISHDIA}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {getUniqueGmtAndFabricColorByFabricNPart(fabric_part.FABRICATION, fabric_part.PARTS).map((color, index) =>
                                <tr key={index}>
                                    <td className='border border-gray-600 p-1 text-xs text-center'>{color.GMTCOLOR}</td>
                                    <td className='border border-gray-600 p-1 text-xs text-center'>{color.FABRICCOLOR}</td>
                                    {getUniqueSizeCombosByFabricNPart(fabric_part.FABRICATION, fabric_part.PARTS).map((s, i) =>
                                        <td className='border border-gray-600 min-w-16 text-xs text-center' key={i + index}>
                                            {
                                                get_SizeQy({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS, GMTCOLOR: color.GMTCOLOR, FABRICCOLOR: color.FABRICCOLOR, GMT_SIZE: s.GMT_SIZE, FINISHDIA: s.FINISHDIA })
                                            }
                                        </td>
                                    )}
                                    <td className='border border-gray-600 p-1 text-xs text-center' >
                                        {
                                            getColorFabric_SizeWiseTotalQty({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS, GMTCOLOR: color.GMTCOLOR, FABRICCOLOR: color.FABRICCOLOR })
                                        }
                                    </td>
                                    <td className='border border-gray-600 p-1 text-xs text-center' >
                                        {
                                            get_RowTotalFabricQty({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS, GMTCOLOR: color.GMTCOLOR, FABRICCOLOR: color.FABRICCOLOR })
                                        }
                                    </td>
                                    {/* <td className='border border-gray-600 p-1 text-xs text-center' >
                                        {
                                            get_RowYarnName({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS, GMTCOLOR: color.GMTCOLOR, FABRICCOLOR: color.FABRICCOLOR }).map(y => y + ",")
                                        }
                                    </td> */}
                                    <td className='border border-gray-600 p-1 text-xs text-center'>
                                        {
                                            get_RowGsm({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS, GMTCOLOR: color.GMTCOLOR, FABRICCOLOR: color.FABRICCOLOR })
                                        }
                                    </td>
                                    {/* <td className='border border-gray-600 p-1 text-xs text-center'>
                                        {get_RowYarnQty({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS, GMTCOLOR: color.GMTCOLOR, FABRICCOLOR: color.FABRICCOLOR })}
                                    </td> */}
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th className='border border-gray-600 p-1 text-xs text-center' colSpan={2}>Total</th>
                                {getUniqueSizeCombosByFabricNPart(fabric_part.FABRICATION, fabric_part.PARTS).map((s, i) =>
                                    <td className='border border-gray-600 min-w-16 text-xs text-center' key={i}>
                                        {
                                            get_ColTotalQy({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS, GMT_SIZE: s.GMT_SIZE, FINISHDIA: s.FINISHDIA })
                                        }
                                    </td>
                                )}
                                <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>
                                    {
                                        getColorFabric_ColTotalQty({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS })
                                    }
                                </th>
                                <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>
                                    {
                                        get_TotalFabricQty({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS })
                                    }
                                </th>
                                {/* <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}></th> */}
                                <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}></th>
                                {/* <th className='border border-gray-600 p-1 text-xs text-center' rowSpan={2}>
                                    {
                                        get_TotalYarnQty({ FABRICATION: fabric_part.FABRICATION, PARTS: fabric_part.PARTS })
                                    }
                                </th> */}
                            </tr>
                        </tfoot>
                    </table>
                )
            }

        </div>
    )
}
