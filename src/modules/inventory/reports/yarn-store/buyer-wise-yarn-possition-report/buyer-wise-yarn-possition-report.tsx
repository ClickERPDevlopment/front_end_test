import { IBuyerWiseYarnPossitionReport } from './buyer-wise-yarn-possition-report-type'
import ReportSubGroup from './components/report-sub-group'

interface IUniqueFabricCombos {
    BUYER: string;
    STYLENO: string;
    PONO: string;
    BOOKING_YARN: string;
    BOOKING_QTY: number;
};

export default function BuyerWiseYarnPossitionReportReport({ data }: { data: IBuyerWiseYarnPossitionReport[] }) {

    const uniqueCurrency = [...new Set(data?.filter(item => item.CURRENCY).map(item => item.CURRENCY))];

    const uniqueFabricCombos: IUniqueFabricCombos[] = Array.from(
        new Map(
            data
                ?.filter(item => item.BUYER && item.STYLENO && item.PONO && item.BOOKING_YARN && item.BOOKING_QTY)
                .map(item => [
                    `${item.BUYER}__${item.STYLENO}__${item.PONO}__${item.BOOKING_YARN}__${item.BOOKING_QTY}`, // composite key
                    { BUYER: item.BUYER, STYLENO: item.STYLENO, PONO: item.PONO, BOOKING_YARN: item.BOOKING_YARN, BOOKING_QTY: item.BOOKING_QTY }
                ])
        ).values()
    );

    return (
        <div className="p-5">
            {/* {JSON.stringify(data)} */}
            <div className='static'>
                <h1 className='text-center font-bold text-2xl'>{data[0]?.COMPANY_NAME}</h1>
                <h1 className='text-center font-bold text-sm mb-5'>{data[0]?.COMPANY_ADDRESS}</h1>
                <h1 className='text-center font-bold text-xl'>Buyer Wise Yarn Possition Report</h1>
            </div>
            <table className='border border-gray-600 rounded-md min-w-full'>
                <thead className='sticky top-0 print:static'>
                    <tr>
                        <th className='border border-gray-600 min-w-5 py-1'>Buyer</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Style (Style Name)</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Job/PO No.</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Yarn Composition</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Booking. Qty.</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Booking Date</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Shipment Date</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Allocated Yarn</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Allocation QTY	</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Balance</th>
                        <th className='border border-gray-600 min-w-5 py-1'>PI. Date</th>
                        <th className='border border-gray-600 min-w-5 py-1'>PI NO.</th>
                        <th className='border border-gray-600 min-w-5 py-1'>PI. Qty.</th>
                        <th className='border border-gray-600 min-w-5 py-1'>L/C. Date	</th>
                        <th className='border border-gray-600 min-w-5 py-1'>L/C. NO	</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Supplier Name	</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Receive Date	</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Currency	</th>
                        <th className='border border-gray-600 min-w-5 py-1'>Total Amount</th>
                        {/* <th className='border border-gray-600 p-0.5'>Remarks</th> */}
                    </tr>
                </thead>
                <tbody>
                    {uniqueFabricCombos.map((s) => {
                        const filerData = data.filter(f => f.BUYER === s.BUYER && f.STYLENO === s.STYLENO && f.PONO === s.PONO && f.BOOKING_YARN === s.BOOKING_YARN);
                        return (
                            <ReportSubGroup data={filerData} />
                        )
                    })
                    }

                    <tr>
                        <th colSpan={4} className='border border-gray-600 min-w-5 px-3 text-right font-bold'>Grand Total</th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>
                            {
                                uniqueFabricCombos.reduce((p, c) => Number(p) + Number(c.BOOKING_QTY), 0).toFixed(2)
                            }
                        </th>
                        <th colSpan={3} className='border border-gray-600 min-w-24 p-0.5' />
                        <th className='border border-gray-600 min-w-24 p-0.5'>
                            {
                                data?.reduce((p, c) => Number(p) + Number(c.ALLOCATED_QTY!), 0).toFixed(2)
                            }
                        </th>
                        <th className='border border-gray-600 min-w-24 p-0.5'>
                            {
                                (uniqueFabricCombos.reduce((p, c) => Number(p) + Number(c.BOOKING_QTY), 0) -
                                    data?.reduce((p, c) => Number(p) + Number(c.ALLOCATED_QTY!), 0)).toFixed(2)
                            }
                        </th>
                    </tr>
                </tbody>
            </table>
            <table className='mt-7'>
                <thead>
                    <tr>
                        <th colSpan={3} className='border border-gray-600'>Summary</th>
                    </tr>
                    <tr>
                        <th className='border border-gray-600 p-1 text-center'>Currency </th>
                        <th className='border border-gray-600 p-1 text-center'>Allocated qty.</th>
                        <th className='border border-gray-600 p-1 text-center'>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueCurrency.map((s) => {
                        return (
                            <tr>
                                <td className='border border-gray-600 p-1 text-center'>{s}</td>
                                <td className='border border-gray-600 p-1 text-center'>
                                    {
                                        data.filter(f => f.CURRENCY === s).reduce((p, c) => Number(p) + Number(c.ALLOCATED_QTY), 0).toFixed(2)
                                    }
                                </td>
                                <td className='border border-gray-600 p-1 text-center'>
                                    {
                                        data.filter(f => f.CURRENCY === s).reduce((p, c) => Number(p) + Number(c.TOTAL_AMOUNT), 0).toFixed(2)
                                    }
                                </td>
                            </tr>)
                    })}
                    <tr>
                        <td className='border border-gray-600 p-1 text-center font-bold'>Total</td>
                        <td className='border border-gray-600 p-1 text-center font-bold'>
                            {
                                data?.reduce((p, c) => Number(p) + Number(c.ALLOCATED_QTY), 0).toFixed(2)
                            }
                        </td>
                        <td className='border border-gray-600 p-1 text-center font-bold'>
                            {
                                data?.reduce((p, c) => Number(p) + Number(c.TOTAL_AMOUNT), 0).toFixed(2)
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}
