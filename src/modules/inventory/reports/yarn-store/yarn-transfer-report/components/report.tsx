import ReportHeader from "./report-header";
import { IYarnTransfer } from "../yarn-transfer-report-type";
import ChallanHeader from "./challan-header";
import ChallanBody from "./challan-body";
import ReportFooter from "./report-footer";
import ChallanFooter from "./challan-footer";

function Report({
  data,
}: {
  data: IYarnTransfer | null | undefined;
}) {

  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}
      className="px-12 text-gray-950 min-w-full min-h-screen flex flex-col justify-between">
      <div className="p-2">
        <ReportHeader
          data={data}
        />
        <ChallanHeader
          data={data}
        />
        <ChallanBody
          data={data}
        />
        <ChallanFooter data={data} />
      </div>
      <div className="p-8">
        <ReportFooter />
      </div>
    </div>
  );
}

export default Report;
