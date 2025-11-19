import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { IBatchWiseApprovalStatus } from "./batch-wise-approval-status-report-type";

function BatchWiseApprovalStatusReport() {
  const [data, setData] = useState<IBatchWiseApprovalStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let buyerId = 0;
  let styleId = 0;
  let batchId = 0;
  let fromDate = "01-Jun-0001";
  let toDate = "06-Oct-2025";
  let isApproved = "false";
  let isNotApproved = "false";

  if (searchParams.get("buyerId")) {
    buyerId = Number(searchParams.get("buyerId"));
  }
  if (searchParams.get("styleId")) {
    styleId = Number(searchParams.get("styleId"));
  }
  if (searchParams.get("batchId")) {
    batchId = Number(searchParams.get("batchId"));
  }
  if (searchParams.get("fromDate")) {
    fromDate = String(searchParams.get("fromDate"));
  }
  if (searchParams.get("toDate")) {
    toDate = String(searchParams.get("toDate"));
  }
  if (searchParams.get("isApproval")) {
    isApproved = String(searchParams.get("isApproval"));
  }
  if (searchParams.get("isNotApproval")) {
    isNotApproved = String(searchParams.get("isNotApproval"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Batch Wise Approval Status";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/DyeingReport/GetBatchWiseApproval?fromDate=${fromDate}&toDate=${toDate}&buyerId=${buyerId}&styleId=${styleId}&batchId=${batchId}&isApproved=${isApproved}&isNotApproved=${isNotApproved}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              setData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        // await axios
        //   .get(
        //     `${api.ProductionUrl}/production/accessorieswo/GetWorkOrderReport?id=${id}&currency=${currency}&cmbReportFormat=${cmbReportFormat}`
        //   )
        //   .then((res) => {
        //     //console.log(res);
        //     if (res.data) {
        //       setData(res.data);
        //     } else {
        //       //console.log(res);
        //     }
        //   })
        //   .catch((m) => console.log(m));

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
        <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div>
        <Report data={data}></Report>
      </div>
    </>
  );
}
export default BatchWiseApprovalStatusReport;
