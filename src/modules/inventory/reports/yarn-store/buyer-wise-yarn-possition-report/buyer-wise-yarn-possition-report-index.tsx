import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import BuyerWiseYarnPossitionReportReport from "./buyer-wise-yarn-possition-report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import axios from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import { IBuyerWiseYarnPossitionReport } from "./buyer-wise-yarn-possition-report-type";

export default function BuyerWiseYarnPossitionReportIndex() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<IBuyerWiseYarnPossitionReport[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const api = useApiUrl();

  let fromOpmDate: string | null = "";
  let toOpmDate: string | null = "";
  let buyerId: string | null = "";
  let styleId: string | null = "";
  let poId: string | null = "";
  let lcId: string | null = "";
  let isAllocation: string | null = "";
  let companyId: string | null = "";

  if (searchParams.get("fromOpmDate")) {
    fromOpmDate = searchParams.get("fromOpmDate");
  }
  if (searchParams.get("toOpmDate")) {
    toOpmDate = searchParams.get("toOpmDate");
  }
  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("lcId")) {
    lcId = searchParams.get("lcId");
  }
  if (searchParams.get("isAllocation")) {
    isAllocation = searchParams.get("isAllocation");
  }
  if (searchParams.get("companyId")) {
    companyId = searchParams.get("companyId");
  }

  useEffect(() => {
    document.title = "Yarn issue status.";

    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/BuyerWiseYarnPossitionReport?` +
            `fromOpmDate=${fromOpmDate}&` +
            `toOpmDate=${toOpmDate}&` +
            `buyerId=${buyerId}&` +
            `styleId=${styleId}&` +
            `poId=${poId}&` +
            `lcId=${lcId}&` +
            `isAllocation=${isAllocation}&` +
            `companyId=${companyId}`
          )
          .then((res) => {
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
      }
    }
    getData();
  }, [api.ProductionUrl, buyerId, companyId, fromOpmDate, isAllocation, lcId, poId, styleId, toOpmDate]);

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
    <BuyerWiseYarnPossitionReportReport data={data} />
  );

}
