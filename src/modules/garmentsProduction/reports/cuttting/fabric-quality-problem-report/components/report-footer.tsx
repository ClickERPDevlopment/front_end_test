import { FabricQualityProblemReportType } from "../fabric-quality-problem-report-type";

function ReportFooter({ data }: { data: FabricQualityProblemReportType[] }) {

  console.log("ddd", data[0])

  return (
    <div style={{ fontSize: "14px" }} className="flex font-bold justify-between">
      <div className='text-center  mx-1 border-t border-gray-950 px-1'><span className='pb-1'>Cutting In-Charge</span></div>
      <div className='text-center  mx-1 border-t border-gray-950 px-1'><span className='pb-1'>Knitting Rep.</span></div>
      <div className='text-center  mx-1 border-t border-gray-950 px-1'><span className='pb-1'>Dyeing Rep.</span></div>
      <div className='text-center  mx-1 border-t border-gray-950 px-1'><span className='pb-1'>Quality Dept.</span></div>
      <div className='text-center  mx-1 border-t border-gray-950 px-1'><span className='pb-1'>{data[0]?.COMPANY_PREFIX}-Authorized Person</span></div>
    </div>
  );
}

export default ReportFooter;
