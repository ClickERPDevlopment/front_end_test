/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { EmbellishmentHourlyProductionReportType } from "../embellishment-hourly-production-report-type";


function Report({
  data,
}: {
  data: EmbellishmentHourlyProductionReportType[];
}) {

  //set table header
  const firstHeader = [
    "PARTY",
    "ORDER NO",
    "BUYER",
    "STYLE",
    "PO",
    "COLOR",
    "SIZE",
    "PART",
  ];

  //set second header
  const secondHeader = [
    "TOTAL"
  ];

  const uniqueHours: Set<string> = new Set();

  data.forEach((item) => {
    if (item.PRODUCTION_HOUR != null) uniqueHours.add(item.PRODUCTION_HOUR);
  });

  const hourHeader = Array.from(uniqueHours).sort((a, b) => parseInt(a) - parseInt(b))

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950">
      <div className="p-2">
        <ReportHeader
          data={data}
        />

        <div className="text-center">
          <p>
            <span className="font-bold">Machine No: </span>{data[0]?.WORKSTATION} <span className="font-bold">EMB Type: </span>{data[0]?.TYPE}
          </p>
        </div>

        <ReportTable
          data={data}
          firstHeader={firstHeader}
          secondHeader={secondHeader}
          hourHeader={hourHeader}
        ></ReportTable>

        <div style={{ marginTop: "80px" }}>
          {/* <ReportFooter data={data}></ReportFooter> */}
        </div>
      </div>
    </div>
  );
}

export default Report;
