import { DateWiseYarnAllocationReportType } from "../date-wise-yarn-allocation-report-type";

function ReportHeader({
  data
}: {
  data: DateWiseYarnAllocationReportType[];
}) {

  return (
    <div className="w-[100%]">

      {/* <p className="font-bold text-left w-[100%] text-xs">
        {moment(searchParams.dtDate).format("DD-MMM-YYYY")}
      </p> */}

      {
        // data[0]?.MAIN_COMPANY && <>
        //   <h1 className="font-bold text-xl text-center">
        //     {
        //       data[0]?.MAIN_COMPANY
        //     }
        //   </h1>
        //   <h4 className="font-bold text-sm text-center mb-3">
        //     {
        //       data[0]?.MAIN_COMPANY_ADDRESS
        //     }
        //   </h4>
        // </>
      }

      <h1 className="font-bold text-xl text-center">
        {
          data[0]?.COMPANY
        }
      </h1>
      <h4 className="font-bold text-lg text-center mb-3">
        {
          data[0]?.COMPANY_ADDRESS
        }
      </h4>
      <h3 className="font-bold text-lg text-center">
        YARN ALLOCATION
      </h3>
    </div>
  );
}

export default ReportHeader;
