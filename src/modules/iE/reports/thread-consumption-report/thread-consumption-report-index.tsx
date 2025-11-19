/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import ReportHeader from "./components/report-header";
import ReportFooter from "./components/report-footer";
import moment from "moment";
import { ThreadConsumptionReportType } from "./thread-consumption-report-type";
import { ThreadConsumptionSummaryReportType } from "./thread-consumption-summary-report-type";
import { ThreadConsumptionMaterialTypeReportType } from "./ThreadConsumptionMaterialTypeReportType";

function ThreadConsumptionReport() {

  const [threadConsumptionData, setThreadConsumptionData] = useState<ThreadConsumptionReportType[]>(
    []
  );

  const [threadConsumptionSummaryData, setThreadConsumptionSummaryData] = useState<ThreadConsumptionSummaryReportType[]>(
    []
  );

  const [threadConsumptionMaterialType, setThreadConsumptionMaterialType] = useState<ThreadConsumptionMaterialTypeReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const threadConsumptionNo = searchParams.get("threadConsumptionNo") || "";
  const companyId = searchParams.get("companyId") || 0;


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
            `${api.ProductionUrl}/production/IEReport/ThreadConsumptionReport?threadConsumptionNo=${threadConsumptionNo}&companyId=${companyId}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setThreadConsumptionData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        await axios
          .get(
            `${api.ProductionUrl}/production/IEReport/ThreadConsumptionSummaryReport?threadConsumptionNo=${threadConsumptionNo}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setThreadConsumptionSummaryData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));


        await axios
          .get(
            `${api.ProductionUrl}/production/IEReport/ThreadConsumptionMaterialTypeReport?threadConsumptionNo=${threadConsumptionNo}`
          )
          .then((res) => {
            //console.log(res);
            if (res.data) {
              //console.log("My Data", res.data);
              setThreadConsumptionMaterialType(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));



        //   .catch((m) => console.log(m));
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        //console.log(error.message);
      }
    }
    getData();
  }, []);

  const [styleImage, setStyleImage] = useState<string | null>(null);

  useEffect(() => {
    fetchImage(threadConsumptionData[0]?.STYLEID || 0);
  }, [threadConsumptionData[0]?.STYLEID]);

  const fetchImage = async (id: number) => {
    try {
      const response = await fetch(
        `${api.ProductionUrl}/production/Style/GetStyleImage?styleId=${id}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        if (styleImage) {
          URL.revokeObjectURL(styleImage);
        }
        setStyleImage(url);
      } else {
        console.error("Failed to fetch image");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return isLoading ? (
    <>
      <div className="container flex justify-center items-center">
        <div>
          <h3 className=" text-start p-2 m-4 font-bold ">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="flex justify-center">
        <div
          className="w-fit flex flex-col font-bold mb-5 print:w-fit min-w-[60%]"
          style={{ fontFamily: "Times New Roman, serif", fontSize: "12px" }}
        >
          <div>
            <ReportHeader data={threadConsumptionData} />
          </div>

          <div className="flex justify-between gap-3 mt-1">
            {/* Left Table */}
            <div className="w-[30%]">
              <table className="border-collapse border border-gray-300 mt-3">
                <thead className="sticky top-0 print:static bg-white print:bg-transparent"></thead>
                <tbody>

                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200">Buyer</td>
                    <td className="border border-gray-950 p-0.5">{threadConsumptionData[0]?.BUYERNAME}</td>
                  </tr>
                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200">Style</td>
                    <td className="border border-gray-950 p-0.5">{threadConsumptionData[0]?.STYLENO}</td>
                  </tr>

                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200">Item</td>
                    <td className="border border-gray-950 p-0.5">
                      {[...new Set(threadConsumptionData.map((item) => item.ITEM_TYPE))].join(', ')}
                    </td>
                  </tr>
                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200">Composition</td>
                    <td className="border border-gray-950 p-0.5">{threadConsumptionData[0]?.MAIN_FABRIC}</td>
                  </tr>
                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200">GSM</td>
                    <td className="border border-gray-950 p-0.5">{threadConsumptionData[0]?.GSM}</td>
                  </tr>
                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200 text-nowrap">Sample Type</td>
                    <td className="border border-gray-950 p-0.5">{threadConsumptionData[0]?.SAMPLE_TYPE}</td>
                  </tr>
                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200">Date</td>
                    <td className="border border-gray-950 p-0.5">
                      {threadConsumptionData[0]?.CREATEDATE &&
                        moment(threadConsumptionData[0].CREATEDATE).isAfter('1901-01-01')
                        ? moment(threadConsumptionData[0].CREATEDATE).format('DD-MMM-YY')
                        : ''}
                    </td>
                  </tr>
                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200 text-nowrap">Working Size</td>
                    <td className="border border-gray-950 p-0.5">{threadConsumptionData[0]?.SIZENAME}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Image Section */}
            <div className="w-[25%] flex items-start justify-center">
              {styleImage && (
                <img
                  src={styleImage}
                  alt="Style Image"
                  className="max-h-[160px] w-auto object-contain mt-5"
                />
              )}
            </div>

            {/* Right Table */}
            <div className="w-[55%]">
              <table className="border-collapse border border-gray-300 w-full mt-3">
                <thead className=" bg-white print:bg-transparent">
                  <th className="border border-gray-950 p-0.5 bg-emerald-200">Thread Type</th>
                  <th className="border border-gray-950 p-0.5 bg-emerald-200">Thread Color</th>
                  <th className="border border-gray-950 p-0.5">
                    Wastage
                  </th>
                  <th className="border border-gray-950 p-0.5">
                    Length(M)
                  </th>
                </thead>
                <tbody>

                  {
                    threadConsumptionSummaryData.map((item, index) => <tr key={index} className="text-start">
                      <td className="border border-gray-950 p-0.5 bg-emerald-200">{item.THREADNAME}</td>
                      <td className="border border-gray-950 p-0.5 bg-emerald-200">{item.THREADCOLOR}</td>
                      <td className="border border-gray-950 p-0.5">
                        {item.WASTAGEPERCENT} %
                      </td>
                      <td className="border border-gray-950 p-0.5">
                        {Math.round(item.THREADLENGTH)}
                      </td>
                    </tr>
                    )
                  }
                  <tr className="text-start">
                    <td colSpan={2} className="border border-gray-950 p-0.5 bg-emerald-200 text-center">Total</td>
                    <td className="border border-gray-950 p-0.5">
                    </td>
                    <td className="border border-gray-950 p-0.5">
                      {Math.round(threadConsumptionSummaryData.reduce((acc, item) => acc + item.THREADLENGTH, 0))}
                    </td>
                  </tr>
                </tbody>
              </table>


              <table className="border-collapse border border-gray-300 w-full mt-3">
                <thead className=" bg-white print:bg-transparent">
                  <th className="border border-gray-950 p-0.5 bg-emerald-200">Material Type</th>
                  <th className="border border-gray-950 p-0.5  bg-emerald-200">Body Part</th>
                  <th className="border border-gray-950 p-0.5 bg-emerald-200">
                    Consumption
                  </th>
                  <th className="border border-gray-950 p-0.5 bg-emerald-200">
                    WT %
                  </th>
                  <th className="border border-gray-950 p-0.5 bg-emerald-200">
                    UOM
                  </th>
                </thead>
                <tbody>

                  {
                    threadConsumptionMaterialType.map((item, index) => <tr key={index} className="text-center">
                      <td className="border border-gray-950 p-0.5 ">{item.MATERIALTYPE}</td>
                      <td className="border border-gray-950 p-0.5 ">{item.BODYPART}</td>
                      <td className="border border-gray-950 p-0.5">
                        {item.CONSUMPTION}
                      </td>
                      <td className="border border-gray-950 p-0.5">
                        {item.WTPERCENT}
                      </td>
                      <td className="border border-gray-950 p-0.5">
                        {item.UOM}
                      </td>
                    </tr>
                    )
                  }
                </tbody>
              </table>

            </div>
          </div>

          <div className="mt-3 text-end">
            <table className="me-auto">
              <thead></thead>
              <tbody>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 text-nowrap">Size Range</td>
                  <td className="border border-gray-950 p-0.5">{threadConsumptionData[0]?.SIZE_LIST}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Report data={threadConsumptionData}></Report>

          <div>
            <ReportFooter data={threadConsumptionData}></ReportFooter>
          </div>
        </div>
      </div>
    </>
  );
}
export default ThreadConsumptionReport;
