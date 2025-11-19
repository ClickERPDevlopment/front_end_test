/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";

import useApiUrl from "@/hooks/use-ApiUrl";

import AccReportHeader from "../components/acc-report-header";
import AccReportFooter from "../components/acc-report-footer";
import AccReportTableGroup from "./components/acc-report-table-group";
import Loader from "@/components/feedback-interaction/loader";
import { iaccWorkOrder } from "../components/iaccWorkOrder";

function getSeasons(data: iaccWorkOrder[]) {
  const array: string[] = [];

  data?.forEach((element) => {
    if (element.SESSIONNO != null) {
      if (!array.includes(element.SESSIONNO)) {
        array.push(element.SESSIONNO);
      }
    }
  });

  return array.toString();
}

export default function FinishFabricAllocationReport() {
  const [data, setData] = useState<iaccWorkOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id: number = 325;
  let currency: string = "TK";
  let cmbReportFormat: string = "";

  if (searchParams.get("id")) {
    id = Number(searchParams.get("id"));
  }
  if (searchParams.get("currency")) {
    currency = String(searchParams.get("currency"));
  }
  if (searchParams.get("cmbReportFormat")) {
    cmbReportFormat = String(searchParams.get("cmbReportFormat"));
  }

  console.log("id: ", id);
  console.log("orderRef: ", currency);
  console.log("fabricId: ", cmbReportFormat);

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Accessories work order";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/accessorieswo/GetWorkOrderReport_BklCarelabel?id=${id}&currency=${currency}&cmbReportFormat=${cmbReportFormat}`
          )
          .then((res) => {
            if (res.data) {
              const result = res.data;
              // console.log("response: ", r.data);
              if (result.IsError) {
                console.log("Error found: ", result.ErrorMessage);
                setData([]);
              } else {
                setData(result.Data);
                console.log(result.Data);
              }
            } else {
              console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        console.log(error.message);
      }
    }
    getData();
  }, []);

  // console.log(masterData);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="m-3 inline-block print:overflow-visible">
          {/* heading */}
          <div className="">
            <h3 className="text-center text-slate-700 m-1 font-bold text-2xl">
              {data[0]?.COMPANY_NAME}
            </h3>
            <h3 className="text-center text-slate-700 m-0 font-normal text-lg">
              {data[0]?.COMPANY_ADDRESS}
            </h3>
            <div className="text-right text-slate-700 my-1 font-bold">
              <span className="bg-slate-200 px-10 py-1 text-lg">
                Work Order
              </span>
            </div>
          </div>
          {/* end heading */}

          {/* Report Header */}
          <div className="border border">
            <AccReportHeader
              masterData={data.length > 0 ? data[0] : null}
              seasons={getSeasons(data)}
            />
          </div>
          {/* end Report Header */}

          {/* table */}
          <div className="min-w-[100%]">
            <AccReportTableGroup data={data} />
          </div>
          {/* end table */}

          {/* Footer */}
          <div>
            <AccReportFooter masterData={data.length > 0 ? data[0] : null} />
          </div>
          {/* end Footer */}
        </div>
      </>
    );
  }
}
