/* eslint-disable @typescript-eslint/no-explicit-any */
import { FabricQualityProblemReportType } from "../fabric-quality-problem-report-type";

function ReportHeader({
  data,
}: {
  data: FabricQualityProblemReportType[];
}) {

  return (
    <div className="w-[100%]">


      {
        data[0]?.COMPANY_NAME && <>
          <h1 className="font-bold text-2xl text-center">
            {
              data[0]?.COMPANY_NAME
            }
          </h1>
          <h4 className="font-bold text-lg text-center mb-3">
            {
              data[0]?.COMPANY_ADDRESS
            }
          </h4>
        </>
      }


      <h3 className="font-bold text-lg text-center">
        Fabric Quality Problem Report
      </h3>
    </div>
  );
}

export default ReportHeader;
