import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import { IAccessoriesIssueReturnChallanReport } from "./accessories-issue-return-challan-report-type";
import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";

function AccessoriesIssueReturnChallanReport() {
  // State management
  const [data, setData] = useState<
    IAccessoriesIssueReturnChallanReport[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // URL params handling
  const [searchParams] = useSearchParams();
  const api = useApiUrl();

  // Extract and parse URL parameters
  const id = Number(searchParams.get("id")) || 1;
  // Set document title
  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    const fetchShortShipmentData = async () => {
      try {
        setIsLoading(true);
        const url = `${api.ProductionUrl}/production/AccessoriesStoreReport/AccessoriesIssueReturnChallanReport`;
        const params = {
          id,
        };

        const response = await axios.get(url, { params });

        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        const err = error as AxiosError;
        setErrorMessage(err?.response?.data as string);
        console.error("Error fetching data:", err.response?.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShortShipmentData();
  }, [api.ProductionUrl, id]);

  // console.log(data);

  return (
    <>
      {isLoading ? (
        <div className="container">
          <h3 className="text-center p-2 m-4 text-3xl font-bold">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </div>
      ) : (
        <div>
          {errorMessage ? (
            <div className="text-center mt-20">
              <h1 className="font-bold text-2xl text-red-600">
                <em>{errorMessage}</em>
              </h1>
            </div>
          ) : (
            <Report data={data} />
          )}
        </div>
      )}
    </>
  );
}
export default AccessoriesIssueReturnChallanReport;
