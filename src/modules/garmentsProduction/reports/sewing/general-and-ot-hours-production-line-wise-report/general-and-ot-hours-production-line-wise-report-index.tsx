import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { GeneralAndOTHoursProductionLineWiseReportType } from "./general-and-ot-hours-production-line-wise-report-type";

function GeneralAndOTHoursProductionLineWiseReport() {
  const [data, setData] = useState<GeneralAndOTHoursProductionLineWiseReportType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let floorId = 0;
  let companyId = 1;
  let dtFrom = "01-Dec-2020";
  let dtTo = "30-Dec-2025";

  if (searchParams.get("floorId")) {
    floorId = Number(searchParams.get("floorId"));
  }
  if (searchParams.get("companyId")) {
    companyId = Number(searchParams.get("companyId"));
  }
  if (searchParams.get("dtFrom")) {
    dtFrom = String(searchParams.get("dtFrom"));
  }
  if (searchParams.get("dtTo")) {
    dtTo = String(searchParams.get("dtTo"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);


  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/GmtSewingReport/GeneralAndOTHoursProductionLineWiseReport?dtFrom=${dtFrom}&dtTo=${dtTo}&floorId=${floorId}&companyId=${companyId}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
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
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="min-w-[70%] w-fit ms-auto me-auto">
        <Report data={data} searchParams={{ dtTo, dtFrom }}></Report>
      </div>
    </>
  );
}
export default GeneralAndOTHoursProductionLineWiseReport;
