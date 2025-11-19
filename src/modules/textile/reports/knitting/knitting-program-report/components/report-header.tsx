import moment from "moment";

function ReportHeader() {
  return (
    <div>
      <div className="">
        <p className="font-bold text-lg text-left w-[100%] text-sm">
          {moment().format("DD-MMM-YYYY")}
        </p>
        <h1 className="font-bold text-2xl text-center">
          International Classic Composite Ltd.
        </h1>
        <h4 className="font-bold text-base text-center">
          568 & 584, Naojour, Kodda, Jaydevpur, Gazipur
        </h4>
        <h4 className="font-bold text-base text-center">Knitting program</h4>
      </div>
    </div>
  );
}

export default ReportHeader;
