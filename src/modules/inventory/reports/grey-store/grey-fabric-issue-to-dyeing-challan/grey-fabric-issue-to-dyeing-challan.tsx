import { GreyFabricIssueToDyeingChallanType } from './grey-fabric-issue-to-dyeing-challan-type'
import ReportHeader from './components/report-header'
import ReportBody from './components/report-body'
import ReportFooter from './components/report-footer'
import ReportComments from './components/report-comments'

export default function GreyFabricIssueToDyeing({ data, reportFormat }: { data: GreyFabricIssueToDyeingChallanType | null | undefined, reportFormat: number }) {
    return (
        <div className='w-full p-5'>
            <ReportHeader data={data?.MasterInfo} reportFormat={reportFormat} />
            <ReportBody data={data?.DetailsInfo} />
            <ReportComments data={data?.Comments} />
            <ReportFooter data={data?.MasterInfo} />
        </div>
    )
}
