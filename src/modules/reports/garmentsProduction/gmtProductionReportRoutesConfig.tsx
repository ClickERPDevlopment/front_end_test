import React from "react";

const ShipmentScheduleReport = React.lazy(() =>
  import("./ShipmentScheduleReport")
);

export const gmtProductionReportRoutes = [
  {
    path: "/shipment-schedule-report",
    element: <ShipmentScheduleReport />,
  },

];
