/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { InternalProductPlacementSheetReportType } from "./internal-product-placement-sheet-report-type";
import { InternalProductPlacementSheetSummaryReportType } from "./internal-product-placement-sheet-summary-report-type";

function InternalProductPlacementSheetReport() {
  const [data, setData] = useState<InternalProductPlacementSheetReportType[]>([]);
  const [summaryData, setSummaryData] = useState<InternalProductPlacementSheetSummaryReportType[]>([]);


  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || new Date().toLocaleDateString("en-CA");
  const toDate = searchParams.get("toDate") || new Date().toLocaleDateString("en-CA");
  const buyerId = searchParams.get("buyerId") || "0";
  const companyId = searchParams.get("companyId") || "1";
  const fromDateCheck = searchParams.get("fromDateCheck")?.toLowerCase() === "false" ? false : true;
  const toDateCheck = searchParams.get("toDateCheck")?.toLowerCase() === "false" ? false : true;

  const searchParamsObj = {
    fromDate,
    toDate,
    buyerId,
    companyId,
    fromDateCheck,
    toDateCheck,
  };


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/PlanningReport/InternalProductPlacementSheetReport?fromDate=${fromDate}&toDate=${toDate}&buyerId=${buyerId}&companyId=${companyId}&fromDateCheck=${fromDateCheck}&toDateCheck=${toDateCheck}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        await axios
          .get(
            `${api.ProductionUrl}/production/PlanningReport/InternalProductPlacementSheetSummaryReport?fromDate=${fromDate}&toDate=${toDate}&buyerId=${buyerId}&companyId=${companyId}&fromDateCheck=${fromDateCheck}&toDateCheck=${toDateCheck}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              setSummaryData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
        //console.log(error.message);
      }
    }
    getData();
  }, []);

  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div>
        <Report searchParamsObj={searchParamsObj} data={data} summaryData={summaryData}></Report>
      </div>
    </>
  );
}
export default InternalProductPlacementSheetReport;
