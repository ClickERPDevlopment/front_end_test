import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { YarnReturnChallanReportType } from "./yarn-challan-report-type";


function YarnReturnChallanReport() {
  // API Context
  const api = useApiUrl();

  // State Management
  const [searchParams] = useSearchParams();
  const [yarnReturnChallanData, setYarnReturnChallanData] = useState<YarnReturnChallanReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const id = Number(searchParams.get("id")) || 0;


  // Data Fetching
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${api.ProductionUrl}/production/YarnStoreReport/YarnReturnChallanReport?id=${id}`);
      if (response.data) {
        console.log(response.data)
        setYarnReturnChallanData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    document.title = "Emblishment Budget Sheet";
    fetchData();
  }, []);

  // Render
  if (isLoading) {
    return (
      <div className="container">
        <h3 className="text-center p-2 m-4 text-3xl font-bold">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="min-w-[70%] w-fit ms-auto me-auto">
      <Report
        data={yarnReturnChallanData}
      />
    </div>
  );
}

export default YarnReturnChallanReport;
