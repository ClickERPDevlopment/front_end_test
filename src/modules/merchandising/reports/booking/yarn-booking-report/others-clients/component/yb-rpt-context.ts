import { createContext } from "react";
import { YarnBookingReportDto } from "../../yb-rpt-type";

const YarnBookingReportContext = createContext<YarnBookingReportDto | null>(
  null
);
export default YarnBookingReportContext;
