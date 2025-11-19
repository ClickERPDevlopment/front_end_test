import moment from "moment";

import { useSearchParams } from "react-router";
import {
  GetLineLoadingPlan,
  LineLoadingPlanSearchType,
  LineLoadingPlanType,
} from "@/actions/Sweater/swt-planning-action";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import LineLoadingPlanReport from "./line-loading-plan-report";
import React from "react";
import useAxiosInstance from "@/hooks/axios-instance";

const formData: LineLoadingPlanSearchType = {
  companyId: 2,
  boardId: 10,
  isFromDate: true,
  fromDate: "1-jan-2023",
  toDate: "1-jan-2026",
  buyerId: 0,
  styleId: 0,
  poId: 0,
  floorId: 0,
  machineGroupId: 0,
};

export default function LineLoadingPlanIndex() {
  const [data, setData] = React.useState<LineLoadingPlanType | undefined>(
    undefined
  );
  const axios = useAxiosInstance();

  const [searchParams] = useSearchParams();

  if (searchParams.get("companyId")) {
    formData.companyId = Number(searchParams.get("companyId"));
  }
  if (searchParams.get("boardId")) {
    formData.boardId = Number(searchParams.get("boardId"));
  }
  if (searchParams.get("fromDate")) {
    formData.fromDate = moment(searchParams.get("fromDate")).format(
      "DD-MMM-YY"
    );
  }
  if (searchParams.get("toDate")) {
    formData.toDate = moment(searchParams.get("toDate")).format("DD-MMM-YY");
  }
  if (searchParams.get("buyerId")) {
    formData.buyerId = Number(searchParams.get("buyerId"));
  }
  if (searchParams.get("styleId")) {
    formData.styleId = Number(searchParams.get("styleId"));
  }
  if (searchParams.get("poId")) {
    formData.poId = Number(searchParams.get("poId"));
  }
  if (searchParams.get("floorId")) {
    formData.floorId = Number(searchParams.get("floorId"));
  }
  if (searchParams.get("machineGroupId")) {
    formData.machineGroupId = Number(searchParams.get("machineGroupId"));
  }

  React.useEffect(() => {
    document.title = "Line Loading Plan";

    const fetchData = async () => {
      const res = await GetLineLoadingPlan(formData, axios);
      console.log(res);

      setData(res);
    };
    fetchData();
  }, [0]);

  if (!data) {
    return <ReportSkeleton />;
  } else {
    return (
      <div>
        <LineLoadingPlanReport data={data} />
      </div>
    );
  }
}

//summary-section:
// plan pcs
// total mc
// total plan mc
// total avl mc
