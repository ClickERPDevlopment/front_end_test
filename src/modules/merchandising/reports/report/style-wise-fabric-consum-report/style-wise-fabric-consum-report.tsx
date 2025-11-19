import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import moment from "moment";

import useApiUrl from "@/hooks/use-ApiUrl";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import Skeleton from "react-loading-skeleton";
import { styleWiseFabricConsumptionReport } from "./components/styleWiseFabricConsumptionReport";

export default function StyleWiseFabricConsumptionReport() {
  const [data, setData] = useState<styleWiseFabricConsumptionReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  //
  let dtFrom: string | null = "";
  let dtTo: string | null = "";
  let buyerId: string | null = "";
  let styleId: string | null = "";

  if (searchParams.get("dtFrom")) {
    dtFrom = searchParams.get("dtFrom");
  }
  if (searchParams.get("dtTo")) {
    dtTo = searchParams.get("dtTo");
  }
  if (searchParams.get("buyerId")) {
    buyerId = searchParams.get("buyerId");
  }
  if (searchParams.get("styleId")) {
    styleId = searchParams.get("styleId");
  }

  console.log("dtFrom: ", dtFrom);
  console.log("dtTo: ", dtTo);
  console.log("buyerId: ", buyerId);
  console.log("styleId: ", styleId);

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Style-wise fabric consumption";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        await axios
          .get(
            `${api.ProductionUrl}/production/MerchReport/StyleWiseFabricConsumptionReport?dtFrom=${dtFrom}&dtTo=${dtTo}&buyerId=${buyerId}&styleId=${styleId}`
          )
          .then((res) => {
            if (res.data) {
              const result = res.data;
              if (result.IsError) {
                console.log("Error found: ", result.ErrorMessage);
                setData([]);
              } else {
                setData(result.Data);
                console.log(result.Data);
              }
            } else {
              console.log(res);
            }
          })
          .catch((m) => console.log(m));

        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
            <Skeleton width={400} height={40} />
          </h3>
          <TableSkeleton />
        </>
      ) : (
        <div className="container">
          <table>
            <thead className="bg-blue-200 border border-black sticky top-0 z-10">
              <tr className="border border-black">
                <th colSpan={7} className="border border-black">
                  <div className="p-0 m-0">
                    <span className="absolute left-0 px-3 font-bold text-lg">
                      {moment().format("DD-MMM-YYYY")}
                    </span>
                  </div>
                  <h3 className=" text-center p-2 m-4 text-3xl font-bold ">
                    Style Wise Fabric Consumption Report
                  </h3>
                </th>
              </tr>
              <tr className="border border-black">
                <th className="min-w-[100px] border border-black text-xs  text-center p-2">
                  Buyer
                </th>
                <th className="min-w-[70px] border border-black text-xs  text-center p-2 ">
                  Style
                </th>
                <th className="border border-black text-xs  text-center p-2 ">
                  Fabric
                </th>
                <th className="min-w-[200px] border border-black text-xs  text-center p-2 ">
                  Part
                </th>
                <th className="min-w-[150px] border border-black text-xs  text-center p-2 ">
                  Cad Consumption(Kg/Dzn)
                </th>
                <th className="min-w-[155px] border border-black text-xs  text-center p-2 ">
                  Fabric Wastage %
                </th>
                <th className="min-w-[60px] border border-black text-xs  text-center p-2">
                  Garments Wastage %
                </th>
              </tr>
            </thead>
            <tbody id="table-body">
              {data?.map((x) => (
                <tr>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.BUYER}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.STYLENO}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.FABRIC}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.GMT_PARTS}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.AVG_FABRIC_REQ_QTY_PER_DZN_GMT}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.AVG_F_WASTAGE_PERCENTAGE_BUGET}
                  </td>
                  <td className="border border-black text-xs  text-center p-2">
                    {x.AVG_GMT_WASTAGE_PERCENTAGE_BUDGET}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
