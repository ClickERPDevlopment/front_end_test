import { FabricBookingReportDto_MasterData } from "../fabric-booking-type"

export default function Signature({ masterData, signatureData }: {
    masterData?: FabricBookingReportDto_MasterData,
    signatureData: { title: string, access_key: string }[]
}) {
    return (
        <div className="flex justify-around items-center my-5 flex-wrap">
            {signatureData.map(({ title, access_key }, index) => (
                <div key={access_key + index} className="w-32 flex flex-col">
                    <div className="text-center min-h-[24px]">
                        <span>{masterData?.[access_key as keyof FabricBookingReportDto_MasterData]}</span>
                    </div>
                    <div className="text-center border-t-2 border-gray-600">
                        <span>{title}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}
