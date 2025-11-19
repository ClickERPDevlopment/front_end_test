import { YarnBookingReportDto_MasterData } from "../../yb-rpt-type"

export default function Signature({ masterData }: { masterData?: YarnBookingReportDto_MasterData }) {

    const signatureData = [
        { title: "Created By", access_key: "CREATED_BY" }
    ]

    return (

        <div className="flex items-center mt-10">
            {signatureData.map(({ title, access_key }) => (
                <div key={access_key} className="w-32 flex flex-col">
                    <div className="text-center min-h-[24px]">
                        <span>{masterData?.[access_key as keyof YarnBookingReportDto_MasterData]}</span>
                    </div>
                    <div className="text-center border-t-2 border-gray-600">
                        <span>{title}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
