/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { SewingInputChallanReportType } from "./sewing-input-challan-report-type";

function SewingInputChallanReport() {
  const [data, setData] = useState<SewingInputChallanReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const sewingIssueNo = searchParams.get("sewingIssueNo") || "SI-00006137";


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/GmtSewingReport/SewingInputChallanReport?sewingIssueNo=${sewingIssueNo}`
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
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td>
              <div
                className="w-full"
                style={{ pageBreakInside: "avoid" }}
              >
                <Report data={data} reportName="Sewing Input Challan (Cutting Copy)" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div
                className="w-full"
                style={{ pageBreakInside: "avoid" }}
              >
                <Report data={data} reportName="Sewing Input Challan (Sewing Copy)" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div
                className="w-full"
                style={{ pageBreakInside: "avoid" }}
              >
                <Report data={data} reportName="Sewing Input Challan (Store Copy)" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </>
  );
}
export default SewingInputChallanReport;
