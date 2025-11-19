/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import { IStyleChangeOver } from "./style-change-over-type";
import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";

function StyleChangeOverReport() {
  const [data, setData] = useState<IStyleChangeOver[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let buyerId = 0;
  let styleId = 0;
  let floorId = 0;
  let lineId = 0;
  let companyId = 1;
  let fromDate = "01-Jun-0001";
  let toDate = "06-Oct-2025";

  if (searchParams.get("buyerId")) {
    buyerId = Number(searchParams.get("buyerId"));
  }
  if (searchParams.get("styleId")) {
    styleId = Number(searchParams.get("styleId"));
  }
  if (searchParams.get("floorId")) {
    floorId = Number(searchParams.get("floorId"));
  }
  if (searchParams.get("lineId")) {
    lineId = Number(searchParams.get("lineId"));
  }
  if (searchParams.get("companyId")) {
    companyId = Number(searchParams.get("companyId"));
  }
  if (searchParams.get("fromDate")) {
    fromDate = String(searchParams.get("fromDate"));
  }
  if (searchParams.get("toDate")) {
    toDate = String(searchParams.get("toDate"));
  }

  const api = useApiUrl();

  console.log("dd", data);

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/IEReport/StyleChangeOverReport?buyerId=${buyerId}&styleId=${styleId}&floorId=${floorId}&lineId=${lineId}&fromDate=${fromDate}&toDate=${toDate}&companyId=${companyId}`
          )
          .then((res) => {
            console.log(res);
            if (res.data) {
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

  //console.log(data);

  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="w-fit ms-auto me-auto min-w-[70%]">
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default StyleChangeOverReport;
