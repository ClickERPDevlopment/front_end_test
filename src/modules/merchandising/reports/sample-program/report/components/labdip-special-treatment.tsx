import { cn } from '@/lib/utils';
import { SampleProgramReportDto_DetailsType } from '../sample-program-report.-type'

export default function LabDipSpecialTreatment({ lstDetails }: { lstDetails?: SampleProgramReportDto_DetailsType[] }) {
    const uniqueData = Array.from(
        new Map(
            lstDetails
                ?.filter(item => (item.LAB_DIP_NO ?? "") && item.SPECIAL_TREATMENT)
                .map(item => [
                    `${item.LAB_DIP_NO ?? ""}__${item.SPECIAL_TREATMENT}`, // composite key
                    { LAB_DIP_NO: item.LAB_DIP_NO, SPECIAL_TREATMENT: item.SPECIAL_TREATMENT }
                ])
        ).values()
    );
    return (
        <div className={cn('mt-5 flex', (uniqueData.length <= 0 ? 'hidden' : ''))}>
            <table className='w-6/12'>
                <thead>
                    <tr>
                        <th className='p-1 min-w-24 border border-gray-600 text-center' colSpan={2}>Lab Dip No & Special Treatment</th>
                    </tr>
                    <tr>
                        <th className='p-1 min-w-24 border border-gray-600 text-center'>Lab Dip No</th>
                        <th className='p-1 whitespace-nowrap border border-gray-600 text-center'>Special Treatment</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueData?.map((ele) =>
                        ele.LAB_DIP_NO != "" || ele.SPECIAL_TREATMENT != "" ?
                            <tr>
                                <td className='p-1 border border-gray-600 text-center'>{ele.LAB_DIP_NO}</td>
                                <td className='p-1 border border-gray-600 text-center'>{ele.SPECIAL_TREATMENT}</td>
                            </tr>
                            :
                            <></>
                    )}
                </tbody>
            </table>
        </div>
    )
}
