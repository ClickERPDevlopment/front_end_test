import moment from "moment";
import React from "react";
import { DateWiseCuttingProoductionReportType } from "../date-wise-cutting-production-report-type";
import useAppClient from "@/hooks/use-AppClient";

function ReportTable({
  data,
  companyHeader,
}: {
  data: DateWiseCuttingProoductionReportType[];
  companyHeader: string[] | null;
}) {

  const groupedData: Record<string, Record<string, DateWiseCuttingProoductionReportType>> = {};

  data.forEach((item) => {
    const dateKey = moment(item.CUTTING_DATE).format("YYYY-MM-DD");
    const companyKey = item.COMPANY_PREFIX || "UNKNOWN";

    if (!groupedData[dateKey]) groupedData[dateKey] = {};

    if (!groupedData[dateKey][companyKey]) {
      groupedData[dateKey][companyKey] = { ...item };
    } else {
      const existing = groupedData[dateKey][companyKey];
      existing.TARGET += item.TARGET;
      existing.CUTTING_QTY += item.CUTTING_QTY;
      existing.WORKING_HOUR = item.WORKING_HOUR;
    }
  });

  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const companySummary: Record<string, any> = {};

  sortedDates.forEach((date) => {
    companyHeader?.forEach((prefix) => {
      if (!companySummary[prefix]) {
        companySummary[prefix] = {
          TARGET: 0,
          CUTTING_QTY: 0,
          WORKING_HOUR: 0,
          PER: 0,
          COUNT: 0,
        };
      }

      const item = groupedData[date][prefix];
      if (item) {
        companySummary[prefix].TARGET += item.TARGET;
        companySummary[prefix].CUTTING_QTY += item.CUTTING_QTY;
        companySummary[prefix].WORKING_HOUR += item.WORKING_HOUR;
        companySummary[prefix].PER += ((item.CUTTING_QTY / item.TARGET) * 100) || 0;
        companySummary[prefix].COUNT++;
      }
    });
  });


  const grandTotal = {
    TARGET: 0,
    CUTTING_QTY: 0,
    WORKING_HOUR: 0,
  };

  const avgTotal = {
    TARGET: 0,
    CUTTING_QTY: 0,
    WORKING_HOUR: 0,
  };


  Object.values(companySummary).forEach((summary) => {
    grandTotal.TARGET += summary.TARGET;
    grandTotal.CUTTING_QTY += summary.CUTTING_QTY;
    grandTotal.WORKING_HOUR += summary.WORKING_HOUR;

    avgTotal.TARGET += summary.TARGET / summary.COUNT;
    avgTotal.CUTTING_QTY += summary.CUTTING_QTY / summary.COUNT;
    avgTotal.WORKING_HOUR += summary.WORKING_HOUR / summary.COUNT;

  });

  const client = useAppClient();

  let grandTotalTarget = 0;
  let grandTotalCuttingQty = 0;
  let grandTotalWorkingHour = 0;

  let grandTotalDataCount = 0;
  let grandTotalPerformancePercent = 0;

  let grandTotalCompanyCount = companyHeader ? companyHeader.length : 0;

  return (
    <div className="text-sm mt-3">
      <table className="border-collapse border border-gray-950 w-full">
        <thead style={{ backgroundColor: "#a4f4cf" }}>
          <tr>
            <th rowSpan={2} className="border border-gray-950 p-1 text-center ">
              Date
            </th>
            {companyHeader?.map((company) => (
              <th key={company} colSpan={5} className="border border-gray-950 p-1 text-center ">
                {company}
              </th>
            ))}

            <th colSpan={5} className="border border-gray-950 p-1 text-center ">
              {
                client.currentClient == client.FAME && "FAME GROUP"
              }
              {
                client.currentClient == client.EURO && "EUROTEX GROUP"
              }
            </th>

          </tr>
          <tr>
            {companyHeader?.map((company) => (
              <React.Fragment key={company}>
                <th className="border border-gray-950 p-1 text-center">Target Qty</th>
                <th className="border border-gray-950 p-1 text-center">Achi. Qty</th>
                <th className="border border-gray-950 p-1 text-center">Deviation</th>
                <th className="border border-gray-950 p-1 text-center">Per (%)</th>
                <th className="border border-gray-950 p-1 text-center">Work Hour</th>
              </React.Fragment>
            ))}
            <React.Fragment>
              <th className="border border-gray-950 p-1 text-center">Target Qty</th>
              <th className="border border-gray-950 p-1 text-center">Achi. Qty</th>
              <th className="border border-gray-950 p-1 text-center">Deviation</th>
              <th className="border border-gray-950 p-1 text-center">Per(%)</th>
              <th className="border border-gray-950 p-1 text-center">Work Hour</th>
            </React.Fragment>
          </tr>
        </thead>
        <tbody>

          {sortedDates.map((date) => {

            let totalTarget = 0;
            let totalCuttingQty = 0;
            let totalWorkingHour = 0;

            let companyCount = 0;

            grandTotalDataCount += 1;

            const tableRow = <React.Fragment key={date}>
              <tr key={date}>
                <td className="border border-gray-950 p-1 text-center font-medium  text-nowrap">
                  {moment(date).format("DD-MMM-YYYY")}
                </td>

                {companyHeader?.map((prefix) => {
                  const item = groupedData[date][prefix];

                  companyCount += item ? 1 : 0;

                  if (!item) {
                    return (
                      <React.Fragment key={prefix}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <td key={i} style={{ backgroundColor: i == 4 ? "#d5e6ef" : "" }} className="border border-gray-950 p-1 text-center">-</td>
                        ))}
                      </React.Fragment>
                    );
                  }

                  const deviation = item.CUTTING_QTY - item.TARGET;
                  const percent = item.TARGET > 0 ? ((item.CUTTING_QTY / item.TARGET) * 100) : 0;

                  totalTarget += item.TARGET;
                  totalCuttingQty += item.CUTTING_QTY;
                  totalWorkingHour += item.WORKING_HOUR;

                  grandTotalTarget += item.TARGET;
                  grandTotalCuttingQty += item.CUTTING_QTY;
                  grandTotalWorkingHour += item.WORKING_HOUR;

                  return (
                    <React.Fragment key={prefix}>
                      <td className="border border-gray-950 p-1 text-center">{Math.round(item.TARGET)}</td>
                      <td className="border border-gray-950 p-1 text-center">{Math.round(item.CUTTING_QTY)}</td>
                      <td className="border border-gray-950 p-1 text-center">{Math.round(deviation)}</td>
                      <td className="border border-gray-950 p-1 text-center">{percent.toFixed(2)} %</td>
                      <td style={{ backgroundColor: "#d5e6ef" }} className="border border-gray-950 p-1 text-center">{item.WORKING_HOUR.toFixed(2)}</td>
                    </React.Fragment>
                  );
                })}

                <React.Fragment>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(totalTarget)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(totalCuttingQty)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(totalCuttingQty - totalTarget)}</td>
                  <td className="border border-gray-950 p-1 text-center">{(totalCuttingQty * 100 / totalTarget).toFixed(2)} %</td>
                  <td style={{ backgroundColor: "#d5e6ef" }} className="border border-gray-950 p-1 text-center">{(totalWorkingHour / companyCount).toFixed(2)}</td>
                </React.Fragment>
              </tr>
            </React.Fragment>;

            grandTotalPerformancePercent += (totalTarget > 0) ? (totalCuttingQty * 100 / totalTarget) : 0;

            return tableRow;

          })}

          <tr className="bg-green-100 font-semibold" style={{ backgroundColor: "#fbffdd" }}>
            <td className="border border-gray-950 p-1 text-center">AVG</td>
            {companyHeader?.map((prefix) => {
              const summary = companySummary[prefix];
              if (!summary) {
                return (
                  <React.Fragment key={prefix}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <td key={i} className="border border-gray-950 p-1 text-center">-</td>
                    ))}
                  </React.Fragment>
                );
              }

              const target = summary.TARGET / summary.COUNT;
              const cuttingQty = summary.CUTTING_QTY / summary.COUNT;
              const deviation = (summary.CUTTING_QTY - summary.TARGET) / summary.COUNT;
              const percent = (summary.CUTTING_QTY * 100 / summary.TARGET);
              const workHour = summary.WORKING_HOUR / summary.COUNT;

              return (
                <React.Fragment key={prefix}>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(target)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(cuttingQty)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(deviation)}</td>
                  <td rowSpan={2} className="border border-gray-950 p-1 text-center">{percent.toFixed(2)} %</td>
                  <td style={{ backgroundColor: "#d5e6ef" }} rowSpan={2} className="border border-gray-950 p-1 text-center">{(workHour).toFixed(2)}</td>
                </React.Fragment>
              );
            })}

            <React.Fragment>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalTarget / grandTotalDataCount)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalCuttingQty / grandTotalDataCount)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round((grandTotalCuttingQty - grandTotalTarget) / grandTotalDataCount)}</td>
              <td rowSpan={2} className="border border-gray-950 p-1 text-center">{(grandTotalCuttingQty * 100 / grandTotalTarget).toFixed(2)} %</td>
              <td rowSpan={2} style={{ backgroundColor: "#d5e6ef" }} className="border border-gray-950 p-1 text-center">{(grandTotalWorkingHour / grandTotalDataCount / grandTotalCompanyCount).toFixed(2)}</td>
            </React.Fragment>

          </tr>

          <tr className="bg-green-100 font-semibold" style={{ backgroundColor: "#fbffdd" }}>
            <td className="border border-gray-950 p-1 text-center">Grand Total</td>
            {companyHeader?.map((prefix) => {
              const summary = companySummary[prefix];
              if (!summary) {
                return (
                  <React.Fragment key={prefix}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <td key={i} className="border border-gray-950 p-1 text-center">-</td>
                    ))}
                  </React.Fragment>
                );
              }

              const deviation = summary.CUTTING_QTY - summary.TARGET;

              return (
                <React.Fragment key={prefix}>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(summary.TARGET)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(summary.CUTTING_QTY)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(deviation)}</td>
                </React.Fragment>
              );
            })}

            <React.Fragment>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalTarget)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalCuttingQty)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalCuttingQty - grandTotalTarget)}</td>
            </React.Fragment>
          </tr>

        </tbody>
      </table>

      <div className="mt-10 text-center font-bold">
        <table className="border-collapse border border-gray-950 w-[60%] ms-auto me-auto" style={{ fontSize: "18px" }}>
          <thead style={{ backgroundColor: "#a4f4cf" }}>
            <tr>
              <th className="border border-gray-950 p-1 text-center" colSpan={5} style={{ fontSize: "20px" }}>
                {
                  client.currentClient == client.FAME && "FAME GROUP"
                }
                {
                  client.currentClient == client.EURO && "EUROTEX GROUP"
                }
              </th>
            </tr>
            <tr className="uppercase">
              <th className="border border-gray-950 p-1 text-center">Company</th>
              <th className="border border-gray-950 p-1 text-center">Target Qty</th>
              <th className="border border-gray-950 p-1 text-center">Achi. Qty</th>
              <th className="border border-gray-950 p-1 text-center">Per(%)</th>
              <th className="border border-gray-950 p-1 text-center">Work Hour</th>
            </tr>
          </thead>
          <tbody>
            {companyHeader?.map((prefix) => {
              const summary = companySummary[prefix];
              if (!summary) return null;

              const percent = (summary.PER / summary.COUNT);
              const workingHour = (summary.WORKING_HOUR / summary.COUNT);

              return (
                <tr key={prefix}>
                  <td className="border border-gray-950 p-1 text-center">{prefix}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(summary.TARGET)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(summary.CUTTING_QTY)}</td>
                  <td className="border border-gray-950 p-1 text-center">{(summary.CUTTING_QTY * 100 / summary.TARGET).toFixed(2)} %</td>
                  <td className="border border-gray-950 p-1 text-center">{(workingHour).toFixed(2)}</td>
                </tr>
              );
            })}

            <tr style={{ backgroundColor: "#fbffdd" }}>
              <td className="border border-gray-950 p-1 text-center">
                {
                  client.currentClient == client.FAME && "FAME GROUP"
                }
                {
                  client.currentClient == client.EURO && "EUROTEX GROUP"
                }
              </td>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalTarget)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalCuttingQty)}</td>
              <td className="border border-gray-950 p-1 text-center">{(grandTotalCuttingQty * 100 / grandTotalTarget).toFixed(2)} %</td>
              <td className="border border-gray-950 p-1 text-center">{(grandTotalWorkingHour / grandTotalDataCount / grandTotalCompanyCount).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportTable;
