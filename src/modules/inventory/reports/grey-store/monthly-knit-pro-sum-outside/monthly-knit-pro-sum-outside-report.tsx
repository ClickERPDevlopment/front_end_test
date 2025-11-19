import { useEffect, useState } from "react";
import Report from "./component/report";
import axios from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "react-router";
import { MonthlyKnitProSummOutsideType } from "./component/monthly-knit-pro-sum-outside-type";

export default function MonthlyKnitProSumOutsideReport() {
  const api = useApiUrl();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MonthlyKnitProSummOutsideType[]>([]);

  let fromDate: string | null = "";
  let toDate: string | null = "";
  let partyId: string | null = "";

  if (searchParams.get("fromDate")) {
    fromDate = searchParams.get("fromDate");
  }
  if (searchParams.get("toDate")) {
    toDate = searchParams.get("toDate");
  }
  if (searchParams.get("partyId")) {
    partyId = searchParams.get("partyId");
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await axios
        .get(
          api.ProductionUrl +
          `/production/GreyStoreReport/MonthlyKnittingProductionSummaryOutside?fromDate=${fromDate}&toDate=${toDate}&partyId=${partyId}`
        )
        .then((res) => setData(res.data))
        .catch((error) => console.log(error));
      setIsLoading(false);
    };
    getData();
  }, [api.ProductionUrl, fromDate, partyId, toDate]);

  return (
    <>
      {isLoading ? (
        <>
          <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </>
      ) : (
        <Report data={data} />
      )}
    </>
  );
}
