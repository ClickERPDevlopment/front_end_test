/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { EmbellishmentDailyProductionReportType } from "./embellishment-daily-production-report-type";

function EmbellishmentDailyProductionReport() {
  const [data, setData] = useState<EmbellishmentDailyProductionReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || "01-Jan-23";
  const toDate = searchParams.get("toDate") || "01-Jan-26";
  const supplierId = searchParams.get("supplierId") || "0";
  const woId = searchParams.get("woId") || "0";
  const buyerId = searchParams.get("buyerId") || "0";
  const styleId = searchParams.get("styleId") || "0";
  const poId = searchParams.get("poId") || "0";
  const typeId = searchParams.get("typeId") || "0";

  const searchParamsObj = {
    fromDate,
    toDate,
    buyerId,
    styleId,
    poId,
    typeId,
  };


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {

      const url = `${api.ProductionUrl}/production/EmbReport/EmbellishmentDailyProductionReport?fromDate=${fromDate}&toDate=${toDate}&supplierId=${supplierId}&woId=${woId}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}&typeId=${typeId}`;

      try {
        setIsLoading(true);
        await axios
          .get(url)
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
      <div>
        <Report data={data} searchParamsObj={searchParamsObj}></Report>
      </div>
    </>
  );
}
export default EmbellishmentDailyProductionReport;
