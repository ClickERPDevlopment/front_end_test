import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import YarnIssueStatusReport from "./yarn-issue-for-dyeing-report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import axios from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import { YarnIssueStatusReportType } from "./yarn-issue-for-dyeing-report-type";

export default function YarnIssueForDyeingReportIndex() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<YarnIssueStatusReportType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const api = useApiUrl();

  let id: string | null = "";

  if (searchParams.get("id")) {
    id = searchParams.get("id");
  }

  useEffect(() => {
    document.title = "Yarn dyeing challan.";

    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/YarnStoreReport/YarnIssueForDyeingReport?id=${id}`
          )
          .then((res) => {
            if (res.data) {
              setData(res.data);
            } else {
              //console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, [api.ProductionUrl, id]);

  return isLoading ? (
    <>
      <div className="container">
        <h3 className=" text-center p-2 m-4 font-bold ">
          <Skeleton width={400} height={40} />
        </h3>
        <TableSkeleton />
      </div>
    </>
  ) : (
    <YarnIssueStatusReport data={data} />
  );

}
