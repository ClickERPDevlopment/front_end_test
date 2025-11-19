import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import { IAccessoriesReceiveStatusByChallanNoReport } from "./accessories-receive-status-by-challan-no-report-type";
import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";

function AccessoriesReceiveStatusByChallanNoReport() {
  // State management
  const [data, setData] = useState<
    IAccessoriesReceiveStatusByChallanNoReport[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // URL params handling
  const [searchParams] = useSearchParams();
  const api = useApiUrl();
  console.log(api.ProductionUrl)

  // Extract and parse URL parameters
  const woId = Number(searchParams.get("woId")) || 0;
  const itemId = Number(searchParams.get("itemId")) || 0;
  const buyerId = Number(searchParams.get("buyerId")) || 0;
  const styleId = Number(searchParams.get("styleId")) || 0;
  const poId = Number(searchParams.get("poId")) || 0;
  const dtFrom = searchParams.get("dtFrom") || "01-Jan-25";
  const dtTo = searchParams.get("dtTo") || "01-Feb-25";
  const challanNo = searchParams.get("challanNo") || "";
  // console.log(buyerId, styleId, poId, dtFrom, dtTo);
  // Set document title
  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    const fetchShortShipmentData = async () => {
      try {
        setIsLoading(true);
        const url = `${api.ProductionUrl}/production/AccessoriesStoreReport/AccessoriesReceiveStatusByChallanNoReport`;
        const params = {
          buyerId,
          styleId,
          poId,
          dtFrom,
          dtTo,
          challanNo,
          woId,
          itemId,
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
  }, [api.ProductionUrl, buyerId, styleId, poId, dtFrom, dtTo]);

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
            <Report dtFrom={dtFrom} dtTo={dtTo} data={data} />
          )}
        </div>
      )}
    </>
  );
}
export default AccessoriesReceiveStatusByChallanNoReport;
