/* eslint-disable @typescript-eslint/no-explicit-any */
// import moment from "moment";
import { OperationBulletinReportType } from "../operation-bulletin-report-type";


function ReportHeader({
  data,
}: {
  data: OperationBulletinReportType[];
}) {



  return (
    <div className="w-[100%] ">
      <div className="flex justify-between">
        <div className="w-[100%]">

          <h1 className="font-bold text-xl text-center">
            {
              data[0]?.COMPANYNAME
            }
          </h1>
          <h3 className="font-bold text-sm text-center">
            {data[0]?.MAINSECTION} Operation Bulletin
          </h3>
        </div>

      </div>

    </div>
  );
}

export default ReportHeader;
