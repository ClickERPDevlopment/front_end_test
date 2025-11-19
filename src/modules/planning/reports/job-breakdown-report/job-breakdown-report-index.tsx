/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { JobBreakdownReportType } from "./job-breakdown-report-type";
import GetData from "./action";

function JobBreakdownReport({ jobId, isShowReportHeader = true }: { jobId?: string, isShowReportHeader?: boolean }) {
  const [data, setData] = useState<JobBreakdownReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  if (!jobId) {
    jobId = searchParams.get("jobId") || "0";
  }

  const api = useApiUrl();

  useEffect(() => {
    if (isShowReportHeader) {
      document.title = "Report";
    }
  }, []);

  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      return await GetData(api, jobId ?? "0");
    }
    getData().then((res) => {
      setData(res);
      setIsLoading(false)

    });
    setIsLoading(false)

  }, []);


  if (!isLoading && data) {
    return (<>
      <div className="min-w-[60%] w-fit ms-auto me-auto">
        <Report data={data} isShowReportHeader={isShowReportHeader}></Report>
      </div>
    </>)
  } else {
    return (<div className="container">
      <h3 className=" text-center p-2 m-4 font-bold ">
        <Skeleton width={400} height={40} />
      </h3>
      <TableSkeleton />
    </div>)
  }
}
export default JobBreakdownReport;
