/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { DailySewingEfficiencyReportType } from "./daily-sewing-efficiency-report-type";

function DailySewingEfficiencyReport() {
  const [data, setData] = useState<DailySewingEfficiencyReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || "02-Aug-25";
  const toDate = searchParams.get("toDate") || "02-Aug-25";
  const companyId = searchParams.get("companyId") || "0";
  const floorIdsString = searchParams.get("floorIdsString") || "";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  const searchParamsObj = {
    fromDate,
    toDate,
    companyId: Number(companyId)
  }

  useEffect(() => {
    async function getData() {

      const url = `${api.ProductionUrl}/production/GmtSewingReport/DailySewingEfficiencyReport` +
        `?fromDate=${fromDate}` +
        `&toDate=${toDate}` +
        `&floorIdsString=${floorIdsString}` +
        `&companyId=${companyId}`;


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
export default DailySewingEfficiencyReport;
