import { YarnIssueForTwistingType } from '../yarn-issue-for-twisting-report-type'

export default function ReportBody({ data }: { data: YarnIssueForTwistingType[] | null }) {
    return (
        <div className='min-w-full mt-5 font-bold' >
            <table className='min-w-full'>
                <thead style={{ fontSize: "15px" }}>
                    <tr>
                        <th className='p-0.5 text-center border border-gray-950'>SL</th>
                        <th className='p-0.5 text-center border border-gray-950'>PO/JOB</th>
                        <th className='p-0.5 text-center border border-gray-950'>Style</th>
                        <th className='p-0.5 text-center border border-gray-950'>BB LC NO/WO NO	</th>
                        <th className='p-0.5 text-center border border-gray-950'>Yarn</th>
                        <th className='p-0.5 text-center border border-gray-950'>Brand</th>
                        <th className='p-0.5 text-center border border-gray-950'>Lot</th>
                        <th className='p-0.5 text-center border border-gray-950'>Yarn Color</th>
                        <th className='p-0.5 text-center border border-gray-950'>Issue Qty (KG)</th>
                        <th className='p-0.5 text-center border border-gray-950'>Bag & Cone</th>
                        <th className='p-0.5 text-center border border-gray-950'>Remarks</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: "14px" }}>
                    {data?.map((ele, i) =>
                        <tr key={i}>
                            <td className='p-0.5 text-center border border-gray-950'>{i + 1}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.PONO}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.STYLE_NO}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.BBLC_NO}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.YARN}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.YARN_BRAND}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.YARN_LOT_NUMBER}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.YARN_DYEING_COLOR}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.QUANTITY}</td>
                            <td className='p-0.5 text-center border border-gray-950'>B:{ele.CARTON_QTY} & C:{ele.CONE_QTY}</td>
                            <td className='p-0.5 text-center border border-gray-950'>{ele.REMARKS}</td>
                        </tr>
                    )}

                </tbody>
                <tfoot style={{ fontSize: "15px" }}>
                    <tr>
                        <th className='p-0.5 text-center border border-gray-950' colSpan={8}>Total</th>
                        <th className='p-0.5 text-center border border-gray-950'>
                            {
                                data?.reduce((p, c) => p + Number(c.QUANTITY), 0)
                            }
                        </th>
                        <th className='p-0.5 text-center border border-gray-950'>
                            B:{
                                data?.reduce((p, c) => p + Number(c.CARTON_QTY), 0)
                            }
                            {" & C:"}
                            {
                                data?.reduce((p, c) => p + Number(c.CONE_QTY), 0) ?? 0
                            }
                        </th>
                        <th className='p-0.5 text-center border border-gray-950'></th>
                    </tr>
                </tfoot>
            </table>

        </div>
    )
}
