import { GreyFabricIssueToDyeingChallanType_Master } from "../grey-fabric-issue-to-dyeing-challan-type"

export default function ReportFooter({ data }: { data: GreyFabricIssueToDyeingChallanType_Master | null | undefined }) {
    const signs = ["Received By", "Prepared By", "Delivery Sup.", "Manager (Store)", "Authorised Sign"]
    return (
        <div>
            <div className="flex justify-around font-bold mt-20">
                {signs?.map(ele =>
                    <div className="flex flex-col justify-end">
                        <span className="text-center">{ele === "Prepared By" ? data?.PREPARED_BY : ""}</span>
                        <div className="border-t border-t-gray-600 w-36 flex justify-center">
                            <span>{ele}</span>
                        </div>
                    </div>
                )}
            </div>
            <p className='text-center font-bold text-sm mt-5'>*** This is an ERP generated document ***</p>
        </div>
    )
}
