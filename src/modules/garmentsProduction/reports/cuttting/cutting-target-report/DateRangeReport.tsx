import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";
import { IGmtCuttingEfficiencyReport, IGmtEfficiencySummary } from "../cutting-efficiency-report/ISewingTargetReport";
import '../../../../../../src/styles/report-table.css'

const CuttingTargetDateRangeReport: React.FC = () => {
  const location = useLocation();
  const [report, setReport] = useState<IGmtCuttingEfficiencyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const factoryId = searchParams.get("factory_id");
  const fromDate = searchParams.get("from_date");
  const toDate = searchParams.get("to_date");

  const lineColorMap: Record<string, string> = {};
  let colorToggle = false;

  const fetchReport = async () => {
    if (!factoryId || !fromDate || !toDate) {
      setError("Missing required query parameters");
      return;
    }

    setLoading(true);
    setError(null);
    try {

      const response = await axiosInstance.get<IGmtCuttingEfficiencyReport>("GmtCuttingReport/cutting-target-date-range-report", {
        params: {
          factoryId: factoryId,
          fromDate: formatDate(fromDate, "db_format"),
          toDate: formatDate(toDate, "db_format"),
        },
      });
      setReport(response.data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `Cutting Target Report from ${formatDate(fromDate || "", "short")} to ${formatDate(toDate || "", "short")}`;

    fetchReport();

    return () => {
      document.title = "";
    };

  }, [factoryId, fromDate,]);

  if (loading) return <ReportLoader />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;


  return (
    <div className="w-[90%] mx-auto p-4 default">
      {
        report &&
        <table className="report-table w-full">
          <thead className="header">
            <tr className="">
              <th className="border" colSpan={7}>
                <div className="flex flex-col items-center">
                  <span className="text-xl">{report?.company}</span>
                  <span className="text-lg">{`Cutting Target Report from ${formatDate(fromDate || "", "short")} to ${formatDate(toDate || "", "short")}`} </span>
                </div>
              </th>
            </tr>
          </thead>
          <thead className="sticky">
            <tr className="">
              <th className="">Date</th>
              <th className="">Actual Hour</th>
              <th className="">Target</th>
              <th className="">Achieve</th>
              <th className="">Avg. SMV</th>
              <th className="">Cut Effi</th>
              <th className="">Deviation</th>
            </tr>

          </thead>
          {/* Table Body */}
          <tbody>
            {report && report.mainData.map((row: IGmtEfficiencySummary, index: number) => {


              return (
                <React.Fragment>


                  <tr key={index} className={` ${row.TARGET_QTY === 0 ? 'hidden' : ''}`}>

                    <td className="text-center">{formatDate(row.DATE_STR, 'short')}</td>
                    <td className="text-center">{row.ACTUAL_HOUR}</td>
                    <td className="text-center">{row.TARGET_QTY}</td>
                    <td className="text-center">{row.PRODUCE_QTY}</td>
                    <td className="text-center">{row.AVG_SMV}</td>
                    <td className="text-center">{((row.PRODUCE_MIN * 100) / row.AVAIL_MIN).toFixed(2)}%</td>
                    <td className={`text-center ${row.PRODUCE_QTY - row.TARGET_QTY < 0 ? 'text-red-500' : ''}`}>{row.PRODUCE_QTY - row.TARGET_QTY}</td>

                  </tr>

                </React.Fragment>
              )
            })}

            {/*  Total Row */}
            {report.mainData.length > 0 && (() => {
              const allRows = report.mainData;
              let includedLine: number[] = [];
              const totalRow = allRows.reduce((acc, row) => {

                acc.row_count += row.PRODUCE_QTY === 0 ? 0 : 1;
                acc.total_acheive_qty += row.PRODUCE_QTY;
                acc.total_earn_min += row.PRODUCE_MIN;
                acc.total_target_min += row.TARGET_MIN;
                acc.total_target_qty += row.TARGET_QTY;
                acc.total_smv += row.AVG_SMV;
                acc.total_avail_min += row.AVAIL_MIN;
                acc.total_hour += row.ACTUAL_HOUR;
                acc.total_manpower += row.MP;

                return acc;
              }, {
                total_manpower: 0,
                total_target_qty: 0,
                total_acheive_qty: 0,
                total_avail_min: 0,
                total_earn_min: 0,
                total_target_min: 0,
                row_count: 0,
                total_smv: 0,
                total_hour: 0
              });

              return (
                <tr key={`line-total-`} className={`subtotal`}>
                  <td className="text-left px-2 border">
                    Total
                  </td>

                  <td className="text-center">{(totalRow.total_hour/totalRow.row_count).toFixed(2)}</td>
                  <td className="text-center">{totalRow.total_target_qty}</td>
                  <td className="text-center">{totalRow.total_acheive_qty}</td>
                  <td className="text-center">{(totalRow.total_smv / totalRow.row_count).toFixed(2)}</td>

                  <td className="text-center">{((totalRow.total_earn_min * 100) / totalRow.total_avail_min).toFixed(2)}%</td>
                  <td className={`text-center ${totalRow.total_acheive_qty - totalRow.total_target_qty < 0 ? 'text-red-500' : ''}`}>{totalRow.total_acheive_qty - totalRow.total_target_qty}</td>

                </tr>
              );
            })()}


          </tbody>
        </table>
      }


    </div>
  );
};

export default CuttingTargetDateRangeReport;
