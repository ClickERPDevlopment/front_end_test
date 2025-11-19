/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { SewingSummaryReportType } from "../sewing-summary-report-type";

function Report({
  data,
  monthData,
  searchParam,
}: {
  data: SewingSummaryReportType[];
  monthData: SewingSummaryReportType[];
  searchParam: { fromDate: string, toDate: string };
}) {

  const firstHeader = [
    "Particular Sewing",
  ];
  const secondHeader = [
    "Group Total",
  ];

  const uniqueCompany: Set<string> = new Set();

  data.forEach((item) => {
    if (item.COMPANY_PREFIX != null) uniqueCompany.add(item.COMPANY_PREFIX);
  });

  const companyHeader = Array.from(uniqueCompany);

  return (
    <div>
      <div className="p-2 flex flex-col items-center">
        <ReportHeader
          searchParam={searchParam}
          masterData={data[0]}
        />

        <ReportTable
          data={data}
          firstHeader={firstHeader}
          companyHeader={companyHeader}
          secondHeader={secondHeader}
          isMonthView={false}
          searchParam={searchParam}
        ></ReportTable>
        <div className="mt-5"></div>
        <ReportTable
          data={monthData}
          firstHeader={firstHeader}
          companyHeader={companyHeader}
          secondHeader={secondHeader}
          isMonthView={true}
          searchParam={searchParam}
        ></ReportTable>

        <div>
        </div>
      </div>
    </div>
  );
}

export default Report;
