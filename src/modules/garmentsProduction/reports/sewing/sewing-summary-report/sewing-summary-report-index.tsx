import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { SewingSummaryReportType } from "./sewing-summary-report-type";
import moment from "moment";

function SewingSummaryReport() {
  const [data, setData] = useState<SewingSummaryReportType[]>([]);
  const [monthData, setMonthData] = useState<SewingSummaryReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate: string = searchParams.get("fromDate") || "01-Sep-25";
  const toDate: string = searchParams.get("toDate") || "01-Sep-25";

  useEffect(() => {
    document.title = "Report";
  }, []);

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${api.ProductionUrl}/production/GmtSewingReport/SewingSummaryReport`,
          {
            params: {
              fromDate,
              toDate: fromDate,
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


  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${api.ProductionUrl}/production/GmtSewingReport/SewingSummaryReport`,
          {
            params: {
              fromDate: moment(fromDate).startOf("month").format("DD-MMM-YY"),
              toDate: moment(fromDate).format("DD-MMM-YY"),
            },
          }
        );

        if (response.data) {
          setMonthData(response.data);
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
      <div className="container flex flex-col items-center">
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="min-w-[70%] w-fit ms-auto me-auto">
        <Report searchParam={{ fromDate, toDate }} data={data} monthData={monthData}></Report>
      </div>
    </>
  );
}
export default SewingSummaryReport;
