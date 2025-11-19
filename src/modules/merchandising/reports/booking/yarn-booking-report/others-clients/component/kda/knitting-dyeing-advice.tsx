/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import YarnBookingReportContext from "../yb-rpt-context";
import KittingDyeingAdviceYarnGroup from "./1kda-yarn-group";
import { YarnBookingReportDto_KnittingDyeingAdvice } from "../../../yb-rpt-type";

function getAllYarn(lstKda: YarnBookingReportDto_KnittingDyeingAdvice[]) {
  const yarnList: string[] = [];
  if (lstKda) {
    lstKda.forEach((element) => {
      if (!yarnList.includes(element.MTL_NAME)) {
        yarnList.push(element.MTL_NAME);
      }
    });
  }
  return yarnList;
}

export default function KittingDyeingAdvice() {
  const data = useContext(YarnBookingReportContext);
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const yarnList = getAllYarn(data?.lstKnittingDyeingAdvice!);
  // return JSON.stringify(data?.lstKnittingDyeingAdvice!);
  return (
    <div className="mt-5">
      <h1 className="border border-black font-bold text-lg text-center">
        Knitting Dyeing Advice
      </h1>
      <div>
        {yarnList?.map((y) => (
          <KittingDyeingAdviceYarnGroup
            lstKda={data?.lstKnittingDyeingAdvice?.filter(
              (f: any) => f.MTL_NAME === y
            )}
          />
        ))}
      </div>
    </div>
  );
}
