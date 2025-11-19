/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { OperationBulletinReportType } from "../operation-bulletin-report-type";

function ReportHeader({
  data,
}: {
  data: OperationBulletinReportType[];
}) {

  return (
    <div className="w-[100%]">

      <p className="font-bold text-left w-[100%] text-xs">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">
        ({
          data[0]?.FACCOMPANYNAME
        })
      </h1>
      <h1 className="font-bold text-xl text-center">
        ({
          data[0]?.FACCOMPANYADDRESS
        })
      </h1>
      <h1 className="font-bold text-lg text-center">
        ({
          data[0]?.COMPANYUTILITY
        })
      </h1>
      <h3 className="font-bold text-lg text-center">
        {data[0]?.SECTIONNAME} Operation Bulletin
      </h3>

    </div>
  );
}

export default ReportHeader;
