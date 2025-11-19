import moment from "moment";

export interface ReportHeaderProps {
  companyName?: string;
  companyAddress?: string;
  companyRemarks?: string | null;
  reportTitle?: string;
  fromDate?: string;
  toDate?: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  companyName = "",
  companyAddress = "",
  companyRemarks = "",
  reportTitle = "Finish Fabric Return Report Cutting Floor to Store",
  fromDate,
  toDate,
}) => {
  return (
    <header className="report-header">
      <div className="container">
        <p className="text-sm font-bold text-left w-full">
          {moment().format("DD-MMM-YYYY")}
        </p>

        <h1 className="text-2xl font-bold text-center">{companyName}</h1>

        <h4 className="text-base font-bold text-center">
          {companyAddress}
          {companyRemarks}
        </h4>

        <h3 className="text-xl font-bold text-center mt-2">{reportTitle}</h3>
        <h4 className="text-base font-bold text-center">
          {moment(fromDate).format("DD-MMM-YYYY") +
            " to " +
            moment(toDate).format("DD-MMM-YYYY")}
        </h4>
      </div>
    </header>
  );
};

export default ReportHeader;
