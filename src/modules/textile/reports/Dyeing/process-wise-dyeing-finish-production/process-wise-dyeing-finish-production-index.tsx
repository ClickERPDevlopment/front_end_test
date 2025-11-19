/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { IProcessWiseDyeingFinishProductionReport } from "./process-wise-dyeing-finish-production-report-type";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";

function ProcessWiseDyeingFinishProductionReport() {
  const [data, setData] = useState<IProcessWiseDyeingFinishProductionReport[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let fromDate = "01-Sep-2024";
  let toDate = "01-Oct-2024";

  if (searchParams.get("fromDate")) {
    fromDate = String(searchParams.get("fromDate"));
  }
  if (searchParams.get("toDate")) {
    toDate = String(searchParams.get("toDate"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Process Wise Dyeing Finish Production Report";
  }, []);

  // `${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport?dtFrom=${fromDate}&dtTo=${toDate}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}`

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            //`${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport`
            `${api.ProductionUrl}/production/DyeingReport/ProcessWiseDyeingFinishProductionReport?fromDate=${fromDate}&toDate=${toDate}`
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

  console.log(data);

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
      <div>
        <Report data={data} searchParams={{ toDate, fromDate }}></Report>
      </div>
    </>
  );
}
export default ProcessWiseDyeingFinishProductionReport;
