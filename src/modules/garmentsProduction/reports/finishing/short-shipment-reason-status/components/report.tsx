/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import ReportGroup from "./report-group";
import { IShortShipmentReasonStatus } from "../short-shipment-reason-status-type";

function Report({ data }: { data: IShortShipmentReasonStatus[] }) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: IShortShipmentReasonStatus[], keys: string[]) {
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

  interface GroupedByBuyer {
    [key: string]: {
      items: IShortShipmentReasonStatus[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYER_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "STYLE",
    "PO",
    "ORDER QTY",
    "CUTTING QTY",
    "SEWING QTY",
    "SHIPMENT QTY",
    "SHORT/ACCESS QTY",
    "SHIPMENT DATE",
    "SHORT SHIPMENT REASON",
    "AFFECTED QTY",
    "DETAILS",
  ];

  return (
    <div className="container">
      <div className="p-2">
        <ReportHeader />

        {uniqueKeysArray?.map((key) => (
          <ReportGroup
            key={key}
            data={groupedByBuyer[key].items}
            firstHeader={firstHeader}
          ></ReportGroup>
        ))}
        <div className="p-5"></div>
        <div>
          <ReportFooter></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
