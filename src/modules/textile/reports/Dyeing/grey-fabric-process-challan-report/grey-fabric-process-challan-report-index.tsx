/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { GreyFabricProcessChallanReportType } from "./grey-fabric-process-challan-report-type";

function GreyFabricProcessChallanReport() {
  const [data, setData] = useState<GreyFabricProcessChallanReportType[]>(
    []
  );




  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") || "0";
  const companyId = searchParams.get("companyId") || "1";
  const challanType = searchParams.get("challanType") || "";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Grey Fabric Process Challan";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/DyeingReport/GreyFabricProcessChallanReport`, {
            params: {
              id: id,
              companyId: companyId
            }
          }
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

      <div className="flex flex-col min-h-screen px-5">
        {/* Report content */}
        <div className="flex-grow">
          <Report data={data} challanType={challanType} />
        </div>

        {/* Footer text */}
        <p className="text-center text-sm text-gray-950 mt-auto print-footer">
          ***This is the ERP generated document***
        </p>
      </div>

    </>
  );
}
export default GreyFabricProcessChallanReport;
