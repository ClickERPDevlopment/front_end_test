/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { DateWiseYarnAllocationReportType } from "./date-wise-yarn-allocation-report-type";

function DateWiseYarnAllocationReport() {
  const [data, setData] = useState<DateWiseYarnAllocationReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const companyId = searchParams.get("companyId") ?? "0";
  const txtBBLCId = searchParams.get("txtBBLCId") ?? "0";
  const txtWOId = searchParams.get("txtWOId") ?? "0";
  const txtYarnLotId = searchParams.get("txtYarnLotId") ?? "0";
  const txtYarnId = searchParams.get("txtYarnId") ?? "0";
  const PO_IDs_for_knitting_bill = searchParams.get("PO_IDs_for_knitting_bill") ?? "";
  const txtStyleId = searchParams.get("txtStyleId") ?? "0";

  const dtFrom = searchParams.get("dtFrom");
  const dtTo = searchParams.get("dtTo");
  const isdtTo = searchParams.get("isdtTo") === "True";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const res = await axios.get(
          `${api.ProductionUrl}/production/YarnStoreReport/DateWiseYarnAllocationReport`,
          {
            params: {
              companyId,
              txtBBLCId,
              txtWOId,
              txtYarnLotId,
              txtYarnId,
              PO_IDs_for_knitting_bill,
              txtStyleId,
              dtFrom,
              dtTo,
              isdtTo
            }
          }
        );

        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
export default DateWiseYarnAllocationReport;
