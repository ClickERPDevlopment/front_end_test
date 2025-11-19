import { Suspense, useEffect } from "react";
import { useSearchParams } from "react-router";

import Loader from "@/components/feedback-interaction/loader";
import Report from "./report-oygs";

export default function OutSideYIssueGrcvStatusReport() {
  const [searchParams] = useSearchParams();

  let fromDate: string | null = "";
  let toDate: string | null = "";
  let isDateWise: string | null = "";
  let buyerId: string | null = "";
  let styleId: string | null = "";
  let poId: string | null = "";
  let partyId: string | null = "";
  let yarnChallan: string | null = "";
  let isBalanceZeroNotShow: string | null = "";
  let isCHDateWiseView: string | null = "";
  let styleIds: string | null = "";
  let poIds: string | null = "";

  if (searchParams.get("fromDate")) {
    fromDate = searchParams.get("fromDate");
  }
  if (searchParams.get("toDate")) {
    toDate = searchParams.get("toDate");
  }
  if (searchParams.get("isDateWise")) {
    isDateWise = searchParams.get("isDateWise");
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
  if (searchParams.get("partyId")) {
    partyId = searchParams.get("partyId");
  }
  if (searchParams.get("yarnChallan")) {
    yarnChallan = searchParams.get("yarnChallan");
  }
  if (searchParams.get("isBalanceZeroNotShow")) {
    isBalanceZeroNotShow = searchParams.get("isBalanceZeroNotShow");
  }
  if (searchParams.get("isCHDateWiseView")) {
    isCHDateWiseView = searchParams.get("isCHDateWiseView");
  }
  if (searchParams.get("styleIds")) {
    styleIds = searchParams.get("styleIds");
  }
  if (searchParams.get("poIds")) {
    poIds = searchParams.get("poIds");
  }

  // console.log("fromDate: ", fromDate);
  // console.log("toDate: ", toDate);
  // console.log("isDateWise: ", isDateWise);
  // console.log("buyerId: ", buyerId);
  console.log("styleId: ", styleId);
  // console.log("poId: ", poId);
  // console.log("partyId: ", partyId);
  // console.log("yarnChallan: ", yarnChallan);
  // console.log("isBalanceZeroNotShow: ", isBalanceZeroNotShow);

  useEffect(() => {
    document.title = "Outside yarn issue and grey receive status";
  }, []);

  // console.log(masterData);

  return (
    <Suspense fallback={<Loader />}>
      <Report
        fromDate={fromDate!}
        toDate={toDate!}
        isDateWise={isDateWise!}
        buyerId={buyerId!}
        styleId={styleId!}
        poId={poId!}
        partyId={partyId!}
        yarnChallan={yarnChallan!}
        isBalanceZeroNotShow={isBalanceZeroNotShow!}
        isCHDateWiseView={isCHDateWiseView!}
        styleIds={styleIds!}
        poIds={poIds!}
      />
    </Suspense>
  );
}
