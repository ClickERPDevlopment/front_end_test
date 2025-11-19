import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { DateWiseYarnAndGreyFabricStockReportType } from "./date-wise-yarn-and-grey-stock-report-type";

function DateWiseYarnAndGreyFabricStockReport() {
  const [data, setData] = useState<DateWiseYarnAndGreyFabricStockReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const id: number = Number(searchParams.get("id")) || 0;
  const factoryId: number = Number(searchParams.get("factoryId")) || 0;
  const fromDate: string = searchParams.get("fromDate") || "01-Jun-25";
  const toDate: string = searchParams.get("toDate") || "10-Jun-25";
  const dtChecked: boolean = searchParams.get("dtChecked") === "True";

  useEffect(() => {
    document.title = "Report";
  }, []);

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${api.ProductionUrl}/production/GreyStoreReport/DateWiseYarnAndGreyFabricStockReport`,
          {
            params: {
              id,
              factoryId,
              fromDate,
              toDate,
              dtChecked,
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
        <Report searchParam={{ dtChecked, fromDate, toDate, factoryId }} data={data}></Report>
      </div>
    </>
  );
}
export default DateWiseYarnAndGreyFabricStockReport;
