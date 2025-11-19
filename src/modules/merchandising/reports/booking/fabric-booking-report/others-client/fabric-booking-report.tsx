import CollarCuffSummary from "../shared-components/collar-cuff-summary";
import Comments from "../shared-components/comments";
import Details from "../shared-components/details";
import MasterInfo from "../shared-components/master-info";
import OrderQty from "../shared-components/order-qty";
import Signature from "../shared-components/signature";
import StripeDetails from "../shared-components/stripe-details";
import VarificationStatus from "../shared-components/varification-status";
import YarnRequirementSummary from "../shared-components/yarn-requirement-summary";
import { FabricBookingReportDto } from "../fabric-booking-type";
import Revise from "../shared-components/revise";
import JobBreakdownReport from "@/modules/planning/reports/job-breakdown-report/job-breakdown-report-index";

export default function FabricBookingReport({ data, isPoWise }: { data?: FabricBookingReportDto, isPoWise?: boolean }) {
    const signatureData = [
        { title: "Prepared By", access_key: "CREATED_BY" },
        { title: "Approve By", access_key: "APPROVED_BY" },
        { title: "Team Leader", access_key: "TEAM_LEADER" },
        { title: "Planning", access_key: "PLANNING" },
        { title: "Authorise", access_key: "AUTHORISED_BY" }
    ]

    return (
        <div className="px-10 w-auto print:max-w-none print:px-0 mt-10">
            <MasterInfo masterData={data?.MaterData} />

            {isPoWise ?
                <div className="mt-5">
                    <h4 className="text-center m-0 p-0 text-lg font-bold">Order Qty</h4>
                    <JobBreakdownReport jobId={data?.MaterData?.PO_ID} isShowReportHeader={false} />
                </div> :
                <OrderQty lstColorSizeWiseOrderQty={data?.lstColorSizeWiseOrderQty} lstSize={data?.lstSize} />
            }

            {/* OrderQty lstColorSizeWiseOrderQty={data?.lstColorSizeWiseOrderQty} lstSize={data?.lstSize} /> */}
            <Details lstFabricQtyDetails={data?.lstFabricQtyDetails} lstWastagePercentage={data?.lstWastagePercentage} />
            <CollarCuffSummary lstFabricQtyDetails={data?.lstFabricQtyDetails} lstSize={data?.lstSize} />
            <YarnRequirementSummary lstYarnSummary={data?.lstYarnSummary} />
            <StripeDetails lstStripeDetails={data?.lstStripeDetails} />
            <Comments lstComments={data?.lstComments} />
            <VarificationStatus lstVerificationStatus={data?.lstVerificationStatus} />
            <Revise lstRevise={data?.lstRevice} />
            <Signature masterData={data?.MaterData} signatureData={signatureData} />
        </div>
    );
}
