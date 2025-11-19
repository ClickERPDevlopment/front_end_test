import moment from "moment";
import { IYarnTransfer } from "../yarn-transfer-report-type";

function ReportHeader({
  data,
}: {
  data: IYarnTransfer | null | undefined;
}) {

  return (
    <div className="w-full">
      <p className="font-bold text-left w-[100%] text-base">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-xl text-center">
        {
          data?.COMPANY_NAME
        }
      </h1>
      <h4 className="font-bold text-sm text-center mb-3">
        {
          data?.COMPANY_ADDRESS
        }
      </h4>

      <h3 className="font-bold text-lg text-center">
        YARN TRANSFER CHALLAN
      </h3>
    </div>
  );
}

export default ReportHeader;
