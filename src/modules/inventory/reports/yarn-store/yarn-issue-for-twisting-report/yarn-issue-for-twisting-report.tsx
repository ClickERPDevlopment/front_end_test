import { YarnIssueForTwistingType } from './yarn-issue-for-twisting-report-type'
import ReportHeader from './components/report-header'
import ReportBody from './components/report-body'
import ReportFooter from './components/report-footer'

export default function YarnIssueTwistingReport({ data }: { data: YarnIssueForTwistingType[] }) {
    return (
        <div className='min-w-[50%] p-5 w-fit ms-auto me-auto' style={{
            fontFamily: "Times New Roman, serif",
            color: "#000",
            fontWeight: "bold"
        }}>
            <ReportHeader data={data} />
            <ReportBody data={data} />
            <ReportFooter />
        </div>
    )
}
