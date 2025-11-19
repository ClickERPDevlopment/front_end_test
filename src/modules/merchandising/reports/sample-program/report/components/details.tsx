import { SampleProgramReportDto_DetailsType } from '../sample-program-report.-type'

export default function Details({ lstDetails }: { lstDetails?: SampleProgramReportDto_DetailsType[] }) {
    return (
        <div className='mt-5 flex'>
            <table>
                <thead>
                    <tr>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Style</th>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Parts</th>
                        <th className='p-1 min-w-36 border border-gray-600 text-center'>Fabrication</th>
                        <th className='p-1 min-w-36 border border-gray-600 text-center'>Yarn Count</th>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Fabric Color</th>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Lab Dip No</th>
                        <th className='p-1 whitespace-nowrap border border-gray-600 text-center'>Special Treatment</th>
                        <th className='p-1 min-w-20 border border-gray-600 text-center'>Size</th>
                        <th className='p-1 border border-gray-600 text-center'>Finish Dia</th>
                        <th className='p-1 border border-gray-600 text-center'>Gsm</th>
                        <th className='p-1 border border-gray-600 text-center'>Req. Finish Fab</th>
                        <th className='p-1 border border-gray-600 text-center'>UOM</th>
                        <th className='p-1 border border-gray-600 text-center'>Total Yarn</th>
                    </tr>
                </thead>
                <tbody>
                    {lstDetails?.map((ele) =>
                        <tr>
                            <td className='p-1 border border-gray-600 text-center'>{ele.STYLE}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.PARTS}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.FABRICATION}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.YARN_COUNT}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.FABRIC_COLOR}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.LAB_DIP_NO}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.SPECIAL_TREATMENT}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.GMT_SIZE}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.FINISH_DIA}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.GSM}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.REQ_FINISH_FAB}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.UOM}</td>
                            <td className='p-1 border border-gray-600 text-center'>{ele.TOTAL_YARN}</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>

                        <th className='p-1 border border-gray-600 text-center' colSpan={10}>Total</th>
                        <th className='p-1 border border-gray-600 text-center'>
                            {
                                lstDetails?.reduce((p, c) => p + Number(c.REQ_FINISH_FAB), 0).toFixed(2)
                            }
                        </th>
                        <th className='p-1 border border-gray-600 text-center'></th>
                        <th className='p-1 border border-gray-600 text-center'>
                            {
                                lstDetails?.reduce((p, c) => p + Number(c.TOTAL_YARN), 0).toFixed(2)
                            }
                        </th>
                    </tr>
                </tfoot>
            </table>



        </div>
    )
}
