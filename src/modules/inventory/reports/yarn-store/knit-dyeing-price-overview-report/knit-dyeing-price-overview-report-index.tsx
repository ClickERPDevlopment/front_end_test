/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { IKnittingDyeingPriceOverviewReport } from "./knit-dyeing-price-overview-report-type";
import { ICompany } from "@/modules/garmentsProduction/reports/finishing/finish-fabric-return-cutting-floor-to-store-report/company-info-type";

function KnittingDyeingPriceOverviewReport() {
  const [company, setCompany] = useState<ICompany>();
  const [data, setData] = useState<IKnittingDyeingPriceOverviewReport[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const companyId = searchParams.get("companyId") ?? "0";
  const buyerId = searchParams.get("buyerId") ?? "0";
  const poId = searchParams.get("poId") ?? "0";
  const styleId = searchParams.get("styleId") ?? "0";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Knitting Dyeing Price Overview Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const res = await axios.get(
          `${api.ProductionUrl}/production/YarnStoreReport/KnittingDyeingQuantityPricePerKGOverviewReport`,
          {
            params: {
              companyId,
              buyerId,
              poId,
              styleId
            }
          }
        );

        if (res.data) {
          setCompany(res.data.company);
          setData(res.data.reportData);
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
        <Report company={company} data={data}></Report>
      </div>
    </>
  );
}
export default KnittingDyeingPriceOverviewReport;
