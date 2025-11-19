import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IGmtCuttingTargetReport, ILineTargetRecord } from "./ISewingTargetReport";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";
import '../../../../../../src/styles/report-table.css'

const CuttingEfficiencyReport: React.FC = () => {
  const location = useLocation();
  const [report, setReport] = useState<IGmtCuttingTargetReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const factoryId = searchParams.get("factory_id");
  const fromDate = searchParams.get("from_date");

  const lineColorMap: Record<string, string> = {};
  let colorToggle = false;

  const fetchReport = async () => {
    if (!factoryId || !fromDate) {
      setError("Missing required query parameters");
      return;
    }

    setLoading(true);
    setError(null);
    try {

      const response = await axiosInstance.get<IGmtCuttingTargetReport>("GmtCuttingReport/cutting-target-report", {
        params: {
          factoryId: factoryId,
          fromDate: formatDate(fromDate, "db_format"),
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
    document.title = `Cutting Target Report on ${formatDate(fromDate || "", "short")} `;

    fetchReport();

    return () => {
      document.title = "";
    };

  }, [factoryId, fromDate,]);

  if (loading) return <ReportLoader />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  const lineWiseTotals: Record<number, {
    totalQty: number;
    totalProduceMin: number;
    totalSmv: number;
    row_count: number;
    start_row: number;
  }> = {};
  let row_num = 0;
  if (report?.rows) {
    for (const row of report.rows) {
      if (!lineWiseTotals[row.LINE_ID]) {
        lineWiseTotals[row.LINE_ID] = {
          totalQty: 0,
          totalProduceMin: 0,
          totalSmv: 0,
          row_count: 0,
          start_row: row_num
        };
      }

      lineWiseTotals[row.LINE_ID].totalProduceMin += row.PRODUCE_MIN || 0;
      lineWiseTotals[row.LINE_ID].row_count += 1;

      row_num++;

    }
  }

  return (
    <div className="w-[90%] mx-auto p-4 default ">
      {
        report &&
        <table className="report-table w-full">
          <thead className="header">
            <tr className="">
              <th className="" colSpan={16}>
                <div className="flex flex-col items-center">
                  <span className="">{report?.company}</span>
                  <span className="">{`Cutting Target Report on ${formatDate(fromDate || "", "short")} `}</span>
                </div>
              </th>
            </tr>
          </thead>
          <thead className="sticky">
            <tr className="">
              <th className="">SL#</th>
              <th className="">Buyer</th>
              <th className="">PO</th>
              <th className="">Style No.</th>
              <th className="">Color</th>
              <th className="">Order QTY</th>
              <th className="">Plan QTY</th>
              <th className="">TTL Cut QTY</th>
              <th className="">Day Target</th>
              <th className="">SMV</th>
              <th className="">Marker Pcs</th>
              <th className="">Lay Qty</th>
              <th className="">TTL Pcs</th>
              <th className="">TGT Hour</th>
              <th className="">Table No.</th>
              <th className="">Remarks</th>
            </tr>

          </thead>
          {/* Table Body */}
          <tbody>
            {report && report.rows.map((row: ILineTargetRecord, index: number) => {

              const lineTarget = report.linewiseTargetData[row.LINE_ID];
              const cuttingSupervisorsData = report.cuttingSupervisorsData[row.LINE_ID];
              const lineTargetActualData = report.linewiseTargetActualData[row.LINE_ID];
              const key = "p-" + row.PO_NO + "-s-" + row.STYLE_ID + "-c-" + row.COLOR_ID;
              const cuttingQty = report.cuttingProductionQty[key] || 0;
              const currentLine = row.LINE_ID;
              const nextLine = report.rows[index + 1]?.LINE_ID;
              const isLastOfLine = currentLine !== nextLine;

              return (
                <React.Fragment>


                  <tr key={index} className={``}>

                    <td className="">{index + 1}</td>
                    <td className="">{row.BUYER_NAME}</td>
                    <td className="">{row.PO_NO}</td>
                    <td className="">{row.STYLE_NO}</td>
                    <td className="">{row.COLOR_NAME}</td>
                    <td className="">{row.ORDER_QTY}</td>
                    <td className="">{row.PLAN_QTY}</td>
                    <td className="">{cuttingQty}</td>
                    <td className="">{row.TARGET_QTY}</td>
                    <td className="">{row.SMV}</td>
                    <td className="">{row.MARKER_PCS}</td>
                    <td className="">{row.LAY_QTY}</td>
                    <td className="">{Math.round(row.LAY_QTY * row.MARKER_PCS)}</td>
                    <td className="">{row.TARGET_HOUR}</td>
                    <td className="">{row.TABLE_NAME}</td>
                    <td className="">{row.REMARKS}</td>

                  </tr>

                  {/* Line total row — only when this is the last row of the line */}
                  {isLastOfLine && (() => {
                    const sameLineRows = report.rows.filter(r => r.LINE_ID === currentLine);
                    const lineTotalRow = sameLineRows.reduce((acc, row) => {
                      const key = "p-" + row.PO_NO + "-s-" + row.STYLE_ID + "-c-" + row.COLOR_ID;
                      acc.total_target_qty += row.TARGET_QTY;
                      acc.total_cutting_qty += report.cuttingProductionQty[key] || 0;
                      acc.row_count += 1;
                      acc.total_smv_weight += row.TARGET_QTY * row.SMV;
                      acc.total_target_hour += row.TARGET_HOUR;

                      return acc;
                    }, {
                      total_produce_min: 0,
                      total_target_qty: 0,
                      total_cutting_qty: 0,
                      total_smv_weight: 0,
                      total_target_hour: 0,
                      row_count: 0
                    });

                    return (
                      <tr key={`line-total-${currentLine}`} className={`subtotal`}>
                        <td colSpan={7} className="">
                          {lineTarget.LINE_NAME} {`Man power: ${lineTarget.MP}; Actual Hour: ${lineTargetActualData.ACTUAL_HOUR};
                           Target Qty: ${lineTarget.TARGET_QTY}; Available Min: ${lineTarget.MP * lineTargetActualData.ACTUAL_HOUR * 60}; 
                           Effi: ${((lineTarget.PRODUCE_MIN * 100) / (lineTarget.MP * lineTargetActualData.ACTUAL_HOUR * 60)).toFixed(2)}%;`}
                           {cuttingSupervisorsData ? `Supervisors: ${cuttingSupervisorsData}` : ''}
                        </td>

                        <td className="">{lineTotalRow.total_cutting_qty}</td>
                        <td className="">{lineTotalRow.total_target_qty}</td>
                        <td className="">{(lineTotalRow.total_smv_weight / lineTotalRow.total_target_qty).toFixed(2)}</td>
                        <td className=""></td>
                        <td className=""></td>
                        <td className=""></td>
                        <td className="">{lineTotalRow.total_target_hour.toFixed(2)}</td>
                        <td className="" colSpan={2}></td>

                      </tr>
                    );
                  })()}


                </React.Fragment>
              )
            })}

            {/*  Total Row */}
            {report.rows.length > 0 && (() => {
              const allRows = report.rows;
              let includedLine: number[] = [];
              const totalRow = allRows.reduce((acc, row) => {


                const key = "p-" + row.PO_NO + "-s-" + row.STYLE_ID + "-c-" + row.COLOR_ID;
                acc.total_target_qty += row.TARGET_QTY;
                acc.total_cutting_qty += report.cuttingProductionQty[key] || 0;
                acc.row_count += 1;
                acc.total_smv_weight += row.TARGET_QTY * row.SMV;
                acc.total_target_hour += row.TARGET_HOUR;

                return acc;
              }, {
                total_produce_min: 0,
                total_target_qty: 0,
                total_cutting_qty: 0,
                total_smv_weight: 0,
                total_target_hour: 0,
                row_count: 0
              });

              return (
                <>
                  <tr key={`line-total-`} className={``}>
                    <td colSpan={7} className="">
                      Total
                    </td>

                    <td className="">{totalRow.total_cutting_qty}</td>
                    <td className="">{totalRow.total_target_qty}</td>
                    <td className="">{(totalRow.total_smv_weight / totalRow.total_target_qty).toFixed(2)}</td>
                    <td className=""></td>
                    <td className=""></td>
                    <td className=""></td>
                    <td className="">{totalRow.total_target_hour.toFixed(2)}</td>
                    <td className="" colSpan={2}></td>

                  </tr>

                  <tr className="h-[30px]">
                    <td colSpan={16}></td>
                  </tr>

                  <tr key={`grand-total-`} className={`font-bold`}>

                    <td colSpan={8} className="">Today</td>
                    <td colSpan={8} className="">Yesterday</td>

                  </tr>
                  <tr key={`grand-total-`} className="font-bold">
                    <td className="" colSpan={8}>Total Target: {report.todayData.TARGET_QTY}</td>
                    <td className="" colSpan={8}>Total Target: {report.yesterdayData.TARGET_QTY}</td>
                  </tr>

                  <tr key={`grand-total-`} className="font-bold">
                    <td className="" colSpan={8}>Target Hour: {report.todayData.ACTUAL_HOUR}</td>
                    <td className="" colSpan={8}>Total Achievement: {report.yesterdayData.PRODUCE_QTY}</td>
                  </tr>

                  <tr key={`grand-total-`} className="font-bold">
                    <td className="" colSpan={8}>Target Efficiency: {((report.todayData.TARGET_MIN*100)/(report.todayData.ACTUAL_HOUR * report.todayData.MP * 60)).toFixed(2)}%</td>
                    <td className="" colSpan={8}>Total Deviation: {report.yesterdayData.PRODUCE_QTY - report.yesterdayData.TARGET_QTY}</td>
                  </tr>

                  <tr key={`grand-total-`} className="font-bold">
                    <td className="" colSpan={8}>Total Manpower: {report.todayData.MP}</td>
                    <td className="" colSpan={8}>Achieved Efficiency: {((report.yesterdayData.PRODUCE_MIN*100)/(report.yesterdayData.ACTUAL_HOUR * report.yesterdayData.MP * 60)).toFixed(2)}%</td>
                  </tr>

                  <tr key={`grand-total-`} className="font-bold">
                    <td colSpan={8}></td>
                    <td className="" colSpan={8}>Total Manpower: {report.yesterdayData.MP}</td>
                  </tr>



                </>
              );
            })()}

          </tbody>
        </table>
      }


    </div>
  );
};

export default CuttingEfficiencyReport;
