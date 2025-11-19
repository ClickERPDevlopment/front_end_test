/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbStatusReportStyleDataType } from "../emb-status-report-style-data-type";
import { EmbStatusReportEmbDataType } from "../emb-status-emb-data-type";
import moment from "moment";
import React, { useRef, useState } from "react";
import StyleImage from "@/components/style-image";

type ReportProps = {
  styleData: EmbStatusReportStyleDataType[];
  embData: EmbStatusReportEmbDataType[];
};

function ReportTable({ styleData, embData }: ReportProps) {

  let totalQty = 0;
  let totalWoQty = 0;

  let buyerTotalQty = 0
  let buyerTotalWoQty = 0

  return (
    <>
      {styleData.map((item, index) => {

        let filteredEmbData = embData.filter((emb) => {

          const sameStylePo = emb.STYLEID === item.STYLEID && emb.GMT_COLORID === item.COLORID && emb.PONO == item.PONO;

          return sameStylePo;
        });

        totalWoQty = (filteredEmbData[0]?.WO_QTY || 0);

        totalQty = item.QTY;
        buyerTotalQty += item.QTY;
        buyerTotalWoQty += (filteredEmbData[0]?.WO_QTY || 0);

        let balance = totalQty - (filteredEmbData[0]?.WO_QTY || 0);

        const cellRef = useRef<HTMLTableCellElement | null>(null);

        const [hoveredStyleId, setHoveredStyleId] = useState<number | null>(null);
        const [imagePosition, setImagePosition] = useState<{ top: number; left: number } | null>(null);

        return (
          <React.Fragment key={index}>

            {hoveredStyleId && imagePosition && (
              <div
                className="absolute z-50 bg-white shadow-lg p-2 rounded-md"
                style={{
                  top: `${imagePosition.top}px`,
                  left: `${imagePosition.left}px`,
                }}
              >
                <StyleImage styleId={hoveredStyleId} />
              </div>
            )}

            <tr key={index}>
              <>
                <td className="border border-gray-950 p-0.5">
                  {item.COMPANY_PREFIX}
                </td>
                <td className="border border-gray-950 p-0.5">
                  {item.BUYER}
                </td>
                <td className="border border-gray-950 cursor-pointer hover:bg-lime-200"
                  ref={cellRef}
                  onMouseEnter={(e) => {
                    const rect = (e.currentTarget as HTMLTableCellElement).getBoundingClientRect();
                    setImagePosition({
                      top: rect.bottom + window.scrollY,
                      left: rect.left + window.scrollX,
                    });
                    setHoveredStyleId(item.STYLEID);
                  }}
                  onMouseLeave={() => {
                    setImagePosition(null);
                  }}
                >
                  {item.STYLENO}
                </td>
                <td className="border border-gray-950 p-0.5">
                  {item.ITEMTYPE}
                </td>
                <td className="border border-gray-950 p-0.5">
                  {item.PONO}
                </td>
                <td className="border border-gray-950 p-0.5">
                  {item.COLORNAME}
                </td>
                <td className="border border-gray-950 p-0.5 text-center">
                  {item.QTY}
                </td>
                <td className="border border-gray-950 p-0.5 text-nowrap">
                  {moment(item.DELIVERYDATE).format("DD-MMM-YY")}
                </td>
                <td className="border border-gray-950 p-0.5">{item?.EMB_TYPE}</td>
              </>
              <td className="border border-gray-950 p-0.5">{item?.CATEGORY_NAME}</td>
              <td className="border border-gray-950 p-0.5">{filteredEmbData[0]?.EMBELLISHMENT_ORDERNO}</td>
              <td className="border border-gray-950 p-0.5 text-center">{filteredEmbData[0]?.WO_QTY}</td>
              <td className="border border-gray-950 p-0.5 text-center">{balance}</td>
            </tr>

            {filteredEmbData.slice(1).map((embItem, embIndex) => {

              balance -= embItem.WO_QTY;
              totalWoQty += embItem.WO_QTY;
              buyerTotalWoQty += embItem.WO_QTY;

              return (
                <tr key={embIndex + 1}>
                  <td className="border border-gray-950 p-0.5">{item.COMPANY_PREFIX}</td>
                  <td className="border border-gray-950 p-0.5">{item.BUYER}</td>
                  <td className="border border-gray-950 cursor-pointer hover:bg-lime-200"
                    ref={cellRef}
                    onMouseEnter={(e) => {
                      console.log("Fetching image for style ID7777777777:", item.STYLEID);
                      const rect = (e.currentTarget as HTMLTableCellElement).getBoundingClientRect();
                      setImagePosition({
                        top: rect.bottom + window.scrollY,
                        left: rect.left + window.scrollX,
                      });
                      setHoveredStyleId(item.STYLEID);
                    }}
                    onMouseLeave={() => {
                      setImagePosition(null);
                    }}
                  >
                    {item.STYLENO}
                  </td>
                  <td className="border border-gray-950 p-0.5">{item.ITEMTYPE}</td>
                  <td className="border border-gray-950 p-0.5">{item.PONO}</td>
                  <td className="border border-gray-950 p-0.5">{item.COLORNAME}</td>
                  <td className="border border-gray-950 p-0.5 text-center">{item.QTY}</td>
                  <td className="border border-gray-950 p-0.5 text-nowrap">
                    {moment(item.DELIVERYDATE).format("DD-MMM-YY")}
                  </td>
                  <td className="border border-gray-950 p-0.5">{item?.EMB_TYPE}</td>
                  <td className="border border-gray-950 p-0.5">{item.CATEGORY_NAME}</td>
                  <td className="border border-gray-950 p-0.5">{embItem.EMBELLISHMENT_ORDERNO}</td>
                  <td className="border border-gray-950 p-0.5 text-center">{embItem.WO_QTY}</td>
                  <td className="border border-gray-950 p-0.5 text-center">{balance}</td>
                </tr>
              );
            })}

          </React.Fragment>
        );
      })}
      {
        <tr className="bg-lime-50 font-bold">
          <td colSpan={6} className="border border-gray-950 p-0.5 text-center">{styleData[0]?.BUYER} Total</td>
          <td className="border border-gray-950 p-0.5 text-center">{buyerTotalQty}</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5">{ }</td>
          <td className="border border-gray-950 p-0.5 text-center">{buyerTotalWoQty}</td>
          <td className="border border-gray-950 p-0.5 text-center">{buyerTotalQty - buyerTotalWoQty}</td>
        </tr>
      }

    </>
  );
}

export default ReportTable;
