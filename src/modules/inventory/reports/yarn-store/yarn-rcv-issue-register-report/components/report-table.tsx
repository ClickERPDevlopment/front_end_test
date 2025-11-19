/* eslint-disable @typescript-eslint/no-explicit-any */
import { YarnRcvIssueRegisterReportType } from "../yarn-rcv-issue-register-report-index-type";
import ReportSubgroup from "./report-subgroup";

function ReportTable({
  data,
  firstHeader,
}: {
  data: YarnRcvIssueRegisterReportType[];
  firstHeader: string[] | null;
}) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: YarnRcvIssueRegisterReportType[],
    keys: string[]
  ) {
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

  interface GroupedByDate {
    [key: string]: {
      items: YarnRcvIssueRegisterReportType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (data) {
    groupedByDate = groupBy(data, ["LC_NO", "YARN", "BRAND", "YARN_RECEIVED_DATE", "BUYER", "PO_NO", "CHALLAN_NO", "YARN_LOT_NUMBER", "KNITTING_HOUSE", "IMPORT_TYPE", "PER_CTN_QTY"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  let totalRcvKg = 0;
  let totalRcvCtn = 0;

  return (
    <>
      {uniqueKeysArray?.map((key, index) => {
        const data = groupedByDate[key].items

        totalRcvKg += data.reduce((acc, item) => acc + item.RECEIVE_KG, 0);
        totalRcvCtn += data.reduce((acc, item) => acc + item.RECEIVE_CTN, 0);

        const tempRcvKg = totalRcvKg;
        const tempRcvCtn = totalRcvCtn;


        totalRcvKg -= data?.reduce((acc, item) => acc + item.ISSUE_KG, 0)
        totalRcvCtn -= data?.reduce((acc, item) => acc + item.ISSUE_CTN, 0)


        return <>
          <ReportSubgroup
            key={key}
            data={data}
            index={index}
            firstHeader={firstHeader}
            totalRcvKg={tempRcvKg}
            totalRcvCtn={tempRcvCtn}
          ></ReportSubgroup>
        </>
      })}
    </>
  );
}

export default ReportTable;
