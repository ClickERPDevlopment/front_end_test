/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { SewingProductionStatusReportType } from "../sewing-production-status-report-type";
import { SewingHourlyProductionStatusReportType } from "../sewing-hourly-production-status-report-type";

function Report({
  data,
  sewingHourlyProductionData
}: {
  data: SewingProductionStatusReportType[];
  sewingHourlyProductionData: SewingHourlyProductionStatusReportType[]
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: SewingProductionStatusReportType[], keys: string[]) {
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
      items: SewingProductionStatusReportType[];
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
    "Grand Total",
  ];

  const uniqueCompany: Set<string> = new Set();

  data.forEach((item) => {
    if (item.PREFIX != null) uniqueCompany.add(item.PREFIX);
  });

  const companyHeader = Array.from(uniqueCompany);

  return (
    <div>
      <div className="p-2">
        <ReportHeader
          masterData={data[0]}
        />

        {uniqueKeysArray?.map((key) => (
          <ReportTable
            key={key}
            data={groupedData[key].items}
            sewingHourlyProductionData={sewingHourlyProductionData}
            firstHeader={firstHeader}
            companyHeader={companyHeader}
            secondHeader={secondHeader}
          ></ReportTable>
        ))}

        <div>
        </div>
      </div>
    </div>
  );
}

export default Report;
