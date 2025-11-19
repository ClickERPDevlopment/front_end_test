/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { CompensationReportType } from "./compensation-report-type";

function CompensationReport() {
  const [data, setData] = useState<CompensationReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate") || "01-Jan-23";
  const toDate = searchParams.get("toDate") || "01-Jan-26";
  const fromOrderPlacementDate = searchParams.get("fromOrderPlacementDate") || "01-Jan-23";
  const toOrderPlacementDate = searchParams.get("toOrderPlacementDate") || "01-Jan-26";
  const dtChecked = searchParams.get("dtChecked") == "True" ? true : false;
  const dtOrderPlacementChecked = searchParams.get("dtOrderPlacementChecked") == "True" ? true : false;
  const buyerId = searchParams.get("buyerId") || "0";
  const itemId = searchParams.get("itemId") || "0";
  const styleId = searchParams.get("styleId") || "0";
  const companyId = searchParams.get("companyId") || "0";
  const supplierId = searchParams.get("supplierId") || "0";


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  const searchParamsObj = {
    fromDate,
    toDate,
    companyId: Number(companyId)
  }

  useEffect(() => {
    async function getData() {

      const url = `${api.ProductionUrl}/production/GmtFinishingReport/CompensationReport` +
        `?fromDate=${fromDate}` +
        `&toDate=${toDate}` +
        `&fromOrderPlacementDate=${fromOrderPlacementDate}` +
        `&toOrderPlacementDate=${toOrderPlacementDate}` +
        `&dtChecked=${dtChecked}` +
        `&dtOrderPlacementChecked=${dtOrderPlacementChecked}` +
        `&buyerId=${buyerId}` +
        `&itemId=${itemId}` +
        `&styleId=${styleId}` +
        `&companyId=${companyId}` +
        `&supplierId=${supplierId}`;


      try {
        setIsLoading(true);
        await axios
          .get(url)
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
        <Report data={data} searchParamsObj={searchParamsObj}></Report>
      </div>
    </>
  );
}
export default CompensationReport;
