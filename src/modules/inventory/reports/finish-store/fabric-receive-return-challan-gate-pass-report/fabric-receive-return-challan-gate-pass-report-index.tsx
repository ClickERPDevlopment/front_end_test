import useApiUrl from "@/hooks/use-ApiUrl";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IFabricReceiveReturnChallanGatePassReport } from "./fabric-receive-return-challan-gate-pass-report-type";

function FabricReceiveReturnChallanGatePassReport() {
  // State management
  const [data, setData] = useState<
    IFabricReceiveReturnChallanGatePassReport[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // URL params handling
  const [searchParams] = useSearchParams();
  const api = useApiUrl();

  // Extract and parse URL parameters

  const companyId = Number(searchParams.get("companyId")) || 0;
  const id = Number(searchParams.get("id")) || 0;
  // Set document title
  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    const fetchShortShipmentData = async () => {
      try {
        setIsLoading(true);
        const url = `${api.ProductionUrl}/production/FinishFabricStore/FabricReceiveReturnChallanGatePassReport`;
        const params = {
          id,
          companyId
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
  }, [api.ProductionUrl, id, companyId]);

  console.log(data);

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
export default FabricReceiveReturnChallanGatePassReport;
