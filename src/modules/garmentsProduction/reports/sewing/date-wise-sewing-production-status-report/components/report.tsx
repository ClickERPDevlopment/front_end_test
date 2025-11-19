/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportTable from "./report-table";
import ReportHeader from "./report-header";
import { DateWiseSewingProductionReportDto } from "../date-wise-sewing-production-report-type";

function Report({
  data,
}: {
  data: DateWiseSewingProductionReportDto[];
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: DateWiseSewingProductionReportDto[], keys: string[]) {
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
      items: DateWiseSewingProductionReportDto[];
    };
  }

  let groupedData: IGroupedBy = {};

  if (data) {
    groupedData = groupBy(data, [""]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const uniqueCompany: Set<string> = new Set();

  data.forEach((item) => {
    if (item.COMPANY_PREFIX != null) uniqueCompany.add(item.COMPANY_PREFIX);
  });

  const companyHeader = Array.from(uniqueCompany);

  return (
    <div>
      <div className="p-2">
        <ReportHeader
          masterData={data[0]}
          searchParam={{ fromDate: data[0]?.SEWINGDATE || "", toDate: data[data.length - 1]?.SEWINGDATE || "" }}
        />

        {uniqueKeysArray?.map((key) => (
          <ReportTable
            key={key}
            data={groupedData[key].items}
            companyHeader={companyHeader}
          ></ReportTable>
        ))}

        <div>
        </div>
      </div>
    </div>
  );
}

export default Report;
