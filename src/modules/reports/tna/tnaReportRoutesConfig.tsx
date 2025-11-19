import React from "react";

const TnaDetailReport = React.lazy(() =>
  import("./TnaDetailReport")
);

const TnaAchievementReport = React.lazy(() =>
  import("./TnaAchievementReport")
);

const TnaNotCompleteReport = React.lazy(() =>
  import("./TnaNotCompleteReport")
);

export const tnaReportRoutes = [
  {
    path: "/tna-detail-report",
    element: <TnaDetailReport />,
  },
  {
    path: "/tna-achievement-report",
    element: <TnaAchievementReport />,
  },
   {
    path: "/tna-not-complete-task-report",
    element: <TnaNotCompleteReport />,
  },
];
