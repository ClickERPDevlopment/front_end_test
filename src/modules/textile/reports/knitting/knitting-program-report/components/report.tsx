import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import { IKnittingProgramReport } from "../knitting-program-report-type";

function Report({ data }: { data: IKnittingProgramReport[] }) {
  return (
    <div className="container">
      <div className="p-2">
        <ReportHeader />
        <ReportTable data={data}></ReportTable>
        <div>
          <ReportFooter masterData={data[0]}></ReportFooter>
        </div>
      </div>
    </div>
  );
}

export default Report;
