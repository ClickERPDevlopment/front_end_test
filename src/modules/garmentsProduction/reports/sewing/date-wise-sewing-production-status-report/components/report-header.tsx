import moment from "moment";
import { DateWiseSewingProductionReportDto } from "../date-wise-sewing-production-report-type";
import useAppClient from "@/hooks/use-AppClient";

function ReportHeader({
  searchParam,
}: {
  masterData: DateWiseSewingProductionReportDto | null;
  searchParam: {
    fromDate: string;
    toDate: string;
  };
}) {


  const client = useAppClient();


  return (
    <div>
      <div className="">
        <h1 className="font-bold text-3xl text-center">
          {
            client.currentClient == client.FAME && "FAME GROUP"
          }
          {
            client.currentClient == client.EURO && "EUROTEX GROUP"
          }
        </h1>
        <h4 className="font-bold text-xl text-center">
          Sewing Production Report
        </h4>
        <h1 className="text-sm font-bold text-center">
          {moment(searchParam.fromDate).format("DD-MMM-YY")} to {moment(searchParam.toDate).format("DD-MMM-YY")}
        </h1>
      </div>
    </div>
  );
}

export default ReportHeader;
