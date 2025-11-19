import { YarnIssueStatusReportType } from './yarn-issue-for-dyeing-report-type'
import ReportHeader from './components/report-header'
import ReportBody from './components/report-body'
import ReportFooter from './components/report-footer'

export default function YarnIssueStatusReport({ data }: { data: YarnIssueStatusReportType[] }) {
    return (
        <div
            className="min-w-[50%] p-5 w-fit ms-auto me-auto"
            style={{
                fontFamily: "Times New Roman, serif",
                color: "#000",
                fontWeight: "bold"
            }}
        >
            <ReportHeader data={data} />
            <ReportBody data={data} />
            <ReportFooter />
        </div>

    )
}
