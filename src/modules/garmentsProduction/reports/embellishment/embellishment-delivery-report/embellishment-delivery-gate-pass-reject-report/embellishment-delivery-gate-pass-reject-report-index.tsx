/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmbellishmentDeliveryReportType } from "../embellishment-delivery-report-type";
import Report from "./components/report";

function EmbellishmentDeliveryGatePassRejectReportIndex({
  data,
}: {
  data: EmbellishmentDeliveryReportType[];
}) {
  return (
    <Report data={data}></Report>
  )
}

export default EmbellishmentDeliveryGatePassRejectReportIndex