/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import {
  OutSideYIssueGRcv_YarnIssue,
  OutSideYIssueGRcv_GreyRcv,
  OutSideYIssueGRcv_GreyRcv_LoseYarnRcv,
} from "./Service/outside-yissue-grcv-service";
import Table from "./components/1table";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import {
  outsideYIssueGRcvStatus_GreyRcv,
  outsideYIssueGRcvStatus_LoseyarnRcv,
  outsideYIssueGRcvStatus_YarnIssue,
} from "./components/outsideYIssueGRcvS-Interfaces";
import ReportHeaderSkeleton from "@/components/feedback-interaction/report-heading-skeleton";

export interface props {
  fromDate: string;
  toDate: string;
  isDateWise: string;
  buyerId: string;
  styleId: string;
  poId: string;
  partyId: string;
  yarnChallan: string;
  isBalanceZeroNotShow: string;
  isCHDateWiseView: string;
  styleIds: string;
  poIds: string;
}

export default function Report({
  fromDate,
  toDate,
  isDateWise,
  buyerId,
  styleId,
  poId,
  partyId,
  yarnChallan,
  isBalanceZeroNotShow,
  isCHDateWiseView,
  styleIds,
  poIds,
}: props) {
  const [yarnSendData, setYarnSendData] = useState<
    outsideYIssueGRcvStatus_YarnIssue[]
  >([]);
  const [greyRcvData, setGreyRcvData] = useState<
    outsideYIssueGRcvStatus_GreyRcv[]
  >([]);
  const [lyarnRcvData, setLYarnRcvData] = useState<
    outsideYIssueGRcvStatus_LoseyarnRcv[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Outside yarn issue and grey receive status";

    async function getData() {
      try {
        setIsLoading(true);

        await OutSideYIssueGRcv_YarnIssue({
          fromDate,
          toDate,
          isDateWise,
          buyerId,
          styleId,
          poId,
          partyId,
          yarnChallan,
          isBalanceZeroNotShow,
          isCHDateWiseView,
          styleIds,
          poIds,
        }).then((r) => setYarnSendData(r));

        await OutSideYIssueGRcv_GreyRcv({
          fromDate,
          toDate,
          isDateWise,
          buyerId,
          styleId,
          poId,
          partyId,
          yarnChallan,
          isBalanceZeroNotShow,
          isCHDateWiseView,
          styleIds,
          poIds,
        }).then((r) => setGreyRcvData(r));

        await OutSideYIssueGRcv_GreyRcv_LoseYarnRcv({
          fromDate,
          toDate,
          isDateWise,
          buyerId,
          styleId,
          poId,
          partyId,
          yarnChallan,
          isBalanceZeroNotShow,
          isCHDateWiseView,
          styleIds,
          poIds,
        }).then((r) => setLYarnRcvData(r));

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.log(error.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="m-3 inline-block print:overflow-visible">
        {/* heading */}
        <div className="">
          <h3 className="text-center text-slate-700 my-1 font-bold text-xl w-full">
            {isLoading ? (
              <ReportHeaderSkeleton />
            ) : (
              yarnSendData[0]?.COMPANY_NAME
            )}
          </h3>
          <h3 className="text-center text-slate-700 m-0 font-normal text-sm">
            {isLoading ? (
              <ReportHeaderSkeleton />
            ) : (
              yarnSendData[0]?.COMPANY_ADDRESS
            )}
          </h3>
          <div className="text-center text-slate-700 my-1 font-bold">
            {isLoading ? (
              <ReportHeaderSkeleton />
            ) : (
              <span className="bg-slate-200 px-10 py-1 text-base">
                OUT SIDE YARN SEND & FABRIC RECEIVE STATEMENT
              </span>
            )}
          </div>
        </div>
        {/* end heading */}

        {/* table */}
        <div className="min-w-[100%] mt-8 flex justify-center">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <Table
              yarnIssue={yarnSendData}
              greyRcv={greyRcvData}
              loseYanRcv={lyarnRcvData}
            />
          )}
        </div>
        {/* end table */}
      </div>
    </>
  );
}
