import { cn } from '@/lib/utils'
import { IAtoZReportFabric } from './IAtoZReportFabric'
import moment from 'moment'
import { IAtoZReportGmt } from './IAtoZReportGmt'
import useApiUrl from '@/hooks/use-ApiUrl'
// import { Button } from '@/components/ui/button'
//--
type props = {
    data_fabric: IAtoZReportFabric[]
    data_gmt: IAtoZReportGmt[]
    buyerIndex: number
    poStyleIndex: number
}
export default function PoStyleWiseRows({ data_fabric, data_gmt, poStyleIndex }: props) {
    const maxLength = Math.max(data_fabric?.length ?? 0, data_gmt?.length ?? 0);
    const api = useApiUrl();
    // const handleClick = (po: string) => {
    //     window.open(`${api.BaseUrl}:60/planning/show-report-summery?job_no=${po}`, "_blank", "noopener,noreferrer");
    // };
    return (
        <>
            {Array.from({ length: maxLength }).map((_, i) => {
                const fabric = data_fabric?.[i];
                const gmt = data_gmt?.[i];

                const f = { ...fabric };
                const g = { ...gmt };


                console.log('g-', data_fabric);
                const key = i + poStyleIndex + 1;
                if (i == 0) {
                    return (
                        <tr className={cn("border-t border-gray-500", ((key % 2) == 0 ? 'bg-emerald-100' : ''))} key={key}>
                            <td className="border border-gray-500 text-center p-1 text-nowrap" rowSpan={maxLength}>
                                <span className="hidden">{f?.BUYER_ID}</span>
                                {f?.BUYER}
                            </td>
                            <td className="border border-gray-500 text-center p-1 text-nowrap" rowSpan={maxLength}>
                                <span className="hidden">{f?.PO_ID}</span>
                                <a
                                    href={`${api.PhpBaseUrl}:60/planning/show-report-summery?job_no=${f?.PONO}`} // your target route
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sky-600 hover:underline cursor-pointer"
                                >
                                    {f?.PONO}
                                </a>
                            </td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                <span className="hidden">{f?.STYLE_ID}</span>
                                {f?.STYLENO}
                            </td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                {f?.ITEM_TYPE}
                            </td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                {f?.SMV}
                            </td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.PO_QTY}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                {f?.CONSUMPTION_RELEASE_DATE &&
                                    moment(f?.CONSUMPTION_RELEASE_DATE).format("DD-MMM-YYYY")}
                            </td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.YARN_BOOKING_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.ALLOCATED_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.ALLOCATED_BALANCE}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                {f?.YARN_ALLOCATION_CLOSE_DATE &&
                                    moment(f?.YARN_ALLOCATION_CLOSE_DATE).format("DD-MMM-YYYY")}
                            </td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.YARN_ISSUE_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.YARN_ISSUE_BALANCE}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                {f?.YARN_ISSUE_LAST_DTATE &&
                                    moment(f?.YARN_ISSUE_LAST_DTATE).format("DD-MMM-YYYY")}
                            </td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                {f?.KNITTING_START_DT &&
                                    moment(f?.KNITTING_START_DT).format("DD-MMM-YYYY")}
                            </td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.GREY_RCV_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.KNITTING_BAL}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.KNITTING_WIP}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                {f?.KNITTING_CLOSE_DT &&
                                    moment(f?.KNITTING_CLOSE_DT).format("DD-MMM-YYYY")}
                            </td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.DYEING_GREY_RCV_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.BATCH_QTY_KG}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.READY_FOR_BATCH}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.DYEING_QTY_KG}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.FINISH_PROD_GREY_WEIGHT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.FINISHING_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>
                                {((f?.FINISH_PROD_GREY_WEIGHT - f?.FINISHING_QTY) / f?.FINISH_PROD_GREY_WEIGHT * 100).toFixed(2)}
                            </td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.FINISHING_DELIVER_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.FINISHING_DELIVER_GREY_WEIGHT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.RFT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.DYEING_GREY_RCV_QTY - f?.FINISHING_DELIVER_GREY_WEIGHT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.FINISH_REQ_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.FINISHING_FABRIC_RCV_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1" rowSpan={maxLength}>{f?.FF_RCV_BALANCE}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1" rowSpan={maxLength}>
                                {f?.FIN_FABRICS_DEL_LAST_DATE &&
                                    moment(f?.FIN_FABRICS_DEL_LAST_DATE).format("DD-MMM-YYYY")}
                            </td>
                            {/* gmt-General Info */}
                            <td className="border border-gray-500 text-nowrap text-center p-1">{g?.STYLENO}</td>
                            <td className="border border-gray-500 text-balance text-center p-1 border-l">
                                <a
                                    href={`/report/embellishment/embellishment-send-receive-report?fromOpmDate=01-Jan-2025&toOpmDate=20-Dec-2025&fromSendRcvDate=20-Sep-2025&toSendRcvDate=20-Sep-2025&isOpmDate=False&isSendRcvDate=False&buyerId=0&styleId=0&poId=${g?.PO_ID}&colorId=0&companyId=0&loggedInCompanyId=1`} // your target route
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(g?.IS_EMB === '1' ? "text-sky-600 hover:underline cursor-pointer" : "")}
                                >
                                    {g?.PONO}
                                </a>
                            </td>
                            <td className="border border-gray-500 text-nowrap text-center p-1">{moment(g?.SHIP_DATE).format("DD-MMM-YYYY")}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1">{g?.LINENAME}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1">{g?.PO_QTY}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Cutting</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.CUTTING_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.CUTTING_BALANCE}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{((g?.CUTTING_QTY * 100) / g?.PO_QTY).toFixed(2)}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Input</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SEWING_INPUT_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SEWING_INPUT_READY_QTY}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Sewing</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SEWING_OUTPUT_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SEWING_WIP}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Finishing</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.FINISHING_INPUT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.FINISHING_OUTPUT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.FINISHING_WIP}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Packing</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.PACKED_INPUT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.PACKED_OUTPUT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.PACKING_WIP}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Shipping</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SHIPPING_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SHIPPING_BALANCE}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1">{g?.Summery</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.CUT_TO_SHIP_PERCENTAGE}</td>
                        </tr>
                    );
                } else {
                    return (
                        <tr className={cn("border-t border-gray-500")} key={i}>
                            {/* gmt-General Info */}
                            <td className="border border-gray-500 text-nowrap text-center p-1">{g?.STYLENO}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">
                                <a
                                    href={`/report/embellishment/embellishment-send-receive-report?fromOpmDate=01-Jan-2025&toOpmDate=20-Dec-2025&fromSendRcvDate=20-Sep-2025&toSendRcvDate=20-Sep-2025&isOpmDate=false&isSendRcvDate=False&buyerId=0&styleId=0&poId=${g?.PO_ID}&colorId=0&companyId=0&loggedInCompanyId=1`} // your target route
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn(g?.IS_EMB === '1' ? "text-sky-600 hover:underline cursor-pointer" : "")}
                                >
                                    {g?.PONO}
                                </a>
                            </td>
                            <td className="border border-gray-500 text-nowrap text-center p-1">{moment(g?.SHIP_DATE).format("DD-MMM-YYYY")}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1">{g?.LINENAME}</td>
                            <td className="border border-gray-500 text-nowrap text-center p-1">{g?.PO_QTY}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Cutting</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.CUTTING_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.CUTTING_BALANCE}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Input</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SEWING_INPUT_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SEWING_INPUT_READY_QTY}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Sewing</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SEWING_OUTPUT_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SEWING_WIP}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Finishing</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.FINISHING_INPUT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.FINISHING_OUTPUT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.FINISHING_WIP}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Packing</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.PACKED_INPUT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.PACKED_OUTPUT}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.PACKING_WIP}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Shipping</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SHIPPING_QTY}</td>
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.SHIPPING_BALANCE}</td>

                            {/* <td className="border border-gray-500 text-balance text-center p-1">{g?.Summery</td> */}
                            <td className="border border-gray-500 text-balance text-center p-1">{g?.CUT_TO_SHIP_PERCENTAGE}</td>
                        </tr>
                    );
                }

            })}
        </>
    );

}
