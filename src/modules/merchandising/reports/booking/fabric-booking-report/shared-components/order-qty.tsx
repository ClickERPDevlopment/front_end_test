import { FabricBookingReportDto_ColorSizeWiseOrderQty, FabricBookingReportDto_Size } from '../fabric-booking-type'

export default function OrderQty({ lstColorSizeWiseOrderQty, lstSize }:
    {
        lstColorSizeWiseOrderQty?: FabricBookingReportDto_ColorSizeWiseOrderQty[],
        lstSize?: FabricBookingReportDto_Size[]
    }) {

    const sizes = Array.from(
        new Set(lstSize?.map(item => item.SIZENAME).filter((s): s is string => !!s))
    );

    function getQtyBySize({ size }: { size: string }) {
        const data = lstColorSizeWiseOrderQty?.filter(e => e.size == size);
        return data?.reduce((p, c) => p + c.qty, 0).toFixed(0);
    }
    function getQtyByStyleColor({ style, color }: { style?: string, color?: string }) {
        const data = lstColorSizeWiseOrderQty?.filter(e => e.style == style && e.color == color);
        return data?.reduce((p, c) => p + c.qty, 0).toFixed(0);
    }

    function getQtyByStyleColorSize({ style, color, size }: { style?: string, color?: string, size?: string }) {
        const data = lstColorSizeWiseOrderQty?.filter(e => e.style == style && e.color == color && e.size == size);
        return data?.reduce((p, c) => p + c.qty, 0).toFixed(0);
    }

    const uniqueColorCombos = Array.from(
        new Map(
            lstColorSizeWiseOrderQty?.filter(item => item.style && item.color)
                .map(item => [
                    `${item.style}__${item.color}`, // composite key
                    { style: item.style, color: item.color }
                ])
        ).values()
    );

    return (
        <div className="m-0 p-0 flex justify-center items-center flex-col  mt-5">
            <h4 className="text-center m-0 p-0 mb-[5px] text-lg font-bold">Order Qty</h4>
            <table>
                <thead>
                    <tr>
                        <th className="px-[5px] py-[3px] min-w-[150px] border border-gray-600 whitespace-nowrap">Style</th>
                        <th className="px-[5px] py-[3px] min-w-[150px] border border-gray-600 whitespace-nowrap">Colors</th>

                        {sizes.map((ele, i) =>
                            <th key={i} className="px-[5px] py-[3px] min-w-[70px] border border-gray-600">{ele}</th>
                        )}
                        <th className="px-[5px] py-[3px] min-w-[100px] border border-gray-600">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueColorCombos.map((style, i) =>
                        <tr key={i}>
                            <td className="px-[5px] py-[3px] text-center border border-gray-600">{style.style}</td>
                            <td className="px-[5px] py-[3px] text-center border border-gray-600">{style.color}</td>
                            {sizes.map((size, si) =>
                                <td key={si} className="px-[5px] py-[3px] min-w-[70px] text-center border border-gray-600">{getQtyByStyleColorSize({ style: style.style, color: style.color, size })}</td>
                            )}
                            <td className="px-[5px] py-[3px] text-center font-bold border border-gray-600">{getQtyByStyleColor({ style: style.style, color: style.color })}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <th className="px-[5px] py-[3px] border border-gray-600" colSpan={2}>Total</th>
                        {sizes.map((size, i) =>
                            <th key={i} className="px-[5px] py-[3px] min-w-[70px] text-center border border-gray-600">{getQtyBySize({ size })}</th>
                        )}
                        <th className="px-[5px] py-[3px] min-w-[70px] text-center border border-gray-600">{lstColorSizeWiseOrderQty?.reduce((p, c) => p + c.qty, 0).toFixed(0)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
