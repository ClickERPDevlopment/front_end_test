import axios from "axios";
import React, { Suspense } from "react";
import { useSearchParams } from "react-router";
import useApiUrl from "@/hooks/use-ApiUrl";
import { PartyWiseYanrIssueAndGreyRcvSummaryType } from "./partyw-yarni-greyr-balance-sum-rpt-type";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
const PartyWiseYanrIssueAndGreyRcvSumReport = React.lazy(
  () => import("./partyw-yarni-greyr-balance-sum-rpt")
);

type queryParamsType = {
  companyId: string | null;
  partyId: string | null;
  isOpmWise: string | null;
  dtOpmFrom: string | null;
  dtOpmTo: string | null;
  isIissueWise: string | null;
  dtIssueFrom: string | null;
  dtIssueTo: string | null;
  isShowOnlyBalanceAvailable: string | null;
};

export default function PartyWiseYanrIssueAndGreyRcvSummaryIndex() {
  const [data, setData] = React.useState<
    PartyWiseYanrIssueAndGreyRcvSummaryType[]
  >([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);

  const qParams: queryParamsType = {
    companyId: searchParams.get("companyId"),
    partyId: searchParams.get("partyId"),
    isOpmWise: searchParams.get("isOpmWise"),
    dtOpmFrom: searchParams.get("dtOpmFrom"),
    dtOpmTo: searchParams.get("dtOpmTo"),
    isIissueWise: searchParams.get("isIissueWise"),
    dtIssueFrom: searchParams.get("dtIssueFrom"),
    dtIssueTo: searchParams.get("dtIssueTo"),
    isShowOnlyBalanceAvailable: searchParams.get("isShowOnlyBalanceAvailable"),
  };

  const api = useApiUrl();

  React.useEffect(() => {
    document.title = "Party-Wise Yanr Issue And Grey Rcv Summary";
  }, []);

  React.useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/PartyWiseYanrIssueAndGreyRcvSummary` +
            `?companyId=${qParams.companyId}` +
            `&partyId=${qParams.partyId}` +
            `&isDtopmfrom=${qParams.isOpmWise}` +
            `&dtopmfrom=${qParams.dtOpmFrom}` +
            `&dtopmto=${qParams.dtOpmTo}` +
            `&isDtissuefrom=${qParams.isIissueWise}` +
            `&dtissuefrom=${qParams.dtIssueFrom}` +
            `&dtissueto=${qParams.dtIssueTo}` +
            `&isShowOnlyBalanceAvailable=${qParams.isShowOnlyBalanceAvailable}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log(res.data);
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
  }, [
    api.ProductionUrl,
    qParams.companyId,
    qParams.dtIssueFrom,
    qParams.dtIssueTo,
    qParams.dtOpmFrom,
    qParams.dtOpmTo,
    qParams.isIissueWise,
    qParams.isOpmWise,
    qParams.isShowOnlyBalanceAvailable,
    qParams.partyId,
  ]);

  return isLoading ? (
    <>
      <div className="container">
        <ReportSkeleton />
      </div>
    </>
  ) : (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <PartyWiseYanrIssueAndGreyRcvSumReport data={data} />
        </Suspense>
      </div>
    </>
  );
}
