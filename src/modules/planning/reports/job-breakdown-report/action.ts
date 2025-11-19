import axios from "axios";
import { JobBreakdownReportType } from "./job-breakdown-report-type";

async function GetData(api: {
    BaseUrl: string;
    ProductionUrl: string;
    ProductionRootUrl: string;
}, jobId: string): Promise<JobBreakdownReportType[]> {
    console.log(jobId)
    const data =
        await axios
            .get(
                `${api.ProductionUrl}/production/PlanningReport/JobBreakdownReport?jobId=${jobId}`
            );
    return data.data;
}

export default GetData;