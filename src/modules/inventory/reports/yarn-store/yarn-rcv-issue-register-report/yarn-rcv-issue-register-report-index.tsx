/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { YarnRcvIssueRegisterReportType } from "./yarn-rcv-issue-register-report-index-type";

function YarnRcvIssueRegisterReport() {
  const [data, setData] = useState<YarnRcvIssueRegisterReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const companyId = searchParams.get("companyId") || 0;
  const dtFrom = searchParams.get("dtFrom") || "";
  const dtTo = searchParams.get("dtTo") || "";
  const txtBBLCId = searchParams.get("txtBBLCId") || 0;
  const txtWOId = searchParams.get("txtWOId") || 0;
  const txtYarnLotId = searchParams.get("txtYarnLotId") || 0;
  const txtKnittingHouseId = searchParams.get("txtKnittingHouseId") || 0;
  const txtYarnId = searchParams.get("txtYarnId") || 0;
  const cmbTransection = searchParams.get("cmbTransection") || "";
  const isExcel = searchParams.get("isExcel") === "True";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const queryParams = new URLSearchParams({
          companyId: String(companyId),
          dtFrom,
          dtTo,
          txtBBLCId: String(txtBBLCId),
          txtWOId: String(txtWOId),
          txtYarnLotId: String(txtYarnLotId),
          txtKnittingHouseId: String(txtKnittingHouseId),
          txtYarnId: String(txtYarnId),
          cmbTransection,
          isExcel: String(isExcel),
        });

        const url = `${api.ProductionUrl}/production/YarnStoreReport/YarnRcvIssueRegisterReport?${queryParams.toString()}`;

        const res = await axios.get(url);
        if (res.data) {
          setData(res.data);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    getData();
  }, []);

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
    <>
      <div>
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default YarnRcvIssueRegisterReport;
