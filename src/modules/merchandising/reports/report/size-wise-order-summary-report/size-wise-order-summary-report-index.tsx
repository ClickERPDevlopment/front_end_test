import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { SizeWiseOrderSummaryReportType } from "./size-wise-order-summary-report-type";

function SizeWiseOrderSummaryReport() {
  const [data, setData] = useState<SizeWiseOrderSummaryReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || '01-Jan-25';
  const toDate = searchParams.get("toDate") || '01-Jan-25';
  const buyerId = searchParams.get("buyerId") || 0;
  const styleId = searchParams.get("styleId") || 0;
  const poId = searchParams.get("poId") || 0;

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
            `${api.ProductionUrl}/production/MerchReport/SizeWiseOrderSummaryReport`, {
            params: {
              fromDate,
              toDate,
              buyerId,
              styleId,
              poId
            }
          }
          )
          .then((res) => {
            if (res.data) {
              setData(res.data);
            } else {
              // Handle empty response
            }
          })
          .catch((err) => console.log(err));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
        // Handle exception
      }
    }
    getData();
  }, []);


  //console.log(data);

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
        <Report searchParams={{ fromDate, toDate }} data={data}></Report>
      </div>
    </>
  );
}
export default SizeWiseOrderSummaryReport;
