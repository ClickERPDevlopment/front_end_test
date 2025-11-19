import useApiUrl from "@/hooks/use-ApiUrl";

import { useSearchParams } from "react-router";
import axios from "axios";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import DyeingBillChallanWiseSummaryReport from "./dyeing-bill-challan-wise-summary-report";
import { DyeingBillChallanWiseSummaryType } from "./dyeing-bill-challan-wise-summary-type";
import React from "react";

export default function DyeingBillChallanWiseSummaryIndex() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState<DyeingBillChallanWiseSummaryType[]>();
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
      setIsLoading(true);
      const res = await axios.get(
        `${api.ProductionUrl}/production/FinishFabricStore/DyeingBillChallanWiseSummaryReport?poId=${poId}&styleId=${styleId}`
      );
      setData(res.data);
      setIsLoading(false);
    };
    getData();
  }, [api.ProductionUrl, poId, styleId]);

  return (
    <>
      {isLoading ? (
        <>
          <ReportSkeleton />
        </>
      ) : data ? (
        <DyeingBillChallanWiseSummaryReport data={data!} />
      ) : null}
    </>
  );
}
