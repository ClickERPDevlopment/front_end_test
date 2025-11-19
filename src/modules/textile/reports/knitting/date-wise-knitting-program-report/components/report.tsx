/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { DateWiseKnittingProgramReportType } from "../date-wise-knitting-program-report-type";

function Report({
  data,
  searchParam,
}: {
  data: DateWiseKnittingProgramReportType[];
  searchParam: { dtChecked: boolean, fromDate: string, toDate: string, factoryId: number };
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: DateWiseKnittingProgramReportType[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface IGroupedBy {
    [key: string]: {
      items: DateWiseKnittingProgramReportType[];
    };
  }

  let groupedData: IGroupedBy = {};

  if (data) {
    groupedData = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "Date",
  ];
  const secondHeader = [
    "Total In-house Program",
    "Total Outside Program",
    "Total Knit Program",
  ];

  const uniqueCompany: Set<string> = new Set();

  data.forEach((item) => {
    if (item.INTER_COMPANY != null) uniqueCompany.add(item.INTER_COMPANY);
  });

  const companyHeader = Array.from(uniqueCompany);

  return (
    <div>
      <div className="p-2">
        <ReportHeader
          searchParam={searchParam}
          masterData={data[0]}
        />

        {uniqueKeysArray?.map((key) => (
          <ReportTable
            key={key}
            data={groupedData[key].items}
            firstHeader={firstHeader}
            companyHeader={companyHeader}
            secondHeader={secondHeader}
          ></ReportTable>
        ))}

        <div>
          {/* <ReportFooter masterData={data[0]}></ReportFooter> */}
        </div>
      </div>
    </div>
  );
}

export default Report;
