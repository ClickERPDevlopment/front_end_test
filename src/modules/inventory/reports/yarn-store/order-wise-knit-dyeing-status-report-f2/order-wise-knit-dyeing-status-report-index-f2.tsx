import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { OrderWiseKnttingDeyingStatusReportTypeF2 } from "./order-wise-knit-dyeing-status-report-type-f2";
import OrderWiseKnittingDyeingStatusReportF2 from "./order-wise-knit-dyeing-status-report-f2";

export default function OrderWiseKnittingDyeingStatusReportIndexF2() {
  const [data, setData] = useState<OrderWiseKnttingDeyingStatusReportTypeF2[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let COMPANY_LIST = '';
  let BUYER_LIST = '';
  let PO_LIST = '';
  let dtopmfromChecked = '';
  let dtopmfrom = '';
  let dtopmto = '';
  let isDtBookingDateFrom = '';
  let dtBookingDateFrom = '';
  let dtBookingDateTo = '';


  if (searchParams.get("COMPANY_LIST")) {
    COMPANY_LIST = String(searchParams.get("COMPANY_LIST"));
  }

  if (searchParams.get("BUYER_LIST")) {
    BUYER_LIST = String(searchParams.get("BUYER_LIST"));
  }

  if (searchParams.get("PO_LIST")) {
    PO_LIST = String(searchParams.get("PO_LIST"));
  }

  if (searchParams.get("dtopmfromChecked")) {
    dtopmfromChecked = String(searchParams.get("dtopmfromChecked"));
  }


  if (searchParams.get("dtopmfrom")) {
    dtopmfrom = String(searchParams.get("dtopmfrom"));
  }
  if (searchParams.get("dtopmto")) {
    dtopmto = String(searchParams.get("dtopmto"));
  }
  if (searchParams.get("isDtBookingDateFrom")) {
    isDtBookingDateFrom = String(searchParams.get("isDtBookingDateFrom"));
  }
  if (searchParams.get("dtBookingDateFrom")) {
    dtBookingDateFrom = String(searchParams.get("dtBookingDateFrom"));
  }
  if (searchParams.get("dtBookingDateTo")) {
    dtBookingDateTo = String(searchParams.get("dtBookingDateTo"));
  }




  const api = useApiUrl();

  useEffect(() => {
    document.title = "Order wise knitting and dyeing report";
    // document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/OrderWiseKnittingDyeingStatusReport-f2?COMPANY_LIST=${COMPANY_LIST}&` +
            `BUYER_LIST=${BUYER_LIST}&` +
            `PO_LIST=${PO_LIST}&` +
            `dtopmfromChecked=${dtopmfromChecked}&` +
            `dtopmfrom=${dtopmfrom}&` +
            `dtopmto=${dtopmto}&` +
            `isDtBookingDateFrom=${isDtBookingDateFrom}&` +
            `dtBookingDateFrom=${dtBookingDateFrom}&` +
            `dtBookingDateTo=${dtBookingDateTo}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log(res.data);
              setData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
        //console.log(error.message);
      }
    }
    getData();
  }, [BUYER_LIST, COMPANY_LIST, PO_LIST, api.ProductionUrl, dtBookingDateFrom, dtBookingDateTo, dtopmfrom, dtopmfromChecked, dtopmto, isDtBookingDateFrom]);

  return isLoading ? (
    <>
      <div className="container">
        <ReportSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="p-5">
        <OrderWiseKnittingDyeingStatusReportF2 data={data} />
      </div>
    </>
  );
}
