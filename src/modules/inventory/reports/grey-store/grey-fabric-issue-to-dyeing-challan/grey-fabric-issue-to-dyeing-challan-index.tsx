import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import GreyFabricIssueToDyeing from "./grey-fabric-issue-to-dyeing-challan";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import axios from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import { GreyFabricIssueToDyeingChallanType } from "./grey-fabric-issue-to-dyeing-challan-type";

export default function GreyFabricIssueToDyeingChallanIndex() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<GreyFabricIssueToDyeingChallanType | null | undefined>(

  );
  const [isLoading, setIsLoading] = useState(false);
  const api = useApiUrl();

  let id: string | null = "";

  if (searchParams.get("id")) {
    id = searchParams.get("id");
  }

  const reportFormat = Number(searchParams.get("reportFormat")) || 1;

  useEffect(() => {
    document.title = "Grey issue to dyeing challan.";

    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/Grey-Fabric-Issue-To-Dyeing/challan/${id}`
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
    <GreyFabricIssueToDyeing data={data} reportFormat={reportFormat} />
  );

}
