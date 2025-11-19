import { YarnBookingReportDto_KnittingDyeingAdvice } from "../yb-rpt-type";
import KittingDyeingAdvicePartsGroup from "./2kda-parts-group";

type prams = {
  lstKda: YarnBookingReportDto_KnittingDyeingAdvice[] | undefined;
};

export default function KittingDyeingAdviceYarnGroup({ lstKda }: prams) {
  if (lstKda) {
    return (
      <div>
        <h1 className="font-bold text-base text-left">
          Mtl Name: {lstKda[0]?.MTL_NAME}
        </h1>
        <div className="flex flex-row">
          <table className="w-full border border-black">

            <KittingDyeingAdvicePartsGroup
              key={Math.random()}
              lstKda={lstKda}
            />
          </table>
        </div>
      </div>
    );
  }
  return <></>;
}
