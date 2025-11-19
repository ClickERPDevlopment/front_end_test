import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { ICompensationClaimMasterType } from "./compensation-claim-report-type";
import ReportFooter from "./components/report-footer";


function CompensationClaimReport() {
  // API Context
  const api = useApiUrl();

  // State Management
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<ICompensationClaimMasterType>();
  const [isLoading, setIsLoading] = useState(false);


  const id: Number = Number(searchParams.get("id")) || 1;

  // API URL Construction
  const getApiUrl = () => {
    const baseUrl = `${api.ProductionUrl}/production/CompensationClaim/${id}`;
    return `${baseUrl}`;
  };

  console.log(data);

  // Data Fetching
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(getApiUrl());
      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    document.title = "";
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
    <div className="flex flex-col min-h-screen px-5">
      {/* Report content */}
      <div className="flex-grow">
        <Report data={data} />
      </div>

      {/* Footer text */}
      <div className="mt-4">
        <ReportFooter data={data} />
        <p className="text-center text-sm text-gray-950 mt-2" style={{ marginBottom: "95px" }}>
          ***This is the ERP generated document***
        </p>
      </div>
    </div>

  );
}

export default CompensationClaimReport;
