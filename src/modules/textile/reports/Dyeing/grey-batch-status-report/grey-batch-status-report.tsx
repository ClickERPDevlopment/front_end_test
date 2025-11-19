/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import {
  GreyBatchStatus_BatchDetails,
  GreyBatchStatus_GreyRcvDetails,
} from "./data-service/grey-batch-status-service";
import Report from "./report-gbsr";
// import ReportSkeleton from "../../../../components/report-skeleton";
import {
  GreyBatchStatusReportBatchDetailsDto,
  GreyBatchStatusReportGreyRcvDtlsDto,
  GreyBatchStatusReportGreyRcvSummaryDto,
} from "./components/Interfaces";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";

export default function GreyBatchStatusReport() {
  const [msg, setMsg] = useState<any>();

  const [greyRcvSummary, setGreyRcvSummary] = useState<
    GreyBatchStatusReportGreyRcvSummaryDto[]
  >([]);

  const [bookingSummary, setBookingSummary] = useState<
    GreyBatchStatusReportGreyRcvSummaryDto[]
  >([]);

  const [greyRcvDtls, setGreyRcv] = useState<
    GreyBatchStatusReportGreyRcvDtlsDto[]
  >([]);
  const [batchDtls, setBatchDtls] = useState<
    GreyBatchStatusReportBatchDetailsDto[]
  >([]);

  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  let fromDate: string | null = "";
  let toDate: string | null = "";
  let isDateWise: string | null = "";
  let buyerId: string | null = "";
  let styleId: string | null = "";
  let colorId: string | null = "";
  let seasonId: string | null = "";
  let poId: string | null = "";
  let partyId: string | null = "";
  let isBalanceZeroNotShow: string | null = "";
  let isGreyStock: string | null = "false";
  let isReprocessStock: string | null = "false";

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
  if (searchParams.get("colorId")) {
    colorId = searchParams.get("colorId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("partyId")) {
    partyId = searchParams.get("partyId");
  }
  if (searchParams.get("isBalanceZeroNotShow")) {
    isBalanceZeroNotShow = searchParams.get("isBalanceZeroNotShow");
  }
  if (searchParams.get("seasonId")) {
    seasonId = searchParams.get("seasonId");
  }

  if (searchParams.get("isGreyStock")) {
    isGreyStock = searchParams.get("isGreyStock");
  }
  if (searchParams.get("isReprocessStock")) {
    isReprocessStock = searchParams.get("isReprocessStock");
  }

  // console.log("fromDate: ", fromDate);
  // console.log("toDate: ", toDate);
  // console.log("isDateWise: ", isDateWise);
  // console.log("buyerId: ", buyerId);
  // console.log("styleId: ", styleId);
  // console.log("poId: ", poId);
  // console.log("partyId: ", partyId);
  // console.log("isBalanceZeroNotShow: ", isBalanceZeroNotShow);
  // console.log("seasonId: ", seasonId);

  useEffect(() => {
    document.title = "Grey batch status";
    try {
      async function getData() {
        try {
          setIsLoading(true);

          await GreyBatchStatus_GreyRcvDetails({
            fromDate,
            toDate,
            isDateWise,
            buyerId,
            styleId,
            poId,
            partyId,
            isBalanceZeroNotShow,
            seasonId,
            colorId,
            isGreyStock,
            isReprocessStock,
          }).then((r) => {
            setGreyRcv(r.details);
            setBookingSummary(r.bookingSummary);
            setGreyRcvSummary(r.greyRcvSummary);
          });

          await GreyBatchStatus_BatchDetails({
            fromDate,
            toDate,
            isDateWise,
            buyerId,
            styleId,
            poId,
            partyId,
            isBalanceZeroNotShow,
            seasonId,
            colorId,
            isGreyStock,
            isReprocessStock,
          }).then((r) => setBatchDtls(r));

          setIsLoading(false);
        } catch (error: any) {
          setIsLoading(false);
          console.log(error.message);
        }
      }
      getData();
    } catch (error) {
      setMsg(error);
      console.log("error loggg:", error);
    }
  }, [
    buyerId,
    colorId,
    fromDate,
    isBalanceZeroNotShow,
    isDateWise,
    isGreyStock,
    isReprocessStock,
    partyId,
    poId,
    seasonId,
    styleId,
    toDate,
  ]);

  /*
    0.Report
    1. po-color wise group
    2. summary table
    2.1. fabric wise group row
    3. Details
    4. Batch Details
  */

  return (
    <>
      {isLoading ? (
        <ReportSkeleton />
      ) : (
        <>
          <p>
            <em> {msg} </em>
          </p>
          <Report
            lstBookingSummary={bookingSummary}
            lstGreyRcvSummary={greyRcvSummary}
            greyRcvDtls={greyRcvDtls!}
            batchDtls={batchDtls!}
          />
        </>
      )}
    </>
  );
}
