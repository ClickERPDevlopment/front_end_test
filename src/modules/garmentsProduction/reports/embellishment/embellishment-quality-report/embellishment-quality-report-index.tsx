/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { PrintEmbellishmentQualityReportMasterType } from "./embellishment-quality-report-type";

function EmbellishmentQualityReport() {
  const [data, setData] = useState<PrintEmbellishmentQualityReportMasterType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const partyId = searchParams.get("partyId") || "0";
  const buyerId = searchParams.get("buyerId") || "0";
  const styleId = searchParams.get("styleId") || "0";
  const poId = searchParams.get("poId") || "0";
  const embType = searchParams.get("embType") || "0";
  const fromDate = searchParams.get("fromDate") || "01-Jan-22";
  const toDate = searchParams.get("toDate") || "01-Jan-26";
  // const companyId = searchParams.get("companyId") || "0";


  const searchParamObj = {
    fromDate, toDate
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Print Embellishment Quality Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/PrintEmbQuality/Report`, {
            params: {
              partyId,
              buyerId,
              styleId,
              poId,
              embType,
              fromDate,
              toDate
            }
          }
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
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
        <Report data={data} searchParamObj={searchParamObj}></Report>
      </div>
    </>
  );
}
export default EmbellishmentQualityReport;
