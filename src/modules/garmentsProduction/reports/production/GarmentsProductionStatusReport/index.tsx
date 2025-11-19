import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IProductionStatusDto, IProductionStatusReport } from "./IGarmentsProductionStatusReport";
import axiosInstance from "@/api/axiosInstance";
import { formatDate } from "@/utils/dateUtil";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import ReportLoader from "@/components/feedback-interaction/ReportLoader";

const GarmentsProductionStatusReport: React.FC = () => {
  const location = useLocation();
  const [report, setReport] = useState<IProductionStatusReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = new URLSearchParams(location.search);
  const factoryId = searchParams.get("factory_id");
  const fromDate = searchParams.get("from_date");
  const toDate = searchParams.get("to_date");

  const fetchReport = async () => {
    if (!factoryId || !fromDate || !toDate) {
      setError("Missing required query parameters");
      return;
    }

    setLoading(true);
    setError(null);
    try {

      const response = await axiosInstance.get<IProductionStatusReport>("CutToShip/gmt-production-status-report", {
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
    document.title = `Production Status Report from ${formatDate(fromDate || "", "short")} to ${formatDate(toDate || "", "short")}`;

    fetchReport();

    return () => {
      document.title = "";
    };
  }, [factoryId, fromDate, toDate]);

  if (loading) return <ReportLoader />;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  // Calculate totals
  const total = report?.rows.reduce((acc, row) => {

    acc.sewing_produce_min += row.SEWING_PRODUCE_MIN;
    acc.sewing_avail_min += row.SEWING_MP * 60 * row.SEWING_ACTUAL_HOUR;

    acc.finishing_produce_min += row.FINISHING_PRODUCE_MIN;
    acc.finishing_avail_min += row.FINISHING_MP * 60 * row.FINISHING_ACTUAL_HOUR;

    acc.sewing_total_acheive_qty += row.SEWING_ACHI_QTY;
    acc.sewing_total_tgt_qty += row.SEWING_TARGET_QTY;

    acc.cutting_total_acheive_qty += row.CUTTING_ACHI_QTY;
    acc.cutting_total_tgt_qty += row.CUTTING_TARGET_QTY;

    acc.finishing_total_acheive_qty += row.FINISHING_ACHI_QTY;
    acc.finishing_total_tgt_qty += row.FINISHING_TARGET_QTY;

    acc.finishing_actual_hour += row.FINISHING_ACTUAL_HOUR;
    acc.sewing_actual_hour += row.SEWING_ACTUAL_HOUR;
    acc.cutting_actual_hour += row.CUTTING_ACTUAL_HOUR;

    acc.total_fob += row.TOTAL_FOB;
    acc.total_cm += row.TOTAL_CM;

    acc.total_row += row.SEWING_ACHI_QTY > 0 ? 1 : 0;


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
    <div className="w-[98%] mx-auto p-4 default">
      {
        report &&
        <table className="data-table report w-full">
          <thead>
            <tr className="bg-white text-black">
              <th className="border" colSpan={26}>
                <div className="flex flex-col items-center">
                  <span className="text-xl">{report?.company}</span>
                  <span className="text-lg">{`Production Status Report from ${formatDate(fromDate || "", "short")} to ${formatDate(toDate || "", "short")}`}</span>
                </div>
              </th>
            </tr>
          </thead>
          <thead className="bg-gray-100 sticky top-0 text-medium">
            <tr>
              <th rowSpan={2} className="border px-2 py-1 text-left">Date</th>
              <th className="border text-center py-1" colSpan={7}>Cutting</th>
              <th className="border text-center py-1 bg-[#009492] text-white" colSpan={10}>Sewing</th>
              {/* <th className="border text-center py-1" colSpan={2}>Wash</th> */}
              <th className="border text-center py-1" colSpan={7}>Finishing</th>
              <th rowSpan={2} className="border px-2 py-1">Carton Qty</th>
            </tr>
            <tr>

              {/* Cutting */}
              <th className="border px-2 py-1">Cutting Target</th>
              <th className="border px-2 py-1">Achieved</th>
              <th className="border px-2 py-1">Deviation</th>
              <th className="border px-2 py-1">Perf(%)</th>
              <th className="border px-2 py-1">TGT Effi(%)</th>
              <th className="border px-2 py-1">Ach Effi(%)</th>
              <th className="border px-2 py-1">Work Hour</th>

              {/* Sewing */}
              <th className="border px-2 py-1 bg-[#009492] text-white">Input Qty</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">Target Qty</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">Achieved Qty</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">Deviation</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">Perf(%)</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">TGT Effi(%)</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">Ach Effi(%)</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">Work Hour</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">CM</th>
              <th className="border px-2 py-1 bg-[#009492] text-white">FOB</th>

              {/* Wash */}
              {/* <th className="border px-2 py-1">Wash Send</th>
              <th className="border px-2 py-1">Wash Receive</th> */}

              {/* Finishing */}
              <th className="border px-2 py-1">Target Qty</th>
              <th className="border px-2 py-1">Achieved Qty</th>
              <th className="border px-2 py-1">Deviation</th>
              <th className="border px-2 py-1">Perf(%)</th>
              <th className="border px-2 py-1">TGT Effi(%)</th>
              <th className="border px-2 py-1">Ach Effi(%)</th>
              <th className="border px-2 py-1">Work Hour</th>

              {/* Carton */}
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {report && report.rows.map((row: IProductionStatusDto, index: number) => (
              row.SEWING_ACHI_QTY > 0 &&
              <tr key={index} className="even:bg-gray-50 text-center text-medium">
                <td className="border px-2 py-1">{formatDate(row.DATE_STR, "short")}</td>

                {/* cutting  */}
                <td className="border px-2 py-1">{row.CUTTING_TARGET_QTY}</td>
                <td className="border px-2 py-1">{row.CUTTING_ACHI_QTY}</td>
                <td
                  className={`border px-2 py-1 ${row.CUTTING_ACHI_QTY - row.CUTTING_TARGET_QTY < 0 ? "text-red-600" : "text-green-600"
                    }`}
                >
                  {row.CUTTING_ACHI_QTY - row.CUTTING_TARGET_QTY}
                </td>
                <td className="border px-2 py-1">{((row.CUTTING_ACHI_QTY * 100) / row.CUTTING_TARGET_QTY).toFixed(2)}%</td>
                <td className="border px-2 py-1">
                  {((row.CUTTING_TGT_PRODUCE_MIN * 100) / row.CUTTING_TGT_AVAIL_MIN).toFixed(2)}%
                </td>
                <td className="border px-2 py-1">
                  {(row.CUTTING_PRODUCE_MIN * 100 / row.CUTTING_AVAIL_MIN).toFixed(2)}%
                </td>
                <td className="border px-2 py-1">{row.CUTTING_ACTUAL_HOUR.toFixed(2)}</td>

                {/* Sewing */}
                <td className="border px-2 py-1">{row.SEWING_INPUT_QTY}</td>
                <td className="border px-2 py-1">{row.SEWING_TARGET_QTY}</td>
                <td className="border px-2 py-1">{row.SEWING_ACHI_QTY}</td>
                <td
                  className={`border px-2 py-1 ${row.SEWING_ACHI_QTY - row.SEWING_TARGET_QTY < 0 ? "text-red-600" : "text-green-600"
                    }`}
                >
                  {row.SEWING_ACHI_QTY - row.SEWING_TARGET_QTY}
                </td>
                <td className="border px-2 py-1">{((row.SEWING_ACHI_QTY * 100) / row.SEWING_TARGET_QTY).toFixed(2)}%</td>
                <td className="border px-2 py-1">
                  {((row.SEWING_TGT_PRODUCE_MIN * 100) / row.SEWING_TGT_AVAIL_MIN).toFixed(2)}%
                </td>
                <td className="border px-2 py-1">
                  {((row.SEWING_PRODUCE_MIN * 100) /
                    (row.SEWING_MP * 60 * row.SEWING_ACTUAL_HOUR)
                  ).toFixed(2)}
                  %
                </td>
                <td className="border px-2 py-1">{row.SEWING_ACTUAL_HOUR.toFixed(2)}</td>
                <td className="border px-2 py-1">${row.TOTAL_CM}</td>
                <td className="border px-2 py-1">${row.TOTAL_FOB}</td>

                {/* <td className="border px-2 py-1">{row.WashSendQty}</td>
                <td className="border px-2 py-1">{row.WashReceiveQty}</td> */}

                {/* Finishing */}
                <td className="border px-2 py-1">{row.FINISHING_TARGET_QTY}</td>
                <td className="border px-2 py-1">{row.FINISHING_ACHI_QTY}</td>
                <td
                  className={`border px-2 py-1 ${row.FINISHING_ACHI_QTY - row.FINISHING_TARGET_QTY < 0 ? "text-red-600" : "text-green-600"
                    }`}
                >
                  {row.FINISHING_ACHI_QTY - row.FINISHING_TARGET_QTY}
                </td>
                <td className="border px-2 py-1">{((row.FINISHING_ACHI_QTY * 100) / row.FINISHING_TARGET_QTY).toFixed(2)}%</td>
                <td className="border px-2 py-1">
                  {((row.FINISHING_TGT_PRODUCE_MIN * 100) / row.FINISHING_TGT_AVAIL_MIN).toFixed(2)}%
                </td>
                <td className="border px-2 py-1">
                  {(
                    (row.FINISHING_PRODUCE_MIN * 100) /
                    (row.FINISHING_MP * 60 * row.FINISHING_ACTUAL_HOUR)
                  ).toFixed(2)}
                  %
                </td>
                <td className="border px-2 py-1">{row.FINISHING_ACTUAL_HOUR.toFixed(2)}</td>

                <td className="border px-2 py-1">{row.CARTOON_QTY}</td>
              </tr>

            ))}

            {/* Optional Total Row */}
            {report.total && (
              <tr className="bg-gray-200 font-bold text-center text-medium">
                <td className="border px-2 py-1">Total</td>

                {/* cutting */}
                <td className="border px-2 py-1">{report.total.CUTTING_TARGET_QTY}</td>
                <td className="border px-2 py-1">{report.total.CUTTING_ACHI_QTY}</td>

                <td
                  className={`border px-2 py-1 ${report.total.CUTTING_ACHI_QTY - report.total.CUTTING_TARGET_QTY < 0
                    ? "text-red-600"
                    : "text-green-600"
                    }`}
                >
                  {report.total.CUTTING_ACHI_QTY - report.total.CUTTING_TARGET_QTY}
                </td>
                <td className="border px-2 py-1">{total && ((total.cutting_total_acheive_qty * 100) / total.cutting_total_tgt_qty).toFixed(2)}%</td>
                <td className="border px-2 py-1">
                  {((report.total.CUTTING_TGT_PRODUCE_MIN * 100) / report.total.CUTTING_TGT_AVAIL_MIN).toFixed(2)}%
                </td>
                <td className="border px-2 py-1">
                  {((report.total.CUTTING_PRODUCE_MIN * 100) / report.total.CUTTING_TGT_AVAIL_MIN).toFixed(2)}%
                </td>
                <td className="border px-2 py-1">{total && (total.cutting_actual_hour / total.total_row).toFixed(2)}</td>

                {/* sewing  */}
                <td className="border px-2 py-1">{report.total.SEWING_INPUT_QTY}</td>
                <td className="border px-2 py-1">{report.total.SEWING_TARGET_QTY}</td>
                <td className="border px-2 py-1">{report.total.SEWING_ACHI_QTY}</td>
                <td
                  className={`border px-2 py-1 ${report.total.SEWING_ACHI_QTY - report.total.SEWING_TARGET_QTY < 0
                    ? "text-red-600"
                    : "text-green-600"
                    }`}
                >
                  {report.total.SEWING_ACHI_QTY - report.total.SEWING_TARGET_QTY}
                </td>
                <td className="border px-2 py-1">{total && ((total.sewing_total_acheive_qty * 100) / total.sewing_total_tgt_qty).toFixed(2)}%</td>
                <td className="border px-2 py-1">
                  {((report.total.SEWING_TGT_PRODUCE_MIN * 100) / report.total.SEWING_TGT_AVAIL_MIN).toFixed(2)}%
                </td>
                <td className="border px-2 py-1">
                  {total && ((total.sewing_produce_min * 100) /
                    (total.sewing_avail_min)
                  ).toFixed(2)}
                  %
                </td>
                <td className="border px-2 py-1">{total && (total.sewing_actual_hour / total.total_row).toFixed(2)}</td>
                <td className="border px-2 py-1">${total && total.total_cm}</td>
                <td className="border px-2 py-1">${total && total.total_fob}</td>

                {/* <td className="border px-2 py-1">{report.total.WashSendQty}</td>
                <td className="border px-2 py-1">{report.total.WashReceiveQty}</td> */}

                {/* Finishing */}
                <td className="border px-2 py-1">{report.total.FINISHING_TARGET_QTY}</td>
                <td className="border px-2 py-1">{report.total.FINISHING_ACHI_QTY}</td>

                <td
                  className={`border px-2 py-1 ${report.total.FINISHING_ACHI_QTY - report.total.FINISHING_TARGET_QTY < 0
                    ? "text-red-600"
                    : "text-green-600"
                    }`}
                >
                  {report.total.FINISHING_ACHI_QTY - report.total.FINISHING_TARGET_QTY}
                </td>
                <td className="border px-2 py-1">{total && ((total.finishing_total_acheive_qty * 100) / total.finishing_total_tgt_qty).toFixed(2)}%</td>
                <td className="border px-2 py-1">
                  {((report.total.FINISHING_TGT_PRODUCE_MIN * 100) / report.total.FINISHING_TGT_AVAIL_MIN).toFixed(2)}%
                </td>
                <td className="border px-2 py-1">
                  {total && ((total.finishing_produce_min * 100) /
                    (total.finishing_avail_min)
                  ).toFixed(2)}
                  %
                </td>
                <td className="border px-2 py-1">{total && (total.finishing_actual_hour / total.total_row).toFixed(2)}</td>

                <td className="border px-2 py-1">{report.total.CARTOON_QTY}</td>
              </tr>
            )}

            {/* Average Row */}
            {avg && (
              <tr className="bg-gray-100 font-semibold text-center text-medium">
                <td className="border px-2 py-1">Average</td>

                {/* Cutting */}
                <td className="border px-2 py-1">{Math.round(avg.cutting_total_tgt_qty)}</td>
                <td className="border px-2 py-1">{Math.round(avg.cutting_total_acheive_qty)}</td>
                <td
                  className={`border px-2 py-1 ${avg.cutting_total_acheive_qty - avg.cutting_total_tgt_qty < 0 ? "text-red-500" : ""
                    }`}
                >
                  {Math.round(avg.cutting_total_acheive_qty - avg.cutting_total_tgt_qty)}
                </td>
                <td className="border px-2 py-1">
                  {/* {((avg.cutting_total_acheive_qty * 100) / avg.cutting_total_tgt_qty).toFixed(2)}% */}
                </td>

                <td colSpan={3} className="border px-2 py-1">-</td>

                {/* Sewing */}
                <td className="border px-2 py-1">-</td>
                <td className="border px-2 py-1">{Math.round(avg.sewing_total_tgt_qty)}</td>
                <td className="border px-2 py-1">{Math.round(avg.sewing_total_acheive_qty)}</td>
                <td
                  className={`border px-2 py-1 ${avg.sewing_total_acheive_qty - avg.sewing_total_tgt_qty < 0 ? "text-red-500" : ""
                    }`}
                >
                  {Math.round(avg.sewing_total_acheive_qty - avg.sewing_total_tgt_qty)}
                </td>
                <td className="border px-2 py-1">
                  {/* {((avg.sewing_total_acheive_qty * 100) / avg.sewing_total_tgt_qty).toFixed(2)}% */}
                </td>
                <td colSpan={2} className="border px-2 py-1">-</td>
                <td className="border px-2 py-1">{avg.sewing_actual_hour.toFixed(2)}</td>
                <td className="border px-2 py-1">${Math.round(avg.total_cm)}</td>
                <td className="border px-2 py-1">${Math.round(avg.total_fob)}</td>

                {/* Finishing */}
                <td className="border px-2 py-1">{Math.round(avg.finishing_total_tgt_qty)}</td>
                <td className="border px-2 py-1">{Math.round(avg.finishing_total_acheive_qty)}</td>
                <td
                  className={`border px-2 py-1 ${avg.finishing_total_acheive_qty - avg.finishing_total_tgt_qty < 0 ? "text-red-500" : ""
                    }`}
                >
                  {Math.round(avg.finishing_total_acheive_qty - avg.finishing_total_tgt_qty)}
                </td>
                <td className="border px-2 py-1">
                  {/* {((avg.finishing_total_acheive_qty * 100) / avg.finishing_total_tgt_qty).toFixed(2)}% */}
                </td>
                <td colSpan={2} className="border px-2 py-1">-</td>
                <td className="border px-2 py-1">{avg.finishing_actual_hour.toFixed(2)}</td>
                <td className="border px-2 py-1">-</td>
              </tr>
            )}


          </tbody>
        </table>
      }


    </div>
  );
};

export default GarmentsProductionStatusReport;
