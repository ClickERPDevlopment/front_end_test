/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

import ReportSubgroup from "./report-subgroup";
import { IProcessWiseDyeingFinishProductionReport } from "../process-wise-dyeing-finish-production-report-type";

function ReportTable({
  data,
  firstHeader,
}: {
  data: IProcessWiseDyeingFinishProductionReport[];
  firstHeader: string[] | null;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: IProcessWiseDyeingFinishProductionReport[],
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

  interface GroupedByMCType {
    [key: string]: {
      items: IProcessWiseDyeingFinishProductionReport[];
    };
  }

  let groupedByMCType: GroupedByMCType = {};

  if (data) {
    groupedByMCType = groupBy(data, ["MC_TYPE"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  console.log(uniqueKeysArray);

  const machineType = [
    "DYEING",
    "SLITTING",
    "STENTER",
    "HEAT SEET",
    "COMPACTING OPEN",
    "SQUEEZER",
    "FLAT DRYER",
    "COMPACTING TUBE",
  ];

  return (
    <>
      <tr className="text-center">
        <td className="border border-gray-300 p-1 text-nowrap">
          {moment(data[0].PRO_DATE).format("DD-MMM-YY")}
        </td>
        {machineType?.map((key) => (
          <ReportSubgroup
            key={key}
            data={groupedByMCType[key]?.items}
            firstHeader={firstHeader}
          ></ReportSubgroup>
        ))}
      </tr>
    </>
  );
}

export default ReportTable;
