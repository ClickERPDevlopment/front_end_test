/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { LotWiseYarnStockReportType } from "./lot-wise-yarn-stock-report-type";

function LotWiseYarnStockReport() {
  const [data, setData] = useState<LotWiseYarnStockReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let companyId = searchParams.get("companyId") || "0";
  let dtDate = searchParams.get("dtDate") || new Date().toISOString();
  let txtBBLCId = searchParams.get("txtBBLCId") || "0";
  let txtWOId = searchParams.get("txtWOId") || "0";
  let txtYarnBrandId = searchParams.get("txtYarnBrandId") || "0";
  let txtYarnLotId = searchParams.get("txtYarnLotId") || "0";
  let txtYarnNameId = searchParams.get("txtYarnNameId") || "0";
  let txtYarnCountId = searchParams.get("txtYarnCountId") || "0";
  let chOnlyWhiteLot = searchParams.get("chOnlyWhiteLot") == "True";
  let isYarnDyed = searchParams.get("isYarnDyed") == "True";
  let isNormalYarn = searchParams.get("isNormalYarn") == "True";

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
export default LotWiseYarnStockReport;
