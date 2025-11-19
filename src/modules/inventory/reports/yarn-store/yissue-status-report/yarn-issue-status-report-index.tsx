import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import YarnIssueStatusReport from "./yarn-issue-status-report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import axios from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import { YarnIssueStatusReportType } from "./yarn-issue-status-report-type";
import { ICompany } from "@/modules/garmentsProduction/reports/finishing/finish-fabric-return-cutting-floor-to-store-report/company-info-type";

export default function YarnIssueStatusReportIndex() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<YarnIssueStatusReportType[]>(
    []
  );
  const [company, setCompany] = useState<ICompany>();
  const [isLoading, setIsLoading] = useState(false);
  const api = useApiUrl();

  let fromDate: string | undefined = "";
  let toDate: string | undefined = "";
  let buyerId: string | undefined = "";
  let styleId: string | undefined = "";
  let poId: string | undefined = "";
  let knittingHouseId: string | undefined = "";
  let companyId: string | undefined = "";

  fromDate = searchParams.get("fromDate") ?? undefined;

  toDate = searchParams.get("toDate") ?? undefined;

  buyerId = searchParams.get("buyerId") ?? undefined;

  styleId = searchParams.get("styleId") ?? undefined;

  poId = searchParams.get("poId") ?? undefined;

  knittingHouseId = searchParams.get("knittingHouseId") ?? undefined;

  companyId = searchParams.get("companyId") ?? undefined;

  useEffect(() => {
    document.title = "Yarn issue status.";

    async function getData() {
      try {
        setIsLoading(true);
        // Ensure all parameters are treated as strings for the URL,
        // even if they are undefined, to avoid issues with `null` in URL.
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/YarnIssueStatusReport?` +
            `fromDate=${fromDate}&` +
            `toDate=${toDate}&` +
            `buyerId=${buyerId}&` +
            `poId=${poId}&` +
            `styleId=${styleId}&` +
            `knittingHouseId=${knittingHouseId}&` +
            `companyId=${companyId}`
          )
          .then((res) => {
            if (res.data) {
              setCompany(res.data.company);
              setData(res.data.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, [api.ProductionUrl, buyerId, companyId, fromDate, knittingHouseId, poId, styleId, toDate]);

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
    <YarnIssueStatusReport company={company} data={data} fromDate={fromDate} toDate={toDate} />
  );

}
