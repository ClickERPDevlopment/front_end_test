import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import Skeleton from "react-loading-skeleton";

import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
// import { ReactQueryKey } from "@/utility/react-query-key";
// import { useToast } from "@/components/ui/use-toast";

import { GetReportData } from "./components/get-report-data";
import GeneralBlockFabricStatusReport from "./components/1general-block-f-status-rpt";
import { ReactQueryKey } from "@/utils/react-query-key";
import { toast } from "sonner";

export default function GeneralBlockFabricStatusReportIndex() {
  const [searchParams] = useSearchParams();
  // const { toast } = useToast();
  //
  const rptSearch: {
    buyerId: string | null;
    styleId: string | null;
    fabricId: string | null;
    woId: string | null;
    onlyBalanceQtyItemwillshow: string | null;
  } = {
    buyerId: "0",
    styleId: "0",
    fabricId: "0",
    woId: "0",
    onlyBalanceQtyItemwillshow: "True",
  };

  if (searchParams.get("buyerId")) {
    rptSearch.buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("styleId")) {
    rptSearch.styleId = searchParams.get("styleId");
  }
  if (searchParams.get("fabricId")) {
    rptSearch.fabricId = searchParams.get("fabricId");
  }
  if (searchParams.get("woId")) {
    rptSearch.woId = searchParams.get("woId");
  }
  if (searchParams.get("onlyBalanceQtyItemwillshow")) {
    rptSearch.onlyBalanceQtyItemwillshow = searchParams.get(
      "onlyBalanceQtyItemwillshow"
    );
  }

  const { data, error, isLoading, isLoadingError } = useQuery({
    queryKey: [
      ReactQueryKey.generalBlockFabricStatus,
      rptSearch.buyerId,
      rptSearch.styleId,
      rptSearch.fabricId,
      rptSearch.woId,
      rptSearch.onlyBalanceQtyItemwillshow,
    ],
    queryFn: GetReportData,
    staleTime: 5 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  if (isLoadingError) {
    console.log("err-log: ", error.message);
    toast(

      error.message,
    );
    return null;
  } else {
    console.log("data: ", data);
  }

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
      <GeneralBlockFabricStatusReport data={data} />
    </>
  );
}
