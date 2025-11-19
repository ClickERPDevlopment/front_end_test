import ReportHeaderSkeleton from "./report-heading-skeleton";
import TableSkeleton from "./table-skeleton";

export default function ReportSkeleton() {
  return (
    <>
      <div
        className="container m-3 flex print:overflow-visible justify-center items-center flex-col
      "
      >
        {/* heading */}
        <div className="">
          <h3 className="text-center text-slate-700 my-1 font-bold text-2xl w-full">
            <ReportHeaderSkeleton />
          </h3>
          <h3 className="text-center text-slate-700 m-0 font-normal text-lg">
            <ReportHeaderSkeleton />
          </h3>
          <div className="text-center text-slate-700 my-1 font-bold">
            <ReportHeaderSkeleton />
          </div>
        </div>
        {/* end heading */}

        {/* table */}
        <div className="w-full mt-8 flex justify-center items-center">
          <TableSkeleton />
        </div>
      </div>
    </>
  );
}
