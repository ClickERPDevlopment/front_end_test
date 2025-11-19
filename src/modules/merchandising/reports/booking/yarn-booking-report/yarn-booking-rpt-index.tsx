import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAppClient from "@/hooks/use-AppClient";
import { YarnBookingReportDto } from "./yb-rpt-type";
import YarnBookingReport_AG from "./ag-client/yarn-booking-rpt";
import YarnBookingReport from "./others-clients/yarn-booking-rpt";
import useApiUrl from "@/hooks/use-ApiUrl";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";

export default function YarnBookingReportIndex() {
  const [data, setData] = useState<YarnBookingReportDto>();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const appClient = useAppClient();

  const api = useApiUrl();

  let buyerId: string | null = "";
  let poId: string | null = "";
  let poNo: string | null = "";
  let styleId: string | null = "";

  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("poId")) {
    poId = searchParams.get("poId");
  }
  if (searchParams.get("poNo")) {
    poNo = searchParams.get("poNo");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }

  // console.log("buyerId: ", buyerId);
  // console.log("poId: ", poId);
  // console.log("poNo: ", poNo);
  // console.log("styleId: ", styleId);

  useEffect(() => {
    document.title = "Yarn consumption";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/Booking/YarnBookingReport?buyerId=${buyerId}&poId=${poId}&poNo=${poNo}&styleId=${styleId}`
          )
          .then((res) => {
            if (res.data) {
              const result = res.data;
              setData(result);
            } else {
              console.log(res);
            }
          })
          .catch((m) => console.log("error ", m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, [api.ProductionUrl, buyerId, poId, poNo, styleId]);
  return (
    <div className="w-full flex justify-center">
      {isLoading ? (
        <div className="flex justify-center">
          <ReportSkeleton />
        </div>
      ) :
        appClient.currentClient == appClient.AG ? (
          <YarnBookingReport_AG data={data!} />
        ) : (<YarnBookingReport data={data!} />)}
    </div>
  );
}
