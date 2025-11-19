import useApiUrl from "@/hooks/use-ApiUrl";
import { useEffect, useState } from "react";
import axios from "axios";
// import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import DyeingBuyerWiseGreyStockReportDesign from "./dyeing-buyer-wise-grey-stock-report-design";
import { DyeingBuyerWiseGreyStockReportType } from "./dyeing-buyer-wise-grey-stock-report-type";
import React from "react";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";

export default function DyeingBuyerWiseGreyStockReport() {
  const api = useApiUrl();
  const [data, setData] =
    React.useState<DyeingBuyerWiseGreyStockReportType[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await axios.get<DyeingBuyerWiseGreyStockReportType[]>(
        `${api.ProductionUrl}/production/DyeingReport/GetBuyerWiseGreyStockReport`
      );

      console.log(res.data);
      setData(res.data);
      setIsLoading(false);
    };
    getData();
  }, [api.ProductionUrl]);
  //up
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        {isLoading ? (
          <ReportSkeleton />
        ) : (
          <DyeingBuyerWiseGreyStockReportDesign data={data!} />
        )}
      </div>
    </>
  );
}
