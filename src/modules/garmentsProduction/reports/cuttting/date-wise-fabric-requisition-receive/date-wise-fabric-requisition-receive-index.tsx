import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IDateWiseFabricRequisitionReceive } from "./date-wise-fabric-requisition-receive-type";

function DateWiseFabricRequisitionReceiveReport() {
  const [data, setData] = useState<IDateWiseFabricRequisitionReceive[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let buyerId = 0;
  let styleId = 0;
  let poId = 0;
  let fromDate = "01-Jun-2022";
  let toDate = "06-Oct-2030";

  if (searchParams.get("buyerId")) {
    buyerId = Number(searchParams.get("buyerId"));
  }
  if (searchParams.get("styleId")) {
    styleId = Number(searchParams.get("styleId"));
  }
  if (searchParams.get("poId")) {
    poId = Number(searchParams.get("poId"));
  }
  if (searchParams.get("fromDate")) {
    fromDate = String(searchParams.get("fromDate"));
  }
  if (searchParams.get("toDate")) {
    toDate = String(searchParams.get("toDate"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Date Wise Fabric Requisition Receive Report";
  }, []);

  // `${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport?dtFrom=${fromDate}&dtTo=${toDate}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}`

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            //`${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport`
            `${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport?dtFrom=${fromDate}&dtTo=${toDate}&buyerId=${buyerId}&styleId=${styleId}&poId=${poId}`
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
export default DateWiseFabricRequisitionReceiveReport;
