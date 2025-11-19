import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IGmtDailyTargetDto, IGmtDailyTargetReport } from "./ISewingTargetReport";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";
import '../../../../../../src/styles/report-table.css'

const SewingTargetReport: React.FC = () => {
  const location = useLocation();
  const [report, setReport] = useState<IGmtDailyTargetReport | null>(null);
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

      const response = await axiosInstance.get<IGmtDailyTargetReport>("GmtSewingReport/sewing-target-report", {
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
    document.title = `Daily Sewing Target & Output Report on ${formatDate(fromDate || "", "short")} `;

    fetchReport();

    return () => {
      document.title = "";
    };

  }, [factoryId, fromDate,]);

  if (loading) return <ReportLoader />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  // Calculate totals
  const total = report?.rows.reduce((acc, row) => {

    // acc.sewing_produce_min += row.SewingProduceMin;

    return acc;
  }, {
    sewing_produce_min: 0,
    sewing_avail_min: 0,
    finishing_produce_min: 0,
    finishing_avail_min: 0,
    sewing_total_acheive_qty: 0,
    sewing_total_tgt_qty: 0,
    cutting_total_acheive_qty: 0,
    cutting_total_tgt_qty: 0,
    finishing_total_acheive_qty: 0,
    finishing_total_tgt_qty: 0,
    finishing_actual_hour: 0,
    sewing_actual_hour: 0,
    cutting_actual_hour: 0,
    total_cm: 0,
    total_fob: 0,
    total_row: 0
  });

  // Calculate average (avg)
  const avg = total
    ? {
      sewing_produce_min: total.sewing_produce_min / total.total_row,
      sewing_avail_min: total.sewing_avail_min / total.total_row,
      finishing_produce_min: total.finishing_produce_min / total.total_row,
      finishing_avail_min: total.finishing_avail_min / total.total_row,
      sewing_total_acheive_qty: total.sewing_total_acheive_qty / total.total_row,
      sewing_total_tgt_qty: total.sewing_total_tgt_qty / total.total_row,
      cutting_total_acheive_qty: total.cutting_total_acheive_qty / total.total_row,
      cutting_total_tgt_qty: total.cutting_total_tgt_qty / total.total_row,
      finishing_total_acheive_qty: total.finishing_total_acheive_qty / total.total_row,
      finishing_total_tgt_qty: total.finishing_total_tgt_qty / total.total_row,
      finishing_actual_hour: total.finishing_actual_hour / total.total_row,
      sewing_actual_hour: total.sewing_actual_hour / total.total_row,
      cutting_actual_hour: total.cutting_actual_hour / total.total_row,
      total_cm: total.total_cm / total.total_row,
      total_fob: total.total_fob / total.total_row,
    }
    : null;

  return (
    <div className="w-[95%] mx-auto p-4 default">
      {
        report &&
        <table className="report-table w-full text-sm">
          <thead className="header">
            <tr className="">
              <th className="" colSpan={28}>
                <div className="flex flex-col items-center">
                  <span className="">{report?.company}</span>
                  <span className="">{`Daily Sewing Target & Output Report on ${formatDate(fromDate || "", "short")} `}</span>
                </div>
              </th>
            </tr>
          </thead>
          <thead className="sticky ">
            <tr className="">
              <th className="">Line</th>
              <th className="">S. Line</th>
              <th className="">Buyer</th>
              <th className="">Style No</th>
              <th className="">PO</th>
              <th className="">Item Type</th>
              <th className="">SMV</th>
              <th className="" colSpan={4}>Required Manpower</th>
              <th className="" colSpan={5}>Present Manpower</th>
              <th className="">Line WIP</th>
              <th className="">R. Day</th>
              <th className="">TGT Eff</th>
              <th className="">TGT/ Hr</th>
              <th className="">Plan Hours</th>
              <th className="">TTL TGT</th>
              <th className="">Today Output</th>
              <th className="" colSpan={5}>Tomorrow Target Summary</th>
            </tr>
            <tr >
              <th colSpan={7}></th>
              <th className="">OP</th>
              <th className="">HP</th>
              <th className="">IM</th>
              <th className="">TM</th>
              <th className="">OP</th>
              <th className="">HP</th>
              <th className="">IM</th>
              <th className="">TM</th>
              <th className="">H0R</th>
              <th colSpan={7}></th>
              <th className="">Style No</th>
              <th className="">TGT Eff</th>
              <th className="">TGT/ Hr</th>
              <th className="">WH</th>
              <th className="">TTL TGT</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {report && report.rows.map((row: IGmtDailyTargetDto, index: number) => {

              const currentLine = row.LINENAME;
              const nextLine = report.rows[index + 1]?.LINENAME;
              const isLastOfLine = currentLine !== nextLine;

              const currentFloor = row.FLOOR_NAME;
              const nextFloor = report.rows[index + 1]?.FLOOR_NAME;
              const isLastOfFloor = currentFloor !== nextFloor;

              if (!lineColorMap[row.LINENAME]) {
                lineColorMap[row.LINENAME] = colorToggle ? "bg-gray-50" : "bg-white";
                colorToggle = !colorToggle;
              }

              const rowColor = lineColorMap[row.LINENAME];

              return (
                <React.Fragment>
                  {
                    row.IS_HAVE_CURRENT_DATA ?
                      (<tr key={index} className={` ${rowColor}`}>

                        {row.LINE_ROW_NUM === 1 && <td className="" rowSpan={row.LINE_COUNT}>{row.LINENAME}</td>}
                        {row.LINE_ROW_NUM === 1 && <td className="" rowSpan={row.LINE_COUNT}>{''}</td>}

                        <td className="">{row.BUYER_NAME}</td>
                        <td className="">{row.STYLENO}</td>
                        <td className="">{row.PONO}</td>
                        <td className="">{row.ITEMTYPE}</td>
                        <td className="">{row.SEWING_SMV}</td>

                        <td className="">{row.REQ_OPERATOR}</td>
                        <td className="">{row.REQ_HELPER}</td>
                        <td className="">{row.REQ_INPUTMAN}</td>
                        <td className="">{row.REQ_OPERATOR + row.REQ_HELPER + row.REQ_INPUTMAN}</td>

                        <td className="">{row.OPERATOR}</td>
                        <td className="">{row.HELPER}</td>
                        <td className="">{row.IRONER}</td>
                        <td className="">{row.OPERATOR + row.HELPER + row.IRONER}</td>
                        <td className="">{Math.round(((row.HELPER + row.IRONER) * 100 / row.OPERATOR + row.HELPER + row.IRONER))}%</td>

                        <td className="">{row.SEWINGWIP}</td>
                        <td className="">{row.RUNNING_DAY}</td>

                        <td className=" bg-[#FAEBD7]">{row.TARGETEFFICIENCY}</td>
                        <td className=" bg-[#FAEBD7]">{row.HOURLYTARGET}</td>
                        <td className=" bg-[#FAEBD7]">{row.TARGETHOUR.toFixed(2)}</td>
                        <td className=" bg-[#FAEBD7]">{Math.round(row.TARGETHOUR * row.HOURLYTARGET)}</td>

                        {row.LINE_ROW_NUM === 1 && <td className="" rowSpan={row.LINE_COUNT}>{row.TODAY_OUTPUT}</td>}

                        {
                          row.HAVE_TOMORROW ?
                            <>
                              <td className="">{row.TOMORROW_STYLENO}</td>
                              <td className=" bg-[#FAEBD7]">{row.TOMORROW_TARGETEFFICIENCY}</td>
                              <td className=" bg-[#FAEBD7]">{row.TOMORROW_HOURLYTARGET}</td>
                              <td className=" bg-[#FAEBD7]">{row.TOMORROW_TARGETHOUR}</td>
                              <td className=" bg-[#FAEBD7]">{Math.round(row.TOMORROW_HOURLYTARGET * row.TOMORROW_TARGETHOUR)}</td>
                            </> :
                            <>
                              <td className="" colSpan={5}></td>
                            </>
                        }

                      </tr>) :
                      (<tr key={index} className={`text-center ${rowColor}`}>

                        {row.LINE_ROW_NUM === 1 && <td className="" rowSpan={row.LINE_COUNT}>{row.LINENAME}</td>}
                        {row.LINE_ROW_NUM === 1 && <td className="" rowSpan={row.LINE_COUNT}>{''}</td>}

                        <td className="" colSpan={21}></td>

                        {
                          row.HAVE_TOMORROW ?
                            <>
                              <td className="">{row.TOMORROW_STYLENO}</td>
                              <td className=" bg-[#FAEBD7]">{row.TOMORROW_TARGETEFFICIENCY}</td>
                              <td className=" bg-[#FAEBD7]">{row.TOMORROW_HOURLYTARGET}</td>
                              <td className=" bg-[#FAEBD7]">{row.TOMORROW_TARGETHOUR}</td>
                              <td className=" bg-[#FAEBD7]">{Math.round(row.TOMORROW_HOURLYTARGET * row.TOMORROW_TARGETHOUR)}</td>
                            </> :
                            <>
                              <td className="" colSpan={5}></td>
                            </>
                        }
                      </tr>)
                  }

                  {/* Line total row — only when this is the last row of the line */}
                  {isLastOfLine && (() => {
                    const sameLineRows = report.rows.filter(r => r.LINENAME === currentLine);
                    const lineTotalRow = sameLineRows.reduce((acc, row) => {

                      acc.total_target_produce_min += row.HOURLYTARGET * row.TARGETHOUR * row.SEWING_SMV;
                      acc.total_target_avail_min += (row.OPERATOR + row.HELPER + row.IRONER) * 60 * row.TARGETHOUR;

                      acc.total_hourly_target += row.HOURLYTARGET;
                      acc.total_target_qty += row.HOURLYTARGET * row.TARGETHOUR;
                      acc.total_today_output += row.LINE_ROW_NUM === 1 ? row.TODAY_OUTPUT : 0;

                      acc.total_row += row.IS_HAVE_CURRENT_DATA ? 1 : 0;
                      acc.total_tomorrow_row += row.HAVE_TOMORROW ? 1 : 0;

                      acc.total_tomorrow_hourly_target += row.TOMORROW_HOURLYTARGET;
                      acc.total_tomorrow_target_qty += row.TOMORROW_HOURLYTARGET * row.TOMORROW_TARGETHOUR;

                      return acc;
                    }, {
                      total_target_produce_min: 0,
                      total_target_avail_min: 0,
                      total_hourly_target: 0,
                      total_target_qty: 0,
                      total_today_output: 0,

                      total_tomorrow_hourly_target: 0,
                      total_tomorrow_target_qty: 0,
                      total_row: 0,
                      total_tomorrow_row: 0
                    });

                    return (
                      <tr key={`line-total-${currentLine}`} className={`subtotal ${sameLineRows.length === 1 ? 'hidden' : ''}`}>
                        <td colSpan={18} className="">
                          {currentLine} Total
                        </td>
                        <td>{((lineTotalRow.total_target_produce_min * 100) / lineTotalRow.total_target_avail_min).toFixed(2)}%</td>
                        <td>{Math.round(lineTotalRow.total_hourly_target / lineTotalRow.total_row)}</td>
                        <td></td>
                        <td>{Math.round(lineTotalRow.total_target_qty)}</td>
                        <td>{lineTotalRow.total_today_output}</td>

                        <td></td>
                        <td></td>
                        <td>{Math.round(lineTotalRow.total_tomorrow_hourly_target / lineTotalRow.total_tomorrow_row)}</td>
                        <td></td>
                        <td>{Math.round(lineTotalRow.total_tomorrow_target_qty)}</td>

                      </tr>
                    );
                  })()}

                  {/* Floor total row — only when this is the last row of the floor */}
                  {isLastOfFloor && (() => {
                    let prev_line_id: number = 0;
                    let line_index = 0;
                    const sameFllorRows = report.rows.filter(r => r.FLOOR_NAME === currentFloor);
                    const fllorTotalRow = sameFllorRows.reduce((acc, row) => {

                      if (prev_line_id === 0 || prev_line_id !== row.LINEID) {
                        prev_line_id = row.LINEID;
                        line_index = 0;
                      }

                      acc.total_target_produce_min += row.HOURLYTARGET * row.TARGETHOUR * row.SEWING_SMV;
                      acc.total_target_avail_min += (row.OPERATOR + row.HELPER + row.IRONER) * 60 * row.TARGETHOUR;

                      acc.total_hourly_target += row.HOURLYTARGET;
                      acc.total_target_qty += row.HOURLYTARGET * row.TARGETHOUR;
                      acc.total_today_output += row.LINE_ROW_NUM === 1 ? row.TODAY_OUTPUT : 0;

                      acc.total_row += row.IS_HAVE_CURRENT_DATA ? 1 : 0;
                      acc.total_tomorrow_row += row.HAVE_TOMORROW ? 1 : 0;

                      acc.total_tomorrow_hourly_target += row.TOMORROW_HOURLYTARGET;
                      acc.total_tomorrow_target_qty += row.TOMORROW_HOURLYTARGET * row.TOMORROW_TARGETHOUR;

                      acc.total_weight_smv += (row.HOURLYTARGET * row.TARGETHOUR) * row.SEWING_SMV;

                      if (line_index === 0) {
                        acc.total_present_OP += row.OPERATOR;
                        acc.total_present_HP += row.HELPER;
                        acc.total_present_IM += row.IRONER;
                        acc.total_present_TM += row.OPERATOR + row.HELPER + row.IRONER;
                      }


                      line_index += 1;

                      return acc;
                    }, {
                      total_target_produce_min: 0,
                      total_target_avail_min: 0,
                      total_hourly_target: 0,
                      total_target_qty: 0,
                      total_today_output: 0,

                      total_tomorrow_hourly_target: 0,
                      total_tomorrow_target_qty: 0,
                      total_row: 0,
                      total_tomorrow_row: 0,
                      total_weight_smv: 0,

                      total_present_OP: 0,
                      total_present_HP: 0,
                      total_present_IM: 0,
                      total_present_TM: 0,
                    });


                    return (
                      <tr key={`floor-total-${currentFloor}`} className={`subtotal-2 ${sameFllorRows.length === 1 ? 'hidden' : ''}`}>
                        <td colSpan={6} className="">
                          {currentFloor} Total
                        </td>

                        <td>{(fllorTotalRow.total_weight_smv / fllorTotalRow.total_target_qty).toFixed(2)}</td>
                        <td colSpan={4}></td>

                        <td>{fllorTotalRow.total_present_OP}</td>
                        <td>{fllorTotalRow.total_present_HP}</td>
                        <td>{fllorTotalRow.total_present_IM}</td>
                        <td>{fllorTotalRow.total_present_TM}</td>

                        <td colSpan={3}></td>

                        <td>{((fllorTotalRow.total_target_produce_min * 100) / fllorTotalRow.total_target_avail_min).toFixed(2)}%</td>
                        <td>{Math.round(fllorTotalRow.total_hourly_target / fllorTotalRow.total_row)}</td>
                        <td>{report.swFloorWiseActualHourMap[currentFloor]}</td>
                        <td>{Math.round(fllorTotalRow.total_target_qty)}</td>
                        <td>{fllorTotalRow.total_today_output}</td>

                        <td></td>
                        <td></td>
                        <td>{Math.round(fllorTotalRow.total_tomorrow_hourly_target / fllorTotalRow.total_tomorrow_row)}</td>
                        <td></td>
                        <td>{Math.round(fllorTotalRow.total_tomorrow_target_qty)}</td>

                      </tr>
                    );
                  })()}
                </React.Fragment>
              )
            })}

            {/*  Total Row */}
            {report.rows.length > 0 && (() => {

              let prev_line_id: number = 0;
              let line_index = 0;

              const allRows = report.rows;
              const totalRow = allRows.reduce((acc, row) => {

                if (prev_line_id === 0 || prev_line_id !== row.LINEID) {
                  prev_line_id = row.LINEID;
                  line_index = 0;
                }

                acc.total_target_produce_min += row.HOURLYTARGET * row.TARGETHOUR * row.SEWING_SMV;
                acc.total_target_avail_min += (row.OPERATOR + row.HELPER + row.IRONER) * 60 * row.TARGETHOUR;

                acc.total_hourly_target += row.HOURLYTARGET;
                acc.total_target_qty += row.HOURLYTARGET * row.TARGETHOUR;
                acc.total_today_output += row.LINE_ROW_NUM === 1 ? row.TODAY_OUTPUT : 0;

                acc.total_row += row.IS_HAVE_CURRENT_DATA ? 1 : 0;
                acc.total_tomorrow_row += row.HAVE_TOMORROW ? 1 : 0;

                acc.total_tomorrow_hourly_target += row.TOMORROW_HOURLYTARGET;
                acc.total_tomorrow_target_qty += row.TOMORROW_HOURLYTARGET * row.TOMORROW_TARGETHOUR;

                acc.total_weight_smv += (row.HOURLYTARGET * row.TARGETHOUR) * row.SEWING_SMV;

                if (line_index === 0) {
                  acc.total_present_OP += row.OPERATOR;
                  acc.total_present_HP += row.HELPER;
                  acc.total_present_IM += row.IRONER;
                  acc.total_present_TM += row.OPERATOR + row.HELPER + row.IRONER;
                }

                line_index += 1;

                return acc;
              }, {
                total_target_produce_min: 0,
                total_target_avail_min: 0,
                total_hourly_target: 0,
                total_target_qty: 0,
                total_today_output: 0,

                total_tomorrow_hourly_target: 0,
                total_tomorrow_target_qty: 0,
                total_row: 0,
                total_tomorrow_row: 0,

                total_weight_smv: 0,

                total_present_OP: 0,
                total_present_HP: 0,
                total_present_IM: 0,
                total_present_TM: 0,
              });

              return (
                <tr key={`grand-total-`} className={` `}>
                  <td colSpan={6} className="">
                    Factory Total
                  </td>

                  <td>{(totalRow.total_weight_smv / totalRow.total_target_qty).toFixed(2)}</td>
                  <td colSpan={4}></td>

                  <td>{totalRow.total_present_OP}</td>
                  <td>{totalRow.total_present_HP}</td>
                  <td>{totalRow.total_present_IM}</td>
                  <td>{totalRow.total_present_TM}</td>

                  <td colSpan={3}></td>

                  <td>{((totalRow.total_target_produce_min * 100) / totalRow.total_target_avail_min).toFixed(2)}%</td>
                  <td>{Math.round(totalRow.total_hourly_target / totalRow.total_row)}</td>
                  <td>{report.avgActualHour}</td>
                  <td>{Math.round(totalRow.total_target_qty)}</td>
                  <td>{totalRow.total_today_output}</td>

                  <td></td>
                  <td></td>
                  <td>{Math.round(totalRow.total_tomorrow_hourly_target / totalRow.total_tomorrow_row)}</td>
                  <td></td>
                  <td>{Math.round(totalRow.total_tomorrow_target_qty)}</td>

                </tr>
              );
            })()}


            {
              report.sewingTargetRemarks.length > 0 &&
              <tr key={`remarks-${96}`} className="">
                <td className="" colSpan={3}>Line Name</td>
                <td className="" colSpan={25}>Remarks</td>
              </tr>
            }

            {
              report.sewingTargetRemarks.map((item, index) => (
                <tr key={`remarks-${index}`}>
                  <td className="" colSpan={3}>{item.LINE_NAME}</td>
                  <td className="" colSpan={25}>{item.REMARKS}</td>
                </tr>
              ))
            }


          </tbody>
        </table>
      }


    </div>
  );
};

export default SewingTargetReport;
