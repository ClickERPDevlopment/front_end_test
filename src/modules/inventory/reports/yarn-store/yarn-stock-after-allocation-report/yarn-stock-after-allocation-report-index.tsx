/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { LotWiseYarnStockReportType } from "./yarn-stock-after-allocation-report-type";

function YarnStockAfterAlloctionReport() {
  const [data, setData] = useState<LotWiseYarnStockReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const companyId = searchParams.get("companyId") || "0";
  const dtDate = searchParams.get("dtDate") || new Date().toISOString();
  const txtBBLCId = searchParams.get("txtBBLCId") || "0";
  const txtWOId = searchParams.get("txtWOId") || "0";
  const txtYarnBrandId = searchParams.get("txtYarnBrandId") || "0";
  const txtYarnLotId = searchParams.get("txtYarnLotId") || "0";
  const txtYarnNameId = searchParams.get("txtYarnNameId") || "0";
  const txtYarnCountId = searchParams.get("txtYarnCountId") || "0";
  const chOnlyWhiteLot = searchParams.get("chOnlyWhiteLot") == "True";
  const isYarnDyed = searchParams.get("isYarnDyed") == "True";
  const isNormalYarn = searchParams.get("isNormalYarn") == "True";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${api.ProductionUrl}/production/YarnStoreReport/LotWiseYarnStockReport`,
          {
            params: {
              companyId,
              dtDate,
              txtBBLCId,
              txtWOId,
              txtYarnBrandId,
              txtYarnLotId,
              txtYarnNameId,
              txtYarnCountId,
              chOnlyWhiteLot,
              isYarnDyed,
              isNormalYarn
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
        <Report data={data} searchParams={{ dtDate, chOnlyWhiteLot }}></Report>
      </div>
    </>
  );
}
export default YarnStockAfterAlloctionReport;
;
