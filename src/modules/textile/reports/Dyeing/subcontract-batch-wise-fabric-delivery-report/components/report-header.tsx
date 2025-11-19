import moment from "moment";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  reportTitle?: string;
  dtFrom?: string;
  dtTo?: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  companyName = "International Classic Composite Ltd.",
  companyAddress = "568 & 584, Naojour, Kodda, Jaydevpur, Gazipur.",
  reportTitle = "Subcontract Batch Wise Fabric Delivery Report",
  dtFrom = "01-Jan-00",
  dtTo = "01-Jan-26",
}) => {

  return (
    <header className="report-header">
      <div className="container">
        <p className="text-sm font-bold text-left w-full">
          {moment().format("DD-MMM-YYYY")}
        </p>

        <h1 className="text-2xl font-bold text-center">{companyName}</h1>

        <h4 className="text-base font-bold text-center">{companyAddress}</h4>

        <h3 className="text-xl font-bold text-center mt-2">{reportTitle}</h3>
        <h3 className="text-xl font-bold text-center mt-2">
          {moment(dtFrom).format("DD-MMM-YYYY")} to{" "}
          {moment(dtTo).format("DD-MMM-YYYY")}
        </h3>
      </div>
    </header>
  );
};

export default ReportHeader;
