/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { EmbellishmentDeliveryReportType } from "./embellishment-delivery-report-type";
import EmbellishmentDeliveryChallanReportIndex from "./embellishment-delivery-challan-report/embellishment-delivery-challan-report-index";
import EmbellishmentDeliveryGatePassReportIndex from "./embellishment-delivery-gate-pass-report/embellishment-delivery-gate-pass-report-index";

function EmbellishmentDeliveryReport() {
  const [data, setData] = useState<EmbellishmentDeliveryReportType[]>(
    []
  );



  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") || "0";


  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  useEffect(() => {
    async function getData() {

      const url = `${api.ProductionUrl}/production/EmbReport/EmbellishmentDeliveryReport?id=${id}`;

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
      <div className="min-w-[70%] w-fit ms-auto me-auto">
        {/* First report in its own table */}
        <table className="w-full print:break-inside-avoid">
          <tbody>
            <tr>
              <td>
                <EmbellishmentDeliveryChallanReportIndex data={data} />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="p-5"></div>

        {/* Second report in its own table */}
        <table className="w-full print:break-inside-avoid">
          <tbody>
            <tr>
              <td>
                <EmbellishmentDeliveryGatePassReportIndex data={data} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </>
  );
}
export default EmbellishmentDeliveryReport;
