import { SampleProgramReportDto_SpecialTreatmentType } from '../sample-program-report.-type'

export default function SpecialTreatment({ lstSpecialTreatment }: { lstSpecialTreatment?: SampleProgramReportDto_SpecialTreatmentType[] }) {
    if (lstSpecialTreatment) {
        return lstSpecialTreatment?.length <= 0 ? null :
            (<div className='mt-5 flex'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={9} className='p-1 min-w-36 border border-gray-600 text-center'>Special Treatment</th>
                        </tr>
                        <tr>
                            <th className='p-1 min-w-36 border border-gray-600 text-center'>Fabric</th>
                            <th className='p-1 min-w-24 border border-gray-600 text-center'>Treatment</th>
                            <th className='p-1 min-w-20 border border-gray-600 text-center'>REQ. QTY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lstSpecialTreatment?.map((ele) =>
                            <tr>
                                <td className='p-1 border border-gray-600 text-center'>{ele.FABRIC}</td>
                                <td className='p-1 border border-gray-600 text-center'>{ele.TREATMENT}</td>
                                <td className='p-1 border border-gray-600 text-center'>{ele.REQUIRED_QTY}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>

                            <th className='p-1 border border-gray-600 text-center' colSpan={2}>Total</th>
                            <th className='p-1 border border-gray-600 text-center'>
                                {
                                    lstSpecialTreatment?.reduce((p, c) => p + Number(c.REQUIRED_QTY), 0).toFixed(2)
                                }
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            )
    }
}
