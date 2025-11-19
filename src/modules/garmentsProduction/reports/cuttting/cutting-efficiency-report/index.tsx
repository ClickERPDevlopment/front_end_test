import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IGmtProductionRecord, IGmtCuttingEfficiencyReport, ILineTarget } from "./ISewingTargetReport";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";
import '../../../../../../src/styles/report-table.css'

const CuttingEfficiencyReport: React.FC = () => {
  const location = useLocation();
  const [report, setReport] = useState<IGmtCuttingEfficiencyReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const factoryId = searchParams.get("factory_id");
  const fromDate = searchParams.get("from_date");
  const floorId = searchParams.get("floor_id") || "0";

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

      const response = await axiosInstance.get<IGmtCuttingEfficiencyReport>("GmtCuttingReport/cutting-efficiency-report", {
        params: {
          factoryId: factoryId,
          floorId: floorId,
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
    document.title = `Cutting Efficiency Report on ${formatDate(fromDate || "", "short")} `;

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

      lineWiseTotals[row.LINE_ID].totalQty += row.QTY || 0;
      lineWiseTotals[row.LINE_ID].totalProduceMin += row.PRODUCE_MIN || 0;
      lineWiseTotals[row.LINE_ID].totalSmv += row.SMV || 0;
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
              <th className="border" colSpan={12}>
                <div className="flex flex-col items-center">
                  <span className="">{report?.company}</span>
                  <span className="">{`Cutting Efficiency Report on ${formatDate(fromDate || "", "short")} `}</span>
                </div>
              </th>
            </tr>
          </thead>
          <thead className="sticky">
            <tr className="">
              <th className="">SL#</th>
              <th className="">Buyer</th>
              <th className="">PO</th>
              <th className="">Style No</th>
              <th className="">Color</th>
              <th className="">Cut Qty</th>
              <th className="">SMV</th>
              <th className="">Earned Min</th>
              <th className="">Loss Min</th>
              <th className="">Target Effi</th>
              <th className="">Daily Effi</th>
              <th className="">Remarks</th>
            </tr>

          </thead>
          {/* Table Body */}
          <tbody>
            {report && report.rows.map((row: IGmtProductionRecord, index: number) => {

              const lineTarget = report.lineTarget[row.LINE_ID];
              const cuttingSupervisorsData = report.cuttingSupervisorsData[row.LINE_ID];
              const lineTargetActualData = report.lineTargetActualData[row.LINE_ID];
              const currentLine = row.LINE_ID;
              const nextLine = report.rows[index + 1]?.LINE_ID;
              const isLastOfLine = currentLine !== nextLine;

              return (
                <React.Fragment>

                  {
                    lineTarget &&
                    <tr key={index} className={``}>

                      <td className="text-center">{index + 1}</td>
                      <td className="">{row.BUYER_NAME}</td>
                      <td className="">{row.PO_NO}</td>
                      <td className="">{row.STYLE_NO}</td>
                      <td className="">{row.COLOR_NAME}</td>
                      <td className="text-center">{row.QTY}</td>
                      <td className="text-center">{row.SMV}</td>
                      <td className="text-center">{Math.round(row.PRODUCE_MIN)}</td>

                      {lineWiseTotals[row.LINE_ID].start_row === index && <td rowSpan={lineWiseTotals[row.LINE_ID].row_count} className="text-center">
                        {''}
                      </td>}
                      {lineWiseTotals[row.LINE_ID].start_row === index && <td rowSpan={lineWiseTotals[row.LINE_ID].row_count} className="text-center">
                        {((lineTarget.PRODUCE_MIN * 100) / (lineTarget.MP * lineTargetActualData.ACTUAL_HOUR * 60)).toFixed(2)}%
                      </td>}
                      {lineWiseTotals[row.LINE_ID].start_row === index && <td rowSpan={lineWiseTotals[row.LINE_ID].row_count} className="text-center">
                        {((lineWiseTotals[row.LINE_ID].totalProduceMin * 100) / (lineTarget.MP * lineTargetActualData.ACTUAL_HOUR * 60)).toFixed(2)}%
                      </td>}

                      <td className=""></td>

                    </tr>
                  }



                  {/* Line total row — only when this is the last row of the line */}
                  {lineTarget && isLastOfLine && (() => {
                    const sameLineRows = report.rows.filter(r => r.LINE_ID === currentLine);
                    const lineTotalRow = sameLineRows.reduce((acc, row) => {

                      acc.total_produce_min += row.PRODUCE_MIN;
                      acc.total_produce_qty += row.QTY;

                      return acc;
                    }, {
                      total_produce_min: 0,
                      total_produce_qty: 0,
                    });

                    return (
                      <tr key={`line-total-${currentLine}`} className={`subtotal`}>
                        <td colSpan={5} className="">
                          {lineTarget.LINE_NAME} {`Man power: ${lineTarget.MP}; Actual Hour: ${lineTargetActualData.ACTUAL_HOUR};
                           Target Qty: ${lineTarget.TARGET_QTY}; Available Min: ${lineTarget.MP * lineTargetActualData.ACTUAL_HOUR * 60};`}
                           {cuttingSupervisorsData ? `Supervisors: ${cuttingSupervisorsData}` : ''}
                        </td>

                        <td className="text-center">{lineTotalRow.total_produce_qty}</td>
                        <td className="text-center"></td>
                        <td className="text-center">{Math.round(lineTotalRow.total_produce_min)}</td>
                        <td className="text-center" colSpan={4}></td>

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

                const lineTarget = report.lineTarget[row.LINE_ID];
                if (lineTarget) {
                  acc.total_manpower = report.factoryTargetData.MP;
                  acc.ACTUAL_HOUR = Number(report.factoryTargetData.ACTUAL_HOUR.toFixed(2));
                  acc.total_avail_min = Math.round(report.factoryTargetData.MP * report.factoryTargetData.ACTUAL_HOUR * 60);
                  acc.total_earn_min += row.PRODUCE_MIN;
                  acc.total_acheive_qty += row.QTY;

                  acc.total_target_qty += includedLine.indexOf(row.LINE_ID) === -1 ? lineTarget.TARGET_QTY : 0;
                  acc.total_target_min += includedLine.indexOf(row.LINE_ID) === -1 ? lineTarget.PRODUCE_MIN : 0;

                  includedLine.push(row.LINE_ID);
                }


                return acc;
              }, {
                total_manpower: 0,
                total_target_qty: 0,
                total_acheive_qty: 0,
                total_avail_min: 0,
                total_earn_min: 0,
                total_target_min: 0,
                ACTUAL_HOUR: 0
              });

              return (
                <>
                  <tr key={`line-total-`} className={``}>
                    <td colSpan={5} className="">
                      Total
                    </td>

                    <td className="text-center">{totalRow.total_acheive_qty}</td>
                    <td className="text-center"></td>
                    <td className="text-center">{Math.round(totalRow.total_earn_min)}</td>
                    <td className="text-center" colSpan={4}></td>

                  </tr>

                  <tr className="h-[30px]">
                    <td colSpan={6}></td>
                  </tr>

                  <tr key={`grand-total-`} className={`font-bold`}>

                    <td colSpan={6} className="bg-[#C5C7BC]">Summary</td>

                  </tr>
                  <tr key={`grand-total-`} className={`font-bold`}>

                    <td colSpan={3} className="">Total Manpower: {totalRow.total_manpower}</td>
                    <td colSpan={3} className="">Avail Min: {totalRow.total_avail_min}</td>

                  </tr>
                  <tr key={`grand-total-`} className={`font-bold`}>

                    <td colSpan={3} className="">Actual Hours: {totalRow.ACTUAL_HOUR}</td>
                    <td colSpan={3} className="">Earn Min: {Math.round(totalRow.total_earn_min)}</td>

                  </tr>
                  <tr key={`grand-total-`} className={`font-bold`}>

                    <td colSpan={3} className="">Total Target Pcs: {totalRow.total_target_qty}</td>
                    <td colSpan={3} className="">Target Efii(%): {((totalRow.total_target_min * 100) / totalRow.total_avail_min).toFixed(2)}</td>

                  </tr>
                  <tr key={`grand-total-`} className={`font-bold`}>

                    <td colSpan={3} className="">Total Achieve Pcs: {totalRow.total_acheive_qty}</td>
                    <td colSpan={3} className="">Achieve Effi(%): {((totalRow.total_earn_min * 100) / totalRow.total_avail_min).toFixed(2)}</td>

                  </tr>
                  <tr key={`grand-total-`} className={`font-bold`}>

                    <td colSpan={3} className={` ${totalRow.total_acheive_qty - totalRow.total_target_qty < 0 ? 'text-red-500' : ''}`}>Deviation: {totalRow.total_acheive_qty - totalRow.total_target_qty}</td>
                    <td colSpan={3} className=""></td>

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
