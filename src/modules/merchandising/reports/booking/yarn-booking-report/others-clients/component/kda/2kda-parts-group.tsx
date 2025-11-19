/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import YarnBookingReportContext from "../yb-rpt-context";
import KittingDyeingAdviceColorGroup from "./3ksa-color-grou";
import { YarnBookingReportDto_KnittingDyeingAdvice } from "../../../yb-rpt-type";

type prams = {
  lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined;
};

function getAllColors(lstKda: YarnBookingReportDto_KnittingDyeingAdvice[]) {
  const colorList: string[] = [];
  if (lstKda) {
    lstKda.forEach((element) => {
      if (!colorList.includes(element.COLORNAME)) {
        colorList.push(element.COLORNAME);
      }
    });
  }
  return colorList;
}

export default function KittingDyeingAdvicePartsGroup({ lstKda }: prams) {
  const data = useContext(YarnBookingReportContext);
  const colorList = getAllColors(lstKda!);
  const length = data?.knittingSizeNameList.length;
  if (lstKda)
    return (
      <>
        <thead>
          {/* <tr>
            <th colSpan={2 + length! + 1} className="border border-black">
              {lstKda[0]?.FABRIC_PART}
            </th>
          </tr> */}
          <tr>
            <th className="border border-black">SL</th>
            <th className="border border-black">Color & Color Code</th>
            {data?.knittingSizeNameList.map((size: any) => (
              <th className="border border-black">{size}</th>
            ))}
            <th className="border border-black">TOTAL (KG)</th>
          </tr>
        </thead>
        <tbody>
          {colorList?.map((color, index) => (
            <tr key={Math.random()}>
              <td className="text-center border border-black">{index + 1}</td>
              <KittingDyeingAdviceColorGroup
                lstKda={lstKda?.filter((f) => f.COLORNAME === color)}
              />
              {/* <td>
                {JSON.stringify(lstKda?.filter((f) => f.COLORNAME === color))}
              </td> */}
            </tr>
          ))}
        </tbody>
      </>
    );
  return <></>;
}
