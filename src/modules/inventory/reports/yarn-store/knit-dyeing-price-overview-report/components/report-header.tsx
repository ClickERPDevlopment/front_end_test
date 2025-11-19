import { ICompany } from "@/modules/garmentsProduction/reports/finishing/finish-fabric-return-cutting-floor-to-store-report/company-info-type";
import { IKnittingDyeingPriceOverviewReport } from "../knit-dyeing-price-overview-report-type";
import moment from "moment";

function ReportHeader({
  company,
  data
}: {
  company?: ICompany;
  data?: IKnittingDyeingPriceOverviewReport[];
}) {
  if (data)
    return (
      <div className="w-[100%]">
        <div>
          <h1 className="font-bold text-2xl text-center">
            {company?.NAME}
          </h1>
          <h4 className="font-bold text-sm text-center mb-5">
            {company?.ADDRESS}
          </h4>
          <h3 className="font-bold text-lg text-center">
            Knitting & Dyeing Sheet – Quantity & Price Per KG Overview
          </h3>
        </div>
        <div className="flex gap-5 mt-5 font-bold">
          <ul className="min-w-48">
            <li>Buyer: {data[0]?.BUYER}</li>
            <li>Order: {data[0]?.PO_NO}</li>
            <li>Style: {data[0]?.STYLENO}</li>
          </ul>
          <ul className="min-w-48">
            <li>Item Descrition: {data[0]?.ITEMTYPE}</li>
            <li>Order Qty: {data[0]?.PO_STYLE_WISE_ORDER_QTY}</li>
            <li>Shipment date: {moment(data[0]?.DELIVERYDATE).format("DD-MM-YYYY")}</li>
          </ul>
        </div>
      </div>
    );
}

export default ReportHeader;
