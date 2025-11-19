import moment from "moment";
import { iaccWorkOrder } from "./iaccWorkOrder";

export default function AccReportHeader({
  masterData,
  seasons,
}: {
  masterData: iaccWorkOrder | null;
  seasons: string;
}) {
  return (
    <div className="p-2 flex">
      <div className="lg:w-[50%]">
        <ul>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>WORK ORDER NO</span>
            </div>
            <span className="p-1 text-sm">: {masterData?.WORK_ORDER_NO}</span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>ISSUE DATE</span>
            </div>
            <span className="p-1 text-sm">
              : {moment(masterData?.ISSUE_DATE).format("D MMM YY")}
            </span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>DELIVERY DATE</span>
            </div>
            <span className="p-1 text-sm">
              : {moment(masterData?.DELIVERY_DATE).format("D MMM YY")}
            </span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>RECEIVE STORE</span>
            </div>
            <span className="p-1 text-sm">: {masterData?.RCV_STORE}</span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>CONTACT PERSON</span>
            </div>
            <span className="p-1 text-sm">: {masterData?.STORE_PERSONNEL}</span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>MOBILE NO</span>
            </div>
            <span className="p-1 text-sm">: {masterData?.MOBILE_NO}</span>
          </li>
        </ul>
      </div>
      <div className="sm:mt-2 lg:w-[50%]">
        <ul>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>BUYER NAME</span>
            </div>
            <span className="p-1 text-sm">: {masterData?.BUYER_NAME}</span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>SUPPLIER NAME</span>
            </div>
            <span className="p-1 text-sm">: {masterData?.SUPPLIER_NAME}</span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>ATTENTION</span>
            </div>
            <span className="p-1 text-sm">: {masterData?.ATTENTION}</span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>MOBILE NUMBER</span>
            </div>
            <span className="p-1 text-sm">
              : {masterData?.SUPPLIER_MOBILE_NO}
            </span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>SUPPLIER ADDRESS</span>
            </div>
            <span className="p-1 text-sm">
              : {masterData?.SUPPLIER_ADDRESS}
            </span>
          </li>
          <li className="flex">
            <div className="p-1 min-w-40 font-bold text-sm">
              <span>SEASON</span>
            </div>
            <span className="p-1 text-sm">: {seasons}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
