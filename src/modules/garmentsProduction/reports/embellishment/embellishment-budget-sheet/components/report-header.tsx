/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

function ReportHeader() {
  return (
    <div className="w-[100%]">
      <p className="font-bold text-lg text-left w-[100%] text-sm">
        {moment().format("DD-MMM-YYYY")}
      </p>
      <h1 className="font-bold text-2xl text-center">Magnum Bd Pvt Ltd</h1>
      <h4 className="font-bold text-base text-center">
        Address: 568 & 584, Naojour, Kodda, Jaydebpur, Gazipur.
      </h4>
      <h3 className="font-bold text-xl text-center mt-2">
        Embellishment Budget Sheet
      </h3>
    </div>
  );
}

export default ReportHeader;
