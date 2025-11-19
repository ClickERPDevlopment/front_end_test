import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import POwiseFabricAndAccessoriesStatusReportGenerate from "./components/po-wise-f-a-s-report";
import {
  PoWiseFabricAccessoriesStautsReportDto,
  SearchData,
} from "./po-wise-f-a-s-type";

export default function POwiseFabricAndAccessoriesStatusReport() {
  const [data, setData] = useState<PoWiseFabricAccessoriesStautsReportDto>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  //
  const searchData: SearchData = {
    dtPlacementFrom: "",
    dtPlacementTo: "",
    buyerId: "",
    styleId: "",
    poId: "",
  };

  if (searchParams.get("dtPlacementFrom")) {
    searchData.dtPlacementFrom = searchParams.get("dtPlacementFrom");
  }
  if (searchParams.get("dtPlacementTo")) {
    searchData.dtPlacementTo = searchParams.get("dtPlacementTo");
  }
  if (searchParams.get("buyerId")) {
    searchData.buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("styleId")) {
    searchData.styleId = searchParams.get("styleId");
  }
  if (searchParams.get("poId")) {
    searchData.poId = searchParams.get("poId");
  }

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/PoWiseFabricAccessoriesStautsReport?dtPlacementFrom=${searchData.dtPlacementFrom}&dtPlacementTo=${searchData.dtPlacementTo}&buyerId=${searchData.buyerId}&styleId=${searchData.styleId}&poId=${searchData.poId}`
          )
          .then((res) => {
            setData(res.data);
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  //return <>{JSON.stringify(data)}</>;

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
      <POwiseFabricAndAccessoriesStatusReportGenerate
        searchData={searchData}
        data={data}
      />
    </>
  );
}
