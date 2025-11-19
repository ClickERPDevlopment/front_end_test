/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import YarnBookingReportContext from "../yb-rpt-context";
import { YarnBookingReportDto_KnittingDyeingAdvice } from "../yb-rpt-type";
import { cn } from "@/lib/utils";

type prams = {
  lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined;
  fabricParts: {
    ribPartsName: string[];
    ribCuffPartsName: string;
    collarPartsName: string;
    cuffPartsName: string;
    summaryColumns: (string | string[])[];
    isRibColAval: boolean | undefined;
    isRibCuffColAval: boolean | undefined;
    isCollarColAval: boolean | undefined;
    isCuffColAval: boolean | undefined;
}
};

function getSizeWiseQty(
  data: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined,
  sizeName: string,
  yarnName: string,
) {
  let qty = 0;
  data?.forEach((element) => {
    if (element.SIZENAME === sizeName) qty += element.QTY;
  });
  return qty === 0 ? "" : yarnName.toUpperCase().includes('LYCRA') ? qty.toFixed(2) : qty.toFixed(0);
}

function getTotalQty(
  data: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined,
  yarnName: string,
) {
  let qty = 0;
  data?.forEach((element) => {
    qty += element.QTY;
  });

  return qty === 0 ? "" : yarnName.toUpperCase().includes('LYCRA') ? qty.toFixed(2) : qty.toFixed(0);
}

export default function KittingDyeingAdviceColorGroup({ lstKda, fabricParts }: prams) {
  const sizeList = useContext(YarnBookingReportContext)?.knittingSizeNameList;

  if (lstKda)
    return (
      <>
        <td className="text-center border border-black">
          {lstKda[0].COLORNAME}
        </td>

        {sizeList?.map((s: any) => (
          <td className="text-center border border-black">
            {getSizeWiseQty(lstKda?.filter((f) => !fabricParts.summaryColumns.includes(f.FABRIC_PART?.toUpperCase())), s, lstKda[0].MTL_NAME)}
          </td>
        ))}

        {/* sub-total */}
        <td className="text-center border border-black">
          {getTotalQty(lstKda?.filter((f) => !fabricParts.summaryColumns.includes(f.FABRIC_PART?.toUpperCase())), lstKda[0].MTL_NAME)}
        </td>
        {/* end-sub-total */}

        <td className={
          cn("text-center border border-black",
            fabricParts.isRibColAval ? "" : "hidden"
          )}>
          {getTotalQty(lstKda?.filter((f) => fabricParts.ribPartsName.includes(f.FABRIC_PART?.toUpperCase())), lstKda[0].MTL_NAME)}
        </td>

        <td className={
          cn("text-center border border-black",
            fabricParts.isRibCuffColAval ? "" : "hidden"
          )}>
          {getTotalQty(lstKda?.filter((f) => f.FABRIC_PART?.toUpperCase() === fabricParts.ribCuffPartsName), lstKda[0].MTL_NAME)}
        </td>

        <td className={
          cn("text-center border border-black",
            fabricParts.isCollarColAval ? "" : "hidden"
          )}>
          {getTotalQty(lstKda?.filter((f) => f.FABRIC_PART?.toUpperCase() === fabricParts.collarPartsName), lstKda[0].MTL_NAME)}
        </td>

        <td className={
          cn("text-center border border-black",
            fabricParts.isCuffColAval ? "" : "hidden"
          )}>
          {getTotalQty(lstKda?.filter((f) => f.FABRIC_PART?.toUpperCase() === fabricParts.cuffPartsName), lstKda[0].MTL_NAME)}
        </td>

        <td className="text-center border border-black">
          {getTotalQty(lstKda, lstKda[0].MTL_NAME)}
        </td>

      </>
    );
  return <></>;
}


