/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbStatusReportStyleDataType } from "../emb-status-report-style-data-type";
import moment from "moment";
import React, { useRef, useState } from "react";
import StyleImage from "@/components/style-image";
import { EmbStatusReportEmbDataType } from "../emb-status-emb-data-type";
import ReportSubGroup from "./report-subgroup";

type ReportProps = {
  styleData: EmbStatusReportStyleDataType[];
  embData: EmbStatusReportEmbDataType[];
};

function ReportTable({ styleData }: ReportProps) {

  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data: EmbStatusReportStyleDataType[],
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
      items: EmbStatusReportStyleDataType[];
    };
  }

  let groupedByDate: GroupedByDate = {};

  if (styleData) {
    groupedByDate = groupBy(styleData, ["DELIVERYDATE", "STYLENO"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  const grantTotalQty = styleData.reduce((acc, item) => acc + item.QTY, 0)

  return (
    <React.Fragment >
      {uniqueKeysArray?.map((key) => (
        <ReportSubGroup
          key={key}
          styleData={groupedByDate[key].items}
        ></ReportSubGroup>
      ))}

      <tr className="bg-lime-50 font-bold">
        <td colSpan={5} className="border border-gray-950 p-0.5 text-center">Total</td>
        <td className="border border-gray-950 p-0.5 text-center">{grantTotalQty}</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
        <td className="border border-gray-950 p-0.5">{ }</td>
      </tr>
    </React.Fragment>


  );
}

export default ReportTable;
