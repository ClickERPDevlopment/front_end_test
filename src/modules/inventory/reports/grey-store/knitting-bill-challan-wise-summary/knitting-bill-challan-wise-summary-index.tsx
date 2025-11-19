import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";

import { useSearchParams } from "react-router";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import KnittingBillChallanWiseSummaryReport from "./knitting-bill-challan-wise-summary-report";
import { KnittingBillChallanWiseSummaryType } from "./knitting-bill-challan-wise-summary-type";
import React from "react";

export default function KnittingBillChallanWiseSummaryReportIndex() {
  const [isLoading] = React.useState(false);
  const [data, setData] =
    React.useState<KnittingBillChallanWiseSummaryType[]>();
  const api = useApiUrl();
  const [searchParams] = useSearchParams();

  let poId: string | null = "";
  let styleId: string | null = "";

  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }

  React.useEffect(() => {
    const getData = async () => {
      return (
        await axios.get(
          `${api.ProductionUrl}/production/GreyStoreReport/KnittingBillChallanWiseSummaryReport?poId=${poId}&styleId=${styleId}`
        )
      ).data;
    };
    getData().then((res) => setData(res));
  }, [api.ProductionUrl, poId, styleId]);

  return (
    <>
      {isLoading ? (
        <>
          <ReportSkeleton />
        </>
      ) : data ? (
        <KnittingBillChallanWiseSummaryReport data={data!} />
      ) : null}
    </>
  );
}
