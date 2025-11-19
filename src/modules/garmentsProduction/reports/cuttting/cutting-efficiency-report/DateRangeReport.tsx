import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IGmtProductionRecord, IGmtCuttingEfficiencyReport, ILineTarget, IGmtEfficiencySummary } from "./ISewingTargetReport";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";
import '../../../../../../src/styles/report-table.css'

const CuttingEfficiencyDateRangeReport: React.FC = () => {
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

      const response = await axiosInstance.get<IGmtCuttingEfficiencyReport>("GmtCuttingReport/cutting-efficiency-date-range-report", {
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
    document.title = `Cutting Efficiency Report from ${formatDate(fromDate || "", "short")} to ${formatDate(toDate || "", "short")}`;

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
              <th className="" colSpan={11}>
                <div className="flex flex-col items-center">
                  <span className="">{report?.company}</span>
                  <span className="">{`Cutting Efficiency Report from ${formatDate(fromDate || "", "short")} to ${formatDate(toDate || "", "short")}`} </span>
                </div>
              </th>
            </tr>
          </thead>
          <thead className="sticky">
            <tr className="">
              <th className="">Date</th>
              <th className="">TGT Qty</th>
              <th className="">Cut Qty</th>
              <th className="">Produce Min</th>
              <th className="">Avg. SMV</th>
              <th className="">MP</th>
              <th className="">Actual Hour</th>
              <th className="">Avail Min</th>
              <th className="">Loss Min</th>
              <th className="">Efficiency</th>
              <th className="">Performance</th>
            </tr>

          </thead>
          {/* Table Body */}
          <tbody>
            {report && report.mainData.map((row: IGmtEfficiencySummary, index: number) => {


              return (
                <React.Fragment>


                  <tr key={index} className={` ${row.TARGET_QTY === 0 ? 'hidden' : ''}`}>

                    <td className="text-center">{formatDate(row.DATE_STR, 'short')}</td>
                    <td className="text-center">{row.TARGET_QTY}</td>
                    <td className="text-center">{row.PRODUCE_QTY}</td>
                    <td className="text-center">{Math.round(row.PRODUCE_MIN)}</td>
                    <td className="text-center">{row.AVG_SMV}</td>
                    <td className="text-center">{row.MP}</td>
                    <td className="text-center">{row.ACTUAL_HOUR}</td>
                    <td className="text-center">{row.AVAIL_MIN}</td>
                    <td className="text-center">{0}</td>
                    <td className="text-center">{((row.PRODUCE_MIN * 100) / row.AVAIL_MIN).toFixed(2)}%</td>
                    <td className="text-center">{((row.PRODUCE_QTY * 100) / row.TARGET_QTY).toFixed(2)}%</td>

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
                <tr key={`line-total-`} className={``}>
                  <td className="">
                    Total
                  </td>

                  <td className="text-center">{totalRow.total_target_qty}</td>
                  <td className="text-center">{totalRow.total_acheive_qty}</td>
                  <td className="text-center">{Math.round(totalRow.total_earn_min)}</td>
                  <td className="text-center">{(totalRow.total_smv / totalRow.row_count).toFixed(2)}</td>
                  <td className="text-center">{Math.round(totalRow.total_manpower/totalRow.row_count)}</td>
                  <td className="text-center">{(totalRow.total_hour/totalRow.row_count).toFixed(2)}</td>
                  <td className="text-center">{totalRow.total_avail_min}</td>
                  <td className="text-center">{0}</td>
                  <td className="text-center">{((totalRow.total_earn_min * 100) / totalRow.total_avail_min).toFixed(2)}%</td>
                  <td className="text-center">{((totalRow.total_acheive_qty * 100) / totalRow.total_target_qty).toFixed(2)}%</td>

                </tr>
              );
            })()}


          </tbody>
        </table>
      }


    </div>
  );
};

export default CuttingEfficiencyDateRangeReport;
