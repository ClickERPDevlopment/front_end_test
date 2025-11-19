/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbStatusReportStyleDataType } from "../emb-status-report-style-data-type";
import moment from "moment";
import React, { useRef, useState } from "react";
import StyleImage from "@/components/style-image";

type ReportProps = {
  styleData: EmbStatusReportStyleDataType[];
};

function ReportSubGroup({ styleData }: ReportProps) {

  return (
    <React.Fragment >
      <tr >
        <>
          <td className="border border-gray-950 p-0.5">
            {
              Array.from(new Set(styleData.map(item => item.COMPANY_PREFIX))).join(",")
            }
          </td>
          <td className="border border-gray-950 p-0.5">
            {
              Array.from(new Set(styleData.map(item => item.BUYER))).join(",")
            }
          </td>
          <td className="border border-gray-950"
          >
            {
              Array.from(new Set(styleData.map(item => item.STYLENO))).join(",")
            }
          </td>

          <td className="border border-gray-950 p-0.5 text-center">
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden ms-auto me-auto">
              <StyleImage
                styleId={styleData[0]?.STYLEID}
              />
            </div>
          </td>

          <td className="border border-gray-950 p-0.5">
            {
              Array.from(new Set(styleData.map(item => item.PONO))).join(",")
            }
          </td>
          <td className="border border-gray-950 p-0.5 text-center">
            {styleData.reduce((acc, item) => acc + item.QTY, 0)}
          </td>
          <td className="border border-gray-950 p-0.5 text-nowrap">
            {moment(styleData[0].DELIVERYDATE).format("DD-MMM-YY")}
          </td>
          <td className="border border-gray-950 p-0.5">
            {
              Array.from(new Set(styleData.map(item => item.EMB_TYPE))).join(",")
            }
          </td>
        </>
        <td className="border border-gray-950 p-0.5">
          {
            Array.from(new Set(styleData.map(item => item.CATEGORY_NAME))).join(",")
          }
        </td>
      </tr>
    </React.Fragment>

  );
}

export default ReportSubGroup;
