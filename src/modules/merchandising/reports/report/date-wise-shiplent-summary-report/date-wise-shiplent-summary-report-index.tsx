/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { DateWiseShiplentSummaryReportType } from "./date-wise-shiplent-summary-report-type";

function DateWiseShiplentSummaryReport() {

  const [data, setData] = useState<DateWiseShiplentSummaryReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();


  const fromDate = searchParams.get("fromDate") ?? "01-Jan-24";
  const toDate = searchParams.get("toDate") ?? "01-Jan-25";
  const buyerId = searchParams.get("buyerId") ?? "0";
  const styleId = searchParams.get("styleId") ?? "0";
  const po = searchParams.get("po") ?? "";


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Date Wise Shipment Summary Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            //`${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport`
            `${api.ProductionUrl}/production/MerchReport/DateWiseShiplentSummaryReport`, {
            params: { fromDate, toDate, buyerId, styleId, po }
          }
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log(res.data);
              setData(res.data);
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
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div>
        <Report data={data} searchParams={{ toDate, fromDate }}></Report>
      </div>
    </>
  );
}
export default DateWiseShiplentSummaryReport;
