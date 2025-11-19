import moment from "moment";
import { YarnTwistingWorkOrderReportType } from "../yarn-twisting-wrok-order-rpt-type";

function ReportHeader({
  masterData,
}: {
  masterData: YarnTwistingWorkOrderReportType | null;
}) {
  return (
    <div className="w-full">
      <div className="">
        <h1 className="font-bold text-lg text-center">
          {masterData?.GROUP_COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-sm text-center">
          {masterData?.GROUP_COMPANY_ADDRESS}
        </h4>
        <h1 className="font-bold text-lg text-center mt-5">
          {masterData?.COMPANY_NAME}
        </h1>
        <h4 className="font-bold text-base text-center">
          YARN TWISTING WORK ORDER
        </h4>
      </div>
      <div className="flex justify-between w-full mt-5">
        <ul>
          <li>
            <div>
              <label className="w-32">WO ORDER NO</label>
              <label>: {masterData?.WORK_ORDER_NO}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">WO DATE</label>
              <label>: {moment(masterData?.ISSUE_DATE).format('DD-MMM-YY')}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">DELIVERY DATE</label>
              <label>: {moment(masterData?.DELIVERY_DATE).format('DD-MMM-YY')}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">RECEIVE STORE</label>
              <label>: {masterData?.RCV_STORE}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">CONTACT PERSON</label>
              <label>: {masterData?.STORE_PERSONNEL}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">MOBILE NO</label>
              <label>: {masterData?.MOBILE_NO}</label>
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div>
              <label className="w-32">SUPPLIER NAME</label>
              <label>: {masterData?.SUPPLIER_NAME}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">ADDRESS</label>
              <label>: {masterData?.SUPPLIER_ADDRESS}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">ATTENTION</label>
              <label>: {masterData?.ATTENTION}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">MOBILE NO</label>
              <label>: {masterData?.SUPPLIER_MOBILE_NO}</label>
            </div>
          </li>
          <li>
            <div>
              <label className="w-32">BUYER</label>
              <label>: {masterData?.BUYER_NAME}</label>
            </div>
          </li>
          <li>
            <div>
              {/* <label className="w-32">MOBILE NO</label>
              <label>: {masterData?.MOBILE_NO}</label> */}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ReportHeader;
