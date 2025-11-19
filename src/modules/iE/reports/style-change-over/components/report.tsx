/* eslint-disable @typescript-eslint/no-explicit-any */
import { IStyleChangeOver } from "../style-change-over-type";
import ReportGroup from "./report-group";
import ReportHeader from "./report-header";

function Report({ data }: { data: IStyleChangeOver[] }) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IStyleChangeOver[], keys: string[]) {
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

  interface GroupedByEntryDate {
    [key: string]: {
      items: IStyleChangeOver[];
    };
  }

  let groupedByEntryDate: GroupedByEntryDate = {};

  if (data) {
    groupedByEntryDate = groupBy(data, ["FLOOR_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "SL",
    "DATE",
    "LINE",
    "BUYER",
    "STYLE",
    "ITEM",
    "SMV",
  ];

  const secondHeader = ["TGT TPT MIN.", "START TIME", "FINISH TIME", "TOTAL TPT MIN.", "EXCESS TIME", "HIT RATE %", "REASON", "REMARKS"];
  let dataLength = 0;
  return (
    <div>
      <div className=" p-2">
        <ReportHeader data={data} />
        <div className="mt-3">
          <table className="border-collapse border border-gray-300  w-[100%]">
            <thead style={{ backgroundColor: "#A4F4CF" }}>
              <tr className="text-sm">
                {firstHeader?.map((item) => (
                  <th rowSpan={2} className="border border-gray-950 p-0.5">{item}</th>
                ))}
                <th className="border border-gray-950 p-0.5" colSpan={3}>LAYOUT REQ.</th>
                <th className="border border-gray-950 p-0.5" colSpan={3}>PRESENT</th>
                {secondHeader?.map((item) => (
                  <th rowSpan={2} className="border border-gray-950 p-0.5">{item}</th>
                ))}
              </tr>
              <tr className="text-sm">
                <th className="border border-gray-950 p-0.5">OP</th>
                <th className="border border-gray-950 p-0.5">HP</th>
                <th className="border border-gray-950 p-0.5">TTL MP</th>
                <th className="border border-gray-950 p-0.5">OP</th>
                <th className="border border-gray-950 p-0.5">HP</th>
                <th className="border border-gray-950 p-0.5">TTL MP</th>
              </tr>
            </thead>
            <tbody>
              {uniqueKeysArray?.map((key) => {
                let prevLength = dataLength;
                dataLength = dataLength + groupedByEntryDate[key].items.length;
                return <ReportGroup
                  key={key}
                  data={groupedByEntryDate[key].items}
                  indexOffset={prevLength}
                ></ReportGroup>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;
