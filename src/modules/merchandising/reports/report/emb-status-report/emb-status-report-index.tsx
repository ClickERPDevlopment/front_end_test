/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { EmbStatusReportEmbDataType } from "./emb-status-emb-data-type";
import { EmbStatusReportStyleDataType } from "./emb-status-report-style-data-type";

function EmbStatusReport() {
  const [embData, setEmbData] = useState<EmbStatusReportEmbDataType[]>([]);
  const [styleData, setStyleData] = useState<EmbStatusReportStyleDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const fromOpmDate = searchParams.get("fromOpmDate");
  const toOpmDate = searchParams.get("toOpmDate");
  const fromShipDate = searchParams.get("fromShipDate");
  const toShipDate = searchParams.get("toShipDate");
  const companyId = searchParams.get("companyId") || "0";
  const buyerId = searchParams.get("buyerId") || "0";
  const poId = searchParams.get("poId") || "0";
  const styleId = searchParams.get("styleId") || "0";
  const embTypeId = "0";
  const embType = searchParams.get("embType") || "";
  const isEmbDone = searchParams.get("isEmbDone") === "True";
  const isEmbNotDone = searchParams.get("isEmbNotDone") === "True";
  const isOpmDate = searchParams.get("isOpmDate") === "True";
  const isShipDate = searchParams.get("isShipDate") === "True";

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Emb Status Report";
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const res = await axios.get(`${api.ProductionUrl}/production/MerchReport/EmbStatusReportStyleData`, {
          params: {
            fromOpmDate,
            toOpmDate,
            fromShipDate,
            toShipDate,
            companyId,
            buyerId,
            poId,
            styleId,
            isOpmDate,
            isShipDate,
            embTypeId
          },
        });
        if (res.data) setStyleData(res.data);

        const res2 = await axios.get(`${api.ProductionUrl}/production/MerchReport/EmbStatusReportEmbData`);
        if (res2.data) setEmbData(res2.data);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching report data:", err);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  let filteredStyleData = styleData;

  if (isEmbDone && !isEmbNotDone) {

    filteredStyleData = styleData.filter(item =>
      embData.some(
        emb =>
          emb.STYLEID === item.STYLEID &&
          emb.GMT_COLORID === item.COLORID &&
          emb.PONO == item.PONO &&
          emb.EMBELLISHMENT_ORDERNO != null &&
          emb.EMBELLISHMENT_ORDERNO !== ""
      )
    );
  }

  if (isEmbNotDone && !isEmbDone) {
    filteredStyleData = styleData.filter(item =>
      !embData.some(
        emb =>
          emb.STYLEID === item.STYLEID &&
          emb.GMT_COLORID === item.COLORID &&
          emb.PONO == item.PONO &&
          emb.EMBELLISHMENT_ORDERNO != null &&
          emb.EMBELLISHMENT_ORDERNO !== ""
      )
    );
  }



  let filteredEmbData = embData;

  if (isEmbDone && !isEmbNotDone) {
    filteredEmbData = embData.filter(
      emb =>
        emb.EMBELLISHMENT_ORDERNO != null &&
        emb.EMBELLISHMENT_ORDERNO !== "" &&
        emb.WO_QTY != null &&
        emb.WO_QTY > 0 &&
        filteredStyleData.some(
          style =>
            style.STYLEID === emb.STYLEID &&
            style.COLORID === emb.GMT_COLORID &&
            style.PONO == emb.PONO
        )
    );
  }

  if (isEmbNotDone && !isEmbDone) {
    filteredEmbData = embData.filter(
      emb =>
        (emb.EMBELLISHMENT_ORDERNO == null ||
          emb.EMBELLISHMENT_ORDERNO === "" ||
          emb.WO_QTY == null ||
          emb.WO_QTY <= 0) &&
        filteredStyleData.some(
          style =>
            style.STYLEID === emb.STYLEID &&
            style.COLORID === emb.GMT_COLORID &&
            style.PONO == emb.PONO
        )
    );
  }

  if (embType) {
    filteredStyleData = filteredStyleData.filter(x => x.EMB_TYPE === embType);
    filteredEmbData = filteredEmbData.filter(x => x.EMB_TYPE === embType);
  }

  return isLoading ? (
    <div className="container">
      <h3 className="text-center p-2 m-4 font-bold">
        <Skeleton width={400} height={40} />
      </h3>
      <TableSkeleton />
    </div>
  ) : (
    <div>
      <Report isEmbDone={isEmbDone} isEmbNotDone={isEmbNotDone} styleData={filteredStyleData} embData={filteredEmbData} />
    </div>
  );
}

export default EmbStatusReport;
