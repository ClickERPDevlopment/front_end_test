import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { DateWiseFinishingProoductionReportType } from "./date-wise-finishing-production-report-type";

function DateWiseFinishingProoductionReport() {
  const [data, setData] = useState<DateWiseFinishingProoductionReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate: string = searchParams.get("fromDate") || "01-Oct-25";
  const toDate: string = searchParams.get("toDate") || "10-Oct-25";

  useEffect(() => {
    document.title = "Report";
  }, []);

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${api.ProductionUrl}/production/GmtFinishingReport/DateWiseFinishingProductionReport`,
          {
            params: {
              fromDate,
              toDate,
            },
          }
        );

        if (response.data) {
          setData(response.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }

    }

    getData();
  }, []);

  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="min-w-[70%] w-fit ms-auto me-auto">
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default DateWiseFinishingProoductionReport;
