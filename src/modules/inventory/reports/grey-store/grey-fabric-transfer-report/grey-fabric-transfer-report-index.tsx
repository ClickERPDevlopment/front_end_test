import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios, { AxiosError } from "axios";
import useApiUrl from "@/hooks/use-ApiUrl";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import moment from "moment";
import { IGreyFabricTransferReport } from "./grey-fabric-transfer-report-type";

export default function GreyFabricTransferReport() {
  const [data, setData] = useState<IGreyFabricTransferReport[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  let id: string | null = "0";

  if (searchParams.get("id")) {
    id = searchParams.get("id");
  }

  const api = useApiUrl();

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        await axios
          .get(
            `${api.ProductionUrl}/production/GreyStoreReport/GreyFabricTransferReport?id=${id}`
          )
          .then((res) => setData(res.data));

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log((error as AxiosError).message);
      }
    }
    getData();
  }, [api.ProductionUrl, id]);

  const columns = [
    { name: "BUYER", classes: "" },
    { name: "STYLE", classes: "" },
    { name: "PO", classes: "" },
    { name: "FABRICATION", classes: "" },
    { name: "COLUR", classes: "" },
    { name: "ROLL", classes: "" },
    { name: "QTY", classes: "" },
    { name: "UOM", classes: "" },
    { name: "BUYER", classes: "" },
    { name: "STYLE", classes: "" },
    { name: "PO", classes: "" },
    { name: "FABRICATION", classes: "" },
    { name: "COLUR", classes: "" },
    { name: "ROLL", classes: "" },
    { name: "QTY", classes: "" },
    { name: "UOM", classes: "" },
  ];

  if (isLoading) {
    return <ReportSkeleton />;
  } else {
    return (
      <>
        <div className="m-3 print:overflow-visible">
          <h3 className="text-center text-slate-700 mt-3 font-bold text-2xl">
            International Classic Composite Ltd.
          </h3>
          <h4 className="text-center text-slate-700 mt-1 font-bold text-sm">
            {" "}
            Naojour, Kodda, Jaydevpur, Gazipur.,
          </h4>
          <h3 className="text-center text-slate-700 mt-1 font-bold text-xl">
            Grey Fabric Transfer Report
          </h3>
          <div className="h-auto print:overflow-visible rounded mt-5">
            <table className="font-bold">
              <tr>
                <td className="text-xs">Transfer No.</td>
                <td className="text-xs">: {data[0]?.TRANSFER_NO}</td>
              </tr>
              <tr>
                <td className="text-xs">Date</td>
                <td className="text-xs">
                  : {moment(data[0]?.TRANSFER_DATE).format("DD-MMM-YY")}
                </td>
              </tr>
              <tr>
                <td className="text-xs">Yarn Challan NO</td>
                <td className="text-xs">: {data[0]?.FROM_YARN_CHALLAN_NO}</td>
              </tr>
              <tr>
                <td className="text-xs">Yarn</td>
                <td className="text-xs">: {data[0]?.FROM_YARN}</td>
              </tr>
              <tr>
                <td className="text-xs">Yarn Lot</td>
                <td className="text-xs">: {data[0]?.FROM_YARN_LOT}</td>
              </tr>
              <tr>
                <td className="text-xs">Brand</td>
                <td className="text-xs">: {data[0]?.FROM_YARN_BRAND}</td>
              </tr>
            </table>
            <table className="mt-3 border-collapse table-fixed rounded">
              <thead className="">
                <tr>
                  <th
                    colSpan={8}
                    className="border border-gray-900 p-1 text-xs"
                  >
                    Transfer From (Send)
                  </th>
                  <th
                    colSpan={8}
                    className="border  border-gray-900 p-1 text-xs"
                  >
                    Transfer To (Receive)
                  </th>
                </tr>
                <tr>
                  <th colSpan={8} className="text-xs border  border-gray-900">
                    <span>GSM: {data[0]?.FROM_GSM}</span>,
                    <span className="ml-1">
                      FINISH DIA: {data[0]?.FROMO_GREY_SHAPE}
                    </span>
                    ,<span className="ml-1">M/C DIA: {data[0]?.FROM_DIA}</span>,
                    <span className="ml-1">
                      S/L: {data[0]?.FROM_STITCH_LENGTH}
                    </span>
                  </th>
                  <th
                    colSpan={8}
                    className="border  border-gray-900 p-1 text-xs"
                  >
                    <span>GSM: {data[0]?.TO_GSM}</span>,
                    <span className="ml-1">
                      FINISH DIA: {data[0]?.TO_GREY_SHAPE}
                    </span>
                    ,<span className="ml-1">M/C DIA: {data[0]?.TO_DIA}</span>,
                    <span className="ml-1">
                      S/L: {data[0]?.TO_STITCH_LENGTH}
                    </span>
                  </th>
                </tr>
                <tr id="table-header-row" className="bg-teal-200">
                  {columns.map((c) => (
                    <th
                      key={Math.random()}
                      className={
                        "border  border-gray-900 p-1 text-xs  " + c.classes
                      }
                    >
                      {c.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={Math.random()}>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.FROM_BUYER_NAME}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.FROM_STYLE_NO}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.FROM_PO_NO}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.FROM_FABRIC_NAME}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.FROM_COLOR_NAME}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.FROM_ROLL_QTY}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.FROM_QTY_KG}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.FROM_UOM}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.TO_BUYER_NAME}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.TO_STYLE_NO}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.TO_PO_NO}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.TO_FABRIC_NAME}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.TO_COLOR_NAME}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.TO_ROLL_QTY}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.TO_QTY_KG}
                    </td>
                    <td className="border  border-gray-900 p-1 text-xs">
                      {item.TO_UOM}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between w-full mt-40">
            <div className="text-center">
              <span>{data[0]?.CREATED_BY}</span>
              <br></br>
              <span className="border-t  border-gray-900 px-3 inline-block">
                Prepared By
              </span>
            </div>
            <div className="text-center">
              <span></span>
              <br></br>
              <span className="border-t  border-gray-900 px-3 inline-block">
                Receiver
              </span>
            </div>
            <div className="text-center">
              <span></span>
              <br></br>
              <span className="border-t  border-gray-900 px-3 inline-block">
                In-Charge
              </span>
            </div>
            <div className="text-center">
              <span></span>
              <br></br>
              <span className="border-t  border-gray-900 px-3 inline-block">
                Authorized By
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
