import moment from "moment";
import React from "react";
import { DateWiseSewingProductionReportDto } from "../date-wise-sewing-production-report-type";
import useAppClient from "@/hooks/use-AppClient";

function ReportTable({
  data,
  companyHeader,
}: {
  data: DateWiseSewingProductionReportDto[];
  companyHeader: string[] | null;
}) {

  const groupedData: Record<string, Record<string, DateWiseSewingProductionReportDto>> = {};

  data.forEach((item) => {
    const dateKey = moment(item.SEWINGDATE).format("YYYY-MM-DD");
    const companyKey = item.COMPANY_PREFIX || "UNKNOWN";

    if (!groupedData[dateKey]) groupedData[dateKey] = {};

    if (!groupedData[dateKey][companyKey]) {
      groupedData[dateKey][companyKey] = { ...item };
    } else {
      const existing = groupedData[dateKey][companyKey];
      existing.TARGET += item.TARGET;
      existing.SEWING_OUTPUT += item.SEWING_OUTPUT;
      existing.TOTAL_CM += item.TOTAL_CM;
      existing.TOTAL_FOB += item.TOTAL_FOB;
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
          SEWING_OUTPUT: 0,
          TOTAL_CM: 0,
          TOTAL_FOB: 0,
          WORKING_HOUR: 0,
          PER: 0,
          COUNT: 0,
        };
      }

      const item = groupedData[date][prefix];
      if (item) {
        companySummary[prefix].TARGET += item.TARGET;
        companySummary[prefix].SEWING_OUTPUT += item.SEWING_OUTPUT;
        companySummary[prefix].TOTAL_CM += item.TOTAL_CM;
        companySummary[prefix].TOTAL_FOB += item.TOTAL_FOB;
        companySummary[prefix].WORKING_HOUR += item.WORKING_HOUR;
        companySummary[prefix].PER += ((item.SEWING_OUTPUT / item.TARGET) * 100) || 0;
        companySummary[prefix].COUNT++;
      }
    });
  });


  const grandTotal = {
    TARGET: 0,
    SEWING_OUTPUT: 0,
    TOTAL_CM: 0,
    TOTAL_FOB: 0,
    WORKING_HOUR: 0,
  };

  const avgTotal = {
    TARGET: 0,
    SEWING_OUTPUT: 0,
    TOTAL_CM: 0,
    TOTAL_FOB: 0,
    WORKING_HOUR: 0,
  };


  Object.values(companySummary).forEach((summary) => {
    grandTotal.TARGET += summary.TARGET;
    grandTotal.SEWING_OUTPUT += summary.SEWING_OUTPUT;
    grandTotal.TOTAL_CM += summary.TOTAL_CM;
    grandTotal.TOTAL_FOB += summary.TOTAL_FOB;
    grandTotal.WORKING_HOUR += summary.WORKING_HOUR;

    avgTotal.TARGET += summary.TARGET / summary.COUNT;
    avgTotal.SEWING_OUTPUT += summary.SEWING_OUTPUT / summary.COUNT;
    avgTotal.TOTAL_CM += summary.TOTAL_CM / summary.COUNT;
    avgTotal.TOTAL_FOB += summary.TOTAL_FOB / summary.COUNT;
    avgTotal.WORKING_HOUR += summary.WORKING_HOUR / summary.COUNT;

  });


  let grandTotalTarget = 0;
  let grandTotalSewingQty = 0;
  let grandTotalWorkingHour = 0;
  let grandTotalFob = 0;
  let grandTotalCM = 0;

  let grandTotalDataCount = 0;
  let grandTotalPerformancePercent = 0;
  let grandTotalCompanyCount = companyHeader ? companyHeader.length : 0;


  const client = useAppClient();

  return (
    <div className="text-sm mt-3">
      <table className="data-table border-collapse border border-gray-950 w-full">
        <thead>
          <tr style={{ backgroundColor: "#A7F3D0" }}>
            <th rowSpan={2} className="border border-gray-950 p-1 text-center ">
              Date
            </th>
            {companyHeader?.map((company) => (
              <th key={company} colSpan={7} className="border border-gray-950 p-1 text-center ">
                {company}
              </th>
            ))}
            <th colSpan={7} className="border border-gray-950 p-1 text-center ">
              {
                client.currentClient == client.FAME && "FAME GROUP"
              }
              {
                client.currentClient == client.EURO && "EUROTEX GROUP"
              }
            </th>
          </tr>
          <tr style={{ backgroundColor: "#A7F3D0" }}>
            {companyHeader?.map((company) => (
              <React.Fragment key={company}>
                <th className="border border-gray-950 p-1 text-center">Target Qty</th>
                <th className="border border-gray-950 p-1 text-center">Achi. Qty</th>
                <th className="border border-gray-950 p-1 text-center">Deviation</th>
                <th className="border border-gray-950 p-1 text-center">Per (%)</th>
                <th className="border border-gray-950 p-1 text-center">CM ($)</th>
                <th className="border border-gray-950 p-1 text-center">FOB ($)</th>
                <th className="border border-gray-950 p-1 text-center">Work Hour</th>
              </React.Fragment>
            ))}

            <React.Fragment>
              <th className="border border-gray-950 p-1 text-center">Target Qty</th>
              <th className="border border-gray-950 p-1 text-center">Achi. Qty</th>
              <th className="border border-gray-950 p-1 text-center">Deviation</th>
              <th className="border border-gray-950 p-1 text-center">Per(%)</th>
              <th className="border border-gray-950 p-1 text-center">CM $</th>
              <th className="border border-gray-950 p-1 text-center">FOB $</th>
              <th className="border border-gray-950 p-1 text-center">Work Hour</th>
            </React.Fragment>
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date) => {


            let totalTarget = 0;
            let totalSewingQty = 0;
            let totalWorkingHour = 0;
            let totalFob = 0;
            let totalCM = 0;
            let companyCount = 0;

            grandTotalDataCount += 1;



            const tableRow = <tr key={date}>
              <td className="border border-gray-950 p-1 text-center font-medium  text-nowrap">
                {moment(date).format("DD-MMM-YYYY")}
              </td>

              {companyHeader?.map((prefix) => {

                const item = groupedData[date][prefix];

                companyCount += item ? 1 : 0;

                if (!item) {
                  return (
                    <React.Fragment key={prefix}>
                      {Array.from({ length: 7 }).map((_, i) => (
                        <td key={i} className="border border-gray-950 p-1 text-center" style={{ backgroundColor: i == 6 ? "#d5e6ef" : "" }}>-</td>
                      ))}
                    </React.Fragment>
                  );
                }

                const deviation = item.SEWING_OUTPUT - item.TARGET;
                const percent =
                  item.TARGET > 0 ? ((item.SEWING_OUTPUT / item.TARGET) * 100).toFixed(2) : "0.00";


                totalTarget += item.TARGET;
                totalSewingQty += item.SEWING_OUTPUT;
                totalWorkingHour += item.WORKING_HOUR;
                totalFob += item.TOTAL_FOB;
                totalCM += item.TOTAL_CM;

                grandTotalTarget += item.TARGET;
                grandTotalSewingQty += item.SEWING_OUTPUT;
                grandTotalWorkingHour += item.WORKING_HOUR;
                grandTotalFob += item.TOTAL_FOB;
                grandTotalCM += item.TOTAL_CM;

                return (
                  <React.Fragment key={prefix}>
                    <td className="border border-gray-950 p-1 text-center">{Math.round(item.TARGET)}</td>
                    <td className="border border-gray-950 p-1 text-center">{Math.round(item.SEWING_OUTPUT)}</td>
                    <td className="border border-gray-950 p-1 text-center">{Math.round(deviation)}</td>
                    <td className="border border-gray-950 p-1 text-center text-nowrap">{percent} %</td>
                    <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(item.TOTAL_CM)}</td>
                    <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(item.TOTAL_FOB)}</td>
                    <td style={{ backgroundColor: "#d5e6ef" }} className="border border-gray-950 p-1 text-center">{item.WORKING_HOUR.toFixed(2)}</td>
                  </React.Fragment>
                );
              })}

              <React.Fragment>
                <td className="border border-gray-950 p-1 text-center">{Math.round(totalTarget)}</td>
                <td className="border border-gray-950 p-1 text-center">{Math.round(totalSewingQty)}</td>
                <td className="border border-gray-950 p-1 text-center">{Math.round(totalSewingQty - totalTarget)}</td>
                <td className="border border-gray-950 p-1 text-center text-nowrap">{(totalSewingQty * 100 / totalTarget).toFixed(2)} %</td>
                <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(totalCM)}</td>
                <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(totalFob)}</td>
                <td className="border border-gray-950 p-1 text-center" style={{ backgroundColor: "#d5e6ef" }}>{(totalWorkingHour / companyCount).toFixed(2)}</td>
              </React.Fragment>

            </tr>

            grandTotalPerformancePercent += (totalTarget > 0) ? (totalSewingQty * 100 / totalTarget) : 0;

            return tableRow;
          })}



          <tr className="bg-green-100 font-semibold" style={{ backgroundColor: "#fbffdd" }}>
            <td className="border border-gray-950 p-1 text-center">AVG</td>
            {companyHeader?.map((prefix) => {
              const summary = companySummary[prefix];
              if (!summary) {
                return (
                  <React.Fragment key={prefix}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <td key={i} className="border border-gray-950 p-1 text-center">-</td>
                    ))}
                  </React.Fragment>
                );
              }

              const target = summary.TARGET / summary.COUNT;
              const sewingOutput = summary.SEWING_OUTPUT / summary.COUNT;
              const deviation = (summary.SEWING_OUTPUT - summary.TARGET) / summary.COUNT;
              //const percent = (summary.PER / summary.COUNT);
              const cm = summary.TOTAL_CM / summary.COUNT;
              const fob = summary.TOTAL_FOB / summary.COUNT;
              const workHour = summary.WORKING_HOUR / summary.COUNT;

              const percent = summary.SEWING_OUTPUT * 100 / summary.TARGET;

              return (
                <React.Fragment key={prefix}>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(target)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(sewingOutput)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(deviation)}</td>
                  <td rowSpan={2} className="border border-gray-950 p-1 text-center text-nowrap">{percent.toFixed(2)} %</td>
                  <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(cm)}</td>
                  <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(fob)}</td>
                  <td style={{ backgroundColor: "#d5e6ef" }} rowSpan={2} className="border border-gray-950 p-1 text-center">{(workHour).toFixed(2)}</td>
                </React.Fragment>
              );
            })}


            <React.Fragment>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalTarget / grandTotalDataCount)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalSewingQty / grandTotalDataCount)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round((grandTotalSewingQty - grandTotalTarget) / grandTotalDataCount)}</td>
              <td rowSpan={2} className="border border-gray-950 p-1 text-center text-nowrap">{(grandTotalSewingQty * 100 / grandTotalTarget).toFixed(2)} %</td>
              <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(grandTotalFob / grandTotalDataCount)}</td>
              <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(grandTotalCM / grandTotalDataCount)}</td>
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
                    {Array.from({ length: 6 }).map((_, i) => (
                      <td key={i} className="border border-gray-950 p-1 text-center">-</td>
                    ))}
                  </React.Fragment>
                );
              }

              const deviation = summary.SEWING_OUTPUT - summary.TARGET;

              return (
                <React.Fragment key={prefix}>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(summary.TARGET)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(summary.SEWING_OUTPUT)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(deviation)}</td>
                  <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(summary.TOTAL_CM)}</td>
                  <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(summary.TOTAL_FOB)}</td>
                </React.Fragment>
              );
            })}


            <React.Fragment>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalTarget)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalSewingQty)}</td>
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalSewingQty - grandTotalTarget)}</td>
              <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(grandTotalCM)}</td>
              <td className="border border-gray-950 p-1 text-center text-nowrap">${Math.round(grandTotalFob)}</td>
            </React.Fragment>

          </tr>

        </tbody>
      </table>

      <div className="mt-10 text-center font-bold">
        <table className="border-collapse border border-gray-950 w-[60%] ms-auto me-auto" style={{ fontSize: "18px" }}>
          <thead style={{ backgroundColor: "#A7F3D0" }}>
            <tr>
              <th className="border border-gray-950 p-1 text-center" colSpan={7} style={{ fontSize: "20px" }}>
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
              <th className="border border-gray-950 p-1 text-center">PER (%)</th>
              <th className="border border-gray-950 p-1 text-center">CM ($)</th>
              <th className="border border-gray-950 p-1 text-center">FOB ($)</th>
              <th className="border border-gray-950 p-1 text-center">Work Hour</th>
            </tr>
          </thead>
          <tbody>
            {companyHeader?.map((prefix) => {
              const summary = companySummary[prefix];
              if (!summary) return null;

              const percent = (summary.SEWING_OUTPUT * 100 / summary.TARGET);
              const workingHour = (summary.WORKING_HOUR / summary.COUNT);

              return (
                <tr key={prefix}>
                  <td className="border border-gray-950 p-1 text-center">{prefix}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(summary.TARGET)}</td>
                  <td className="border border-gray-950 p-1 text-center">{Math.round(summary.SEWING_OUTPUT)}</td>
                  <td className="border border-gray-950 p-1 text-center">{(percent).toFixed(2)} %</td>
                  <td className="border border-gray-950 p-1 text-center">${Math.round(summary.TOTAL_CM)}</td>
                  <td className="border border-gray-950 p-1 text-center">${Math.round(summary.TOTAL_FOB)}</td>
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
              <td className="border border-gray-950 p-1 text-center">{Math.round(grandTotalSewingQty)}</td>
              <td className="border border-gray-950 p-1 text-center">{(grandTotalSewingQty * 100 / grandTotalTarget).toFixed(2)} %</td>
              <td className="border border-gray-950 p-1 text-center">${Math.round(grandTotalCM)}</td>
              <td className="border border-gray-950 p-1 text-center">${Math.round(grandTotalFob)}</td>
              <td className="border border-gray-950 p-1 text-center">{(grandTotalWorkingHour / grandTotalDataCount / grandTotalCompanyCount).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportTable;
