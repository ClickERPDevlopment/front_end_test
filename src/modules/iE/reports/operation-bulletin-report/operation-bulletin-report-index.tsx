/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { OperationBulletinReportType } from "./operation-bulletin-report-type";
// import { OperationBulletinMCDayWiseTargetReportType } from "./operation-bulletin-mc-day-wise-target-report-type";
// import { OperationBulletinNameRemarksReportType } from "./operation-bulletin-name-remarks-report-type";
import { OperationBulletinSummaryReportType } from "./operation-bulletin-summary-report-type";
// import OperationBulletinSummary from "./operation-bulletin-summary/operation-bulletin-summary";
// import OperationBulletinMCDayWiseTarget from "./operation-bulletin-mc-day-wise-target/operation-bulletin-mc-day-wise-target";
import OperationBulletinMCSummary from "./operation-bulletin-mc-summary/operation-bulletin-mc-summary";
// import OperationBulletinNameRemarks from "./operation-bulletin-name-remarks/operation-bulletin-name-remarks";
import ReportHeader from "./components/report-header";
import ReportFooter from "./components/report-footer";
import moment from "moment";
import ReportChart from "./components/report-chart";

function OperationBulletinReport() {

  const [bulletinData, setBulletinData] = useState<OperationBulletinReportType[]>(
    []
  );

  const [bulletinSummaryData, setBulletinSummaryData] = useState<OperationBulletinSummaryReportType[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const factoryId = searchParams.get("factoryId") || "0";
  const sectionId = searchParams.get("sectionId") || "0";
  const styleId = searchParams.get("styleId") || "0";
  const learningCurveId = searchParams.get("learningCurveId") || "0";
  const isWithChart = searchParams.get("isWithChart") === "True";


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
            `${api.ProductionUrl}/production/IEReport/OperationBulletinReport?factoryId=${factoryId}&sectionId=${sectionId}&styleId=${styleId}&learningCurveId=${learningCurveId}`
          )
          .then((res) => {
            if (res.data) {
              setBulletinData(res.data);
            } else {
            }
          })
          .catch((m) => console.log(m));

        await axios
          .get(
            `${api.ProductionUrl}/production/IEReport/OperationBulletinSummaryReport?factoryId=${factoryId}&sectionId=${sectionId}&styleId=${styleId}&learningCurveId=${learningCurveId}`
          )
          .then((res) => {
            if (res.data) {
              setBulletinSummaryData(res.data);
            } else {
            }
          })
          .catch((m) => console.log(m));


        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const [styleImage, setStyleImage] = useState<string | null>(null);

  useEffect(() => {
    fetchImage(bulletinData[0]?.STYLEID || 0);
  }, [bulletinData[0]?.STYLEID]);

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
      <div className="container">
        <h3 className=" text-start p-2 m-4 font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <>
      <div className="min-w-[60%] print:min-w-[50%] font-bold mb-5 w-fit ms-auto me-auto" style={{ fontFamily: "Times New Roman, serif", fontSize: "12px" }}>
        <div>
          <ReportHeader data={bulletinData} />
        </div>

        <div className="flex justify-between gap-3 mt-1 ms-auto me-auto">
          {/* Left Table */}
          <div className="w-[35%]">
            <table className="border-collapse border border-gray-300 w-full mt-3">
              <thead className="sticky top-0 print:static bg-white print:bg-transparent"></thead>
              <tbody>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Layout Date</td>
                  <td className="border border-gray-950 p-0.5">
                    {bulletinSummaryData[0]?.LAYOUT_DATE &&
                      moment(bulletinSummaryData[0].LAYOUT_DATE).isAfter('1901-01-01')
                      ? moment(bulletinSummaryData[0].LAYOUT_DATE).format('DD-MMM-YY')
                      : ''}
                  </td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Buyer</td>
                  <td className="border border-gray-950 p-0.5">{bulletinSummaryData[0]?.BUYER_NAME}</td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Style</td>
                  <td className="border border-gray-950 p-0.5">{bulletinSummaryData[0]?.STYLENO}</td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Sample Type</td>
                  <td className="border border-gray-950 p-0.5">{bulletinSummaryData[0]?.SAMPLE_TYPE}</td>
                </tr>
                {
                  bulletinSummaryData[0]?.SAMPLE_DATE && moment(bulletinSummaryData[0].SAMPLE_DATE).isAfter('1901-01-01') &&
                  <tr className="text-start">
                    <td className="border border-gray-950 p-0.5 bg-emerald-200">Sample Date</td>
                    <td className="border border-gray-950 p-0.5">
                      {
                        moment(bulletinSummaryData[0].SAMPLE_DATE).format('DD-MMM-YY')
                      }
                    </td>
                  </tr>
                }
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Tr 100% Eff</td>
                  <td className="border border-gray-950 p-0.5">
                    {Math.round((bulletinSummaryData[0]?.TOTALALLOTTEDMP * 60) / bulletinSummaryData[0]?.TOTALSMV)} Pcs
                  </td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Item</td>
                  <td className="border border-gray-950 p-0.5">
                    {[...new Set(bulletinData.map((item) => item.ITEMTYPE))].join(', ')}
                  </td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Main Fabric</td>
                  <td className="border border-gray-950 p-0.5">{bulletinSummaryData[0]?.MAIN_FABRIC}</td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">GSM</td>
                  <td className="border border-gray-950 p-0.5">{bulletinSummaryData[0]?.GSM}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Image Section */}
          <div className="w-[30%] flex items-start justify-center">
            {styleImage && (
              <img
                src={styleImage}
                alt="Style Image"
                className="max-h-[200px] w-auto object-contain mt-5"
              />
            )}
          </div>

          {/* Right Table */}
          <div className="w-[35%]">
            <table className="border-collapse border border-gray-300 w-full mt-3">
              <thead className="sticky top-0 print:static bg-white print:bg-transparent"></thead>
              <tbody>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Operator</td>
                  <td className="border border-gray-950 p-0.5">
                    {bulletinSummaryData.reduce((acc, item) => acc + item.OP, 0)}
                  </td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Helper</td>
                  <td className="border border-gray-950 p-0.5">
                    {bulletinSummaryData.reduce((acc, item) => acc + item.HLP, 0)}
                  </td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Ironmen</td>
                  <td className="border border-gray-950 p-0.5">
                    {bulletinSummaryData.reduce((acc, item) => acc + item.IR, 0)}
                  </td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Total Manpower</td>
                  <td className="border border-gray-950 p-0.5">
                    {bulletinSummaryData.reduce((acc, item) => acc + item.OP + item.HLP + item.IR, 0)}
                  </td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Total SMV</td>
                  <td className="border border-gray-950 p-0.5">{bulletinSummaryData[0]?.TOTALSMV}</td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Target/Hr</td>
                  <td className="border border-gray-950 p-0.5">{bulletinSummaryData[0]?.TARGERPERHOUR} Pcs</td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">Target Effi.</td>
                  <td className="border border-gray-950 p-0.5">{Math.round(bulletinSummaryData[0]?.EFFICIENCY)} %</td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">TT Operator SMV</td>
                  <td className="border border-gray-950 p-0.5">
                    {bulletinSummaryData.reduce((acc, item) => acc + item.SMVM, 0).toFixed(2)}
                  </td>
                </tr>
                <tr className="text-start">
                  <td className="border border-gray-950 p-0.5 bg-emerald-200">TT HP + IM SMV</td>
                  <td className="border border-gray-950 p-0.5">
                    {(bulletinSummaryData.reduce((acc, item) => acc + item.SMVH + item.SMVI, 0)).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        <div>
          <OperationBulletinMCSummary data={bulletinData} />
        </div>
        <Report data={bulletinData}></Report>
        <div>
          {isWithChart && <ReportChart data={bulletinData}></ReportChart>}
        </div>
        <div>
          <ReportFooter data={bulletinData}></ReportFooter>
        </div>
      </div>
    </>
  );
}
export default OperationBulletinReport;
