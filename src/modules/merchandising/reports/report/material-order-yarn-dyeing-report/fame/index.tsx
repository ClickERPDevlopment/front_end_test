import { IMaterialOrderYarnDyeingReport } from "../material-order-yarn-dyeing-report-type"
import Report from "./components/report"

function YarnDyeingWOReportFame({ data }: { data: IMaterialOrderYarnDyeingReport[] }) {
    return (
        <>
            <Report data={data}></Report>
        </>
    )
}

export default YarnDyeingWOReportFame