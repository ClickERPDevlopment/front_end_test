import { SampleProgramReportDto_MasterType } from '../sample-program-report.-type'

export default function Remarks({ masterInfo }: { masterInfo?: SampleProgramReportDto_MasterType }) {
    return (
        <div className='w-full flex mt-5'>
            <label htmlFor="" className='font-bold min-w-28'>Remarks</label>
            <span>: {masterInfo?.PRIORITY_REMARKS}</span>
        </div>
    )
}
