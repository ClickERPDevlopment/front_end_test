/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useContext } from "react";
import YarnBookingReportContext from "./yb-rpt-context";
import {
  YarnBookingReportDto_CuttingAdviceQuantity,
  YarnBookingReportDto_TechnicalSheet,
} from "../../yb-rpt-type";

function getSizeMeasurement(
  lstCuttingTech: YarnBookingReportDto_TechnicalSheet[],
  partsName: string,
  sizeName: string
) {
  let misurement = "0";
  const res = lstCuttingTech.filter(
    (c) => c.SPE_NAME === partsName && c.SIZENAME === sizeName
  );

  if (res) {
    misurement = res[0]?.MEASUREMENT;
  }
  return misurement;
}

function getCuttingAdviseTotalQtyBySize(
  YarnBookCutA: YarnBookingReportDto_CuttingAdviceQuantity[],
  colorName: string
) {
  let qty = 0;
  if (YarnBookCutA) {
    YarnBookCutA.forEach((element) => {
      if (element.COLORNAME === colorName) qty += element.QTY;
    });
  }
  return qty;
}
function getCuttingAdviseTotalQty(
  YarnBookCutA: YarnBookingReportDto_CuttingAdviceQuantity[]
) {
  let qty = 0;
  if (YarnBookCutA) {
    YarnBookCutA.forEach((element) => {
      qty += element.QTY;
    });
  }
  return qty;
}

export default function YarnBookingCuttingAdvise() {
  const data = useContext(YarnBookingReportContext);
  const sizeArrayLength = data?.sizeNameList?.length;
  // console.log("sizes", data?.sizeNameList);
  // return JSON
  return (
    <div className="mt-5">
      <h3 className="text-center font-bold text-lg border border-black border-b-0">
        Cutting Advice
      </h3>
      <table className="w-full  border border-black">
        <thead>
          <tr>
            <th>SL</th>
            <th>Color & Color Code</th>
            {data?.lstSize?.map((s) => (
              <th key={Math.random()} className="border border-black">
                {s.SIZENAME}
              </th>
            ))}
            <th className="width: auto; border border-black">Parts</th>
            <th className="width: 150px; border border-black">Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.lstParts.map((part) => (
            <tr key={part.NAME}>
              <td className="text-center border border-black">~</td>
              <td className="text-center border border-black"></td>
              {data.sizeNameList.map((sName) => (
                <td key={sName} className="text-center border border-black">
                  {getSizeMeasurement(data.lstTechnicalSheet, part.NAME, sName)}
                </td>
              ))}
              <td className="text-center border border-black">{part.NAME}</td>
              {data.MaterData.IS_OPEN_DIA === "0" ? (
                part.NAME?.toUpperCase().includes("CHEST") ? (
                  <td className="text-center border border-black">
                    DIA SELECTION (Body)
                  </td>
                ) : (
                  <td className="text-center border border-black">**</td>
                )
              ) : (
                <td>**</td>
              )}
            </tr>
          ))}
          {data?.colorNameList?.map((colorName, cindex) => (
            <tr key={colorName}>
              <td className="text-center border border-black">{cindex + 1}</td>
              <td className="text-center border border-black">{colorName}</td>
              {data?.sizeNameList?.map((sizeName) => (
                <td key={sizeName} className="text-center border border-black">
                  {
                    data?.lstCuttingAdviceQuantity?.filter(
                      (ca) =>
                        ca.COLORNAME === colorName && ca.SIZENAME === sizeName
                    )[0]?.QTY
                  }
                </td>
              ))}
              <td className="text-center border border-black"></td>
              <td className="text-center border border-black">
                {getCuttingAdviseTotalQtyBySize(
                  data?.lstCuttingAdviceQuantity,
                  colorName
                )}
              </td>
            </tr>
          ))}
          <tr className="font-weight: bold; border: 1px solid black;">
            <td
              colSpan={1 + 1 + (sizeArrayLength ? sizeArrayLength : 0) + 1}
              className="text-center font-bold border border-black"
            >
              Total
            </td>
            <td className="text-center font-bold border border-black">
              {getCuttingAdviseTotalQty(data?.lstCuttingAdviceQuantity!)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
