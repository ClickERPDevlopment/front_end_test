import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  YarnBookingReportDto_MasterData,
  YarnBookingReportDto_SpecialTreatment,
} from "./yb-rpt-type";
import useApiUrl from "@/hooks/use-ApiUrl";

type params = {
  masterData: YarnBookingReportDto_MasterData;
  lstSpecialTreatment: YarnBookingReportDto_SpecialTreatment[];
};
export default function YarnBookingMasterInfo({
  masterData,
  lstSpecialTreatment,
}: params) {
  const [imageSrc, setImageSrc] = useState<string>();
  const api = useApiUrl();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${api.ProductionUrl}/production/Style/GetStyleImage?styleId=${masterData?.STYLEID}`
        );
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } else {
          console.error("Failed to fetch image");
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [api.ProductionUrl, masterData?.STYLEID]);

  let specialTreatment = "";
  lstSpecialTreatment.forEach((element) => {
    specialTreatment +=
      specialTreatment == "" ? element.TREATMENT : ", " + element.TREATMENT;
  });

  return (
    <div className="mt-5">
      <div className="flex gap-6 mt-3 justify-between">
        <div className="flex flex-1 flex-wrap justify-between gap-3">
          <ul className="flex flex-1 flex-col ">
            <li className="flex mb-1">
              <label className="min-w-28 font-bold">Order/Job No.</label>
              <span>: {masterData?.PONO}</span>
            </li>
            <li className="flex mb-1">
              <label className="min-w-28 font-bold">Body GSM</label>
              <span>: {masterData?.BODY_GSM}</span>
            </li>
            <li className="flex mb-1">
              <label className="min-w-28 font-bold">Counts</label>
              <span >: {masterData?.COUNTS}</span>
            </li>
            <li className="flex mb-1">
              <label className="min-w-28 font-bold">Style</label>
              <span >: {masterData?.STYLENAME}</span>
            </li>
            <li className="flex mb-1">
              <label className="min-w-28 font-bold">Buyer Name</label>
              <span>: {masterData?.BUYER_NAME}</span>
            </li>
            {/* <li className="flex">
              <label className="min-w-28 font-bold">Revise</label>
              <span>:{masterData?.REVISED_NO}</span>
            </li> */}
          </ul>
          <ul className="">
            <li className="flex mb-1 ">
              <label className="min-w-44 font-bold">Based on Tech. Sheet Date</label>
              <span>: {masterData?.ASPERLATEST == '1' ? 'As per latest' : masterData?.TECHNICAL_SHEET_DATE}</span>
            </li>
            <li className="flex mb-1">
              <label className="min-w-44 font-bold">Order Qty</label>
              <span>: {masterData?.ORDER_QTY}</span>
            </li>
            <li className="flex mb-1">
              <label className="min-w-44 font-bold">Neck Rib GSM</label>
              <span>: {masterData?.NECK_RIB_GSM}</span>
            </li>
            <li className="flex mb-1">
              <label className="min-w-44 font-bold">Fabric Type</label>
              <span>: {masterData?.FABRIC_TYPE}</span>
            </li>
            <li className="flex mb-1">
              <label className="min-w-44 font-bold">Formation</label>
              <span>: {masterData?.TECH_IS_OPEN_DIA}</span>
            </li>
          </ul>
        </div>
        <div className="w-auto">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="GMT image"
              className="max-w-[200px] border h-auto"
            />
          ) : (
            <Skeleton width={200} height={200} />
          )}
        </div>
      </div>
      <div className="flex gap-5 mt-4 ">
        {masterData?.IS_OPEN_DIA == "1" ? (
          <div className="w-auto p-1 border-2 border-black">
            <h4>OPEN FINISH</h4>
          </div>
        ) : (
          ""
        )}

        {specialTreatment ? (
          <div className="w-auto border-2 border-black p-1">
            <h4>{specialTreatment}</h4>{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
