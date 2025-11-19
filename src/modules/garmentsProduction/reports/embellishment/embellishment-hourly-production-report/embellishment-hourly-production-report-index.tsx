/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { EmbellishmentHourlyProductionReportType } from "./embellishment-hourly-production-report-type";
import Report from "./components/report";

function EmbellishmentHourlyProductionReport() {
  const [data, setData] = useState<EmbellishmentHourlyProductionReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const dtDate = searchParams.get("dtDate") || "15-Sep-25";
  const workStationId = searchParams.get("workStationId") || "0";
  const embTypeId = searchParams.get("embTypeId") || "0";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {

      const url = `${api.ProductionUrl}/production/EmbReport/EmbellishmentHourlyProductionReport`;

      try {
        setIsLoading(true);
        await axios
          .get(url, { params: { dtDate, workStationId, embTypeId } })
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
      <div className="min-w-[70%] w-fit ms-auto me-auto">
        <Report data={data} />
      </div>
    </>
  );
}

export default EmbellishmentHourlyProductionReport;
