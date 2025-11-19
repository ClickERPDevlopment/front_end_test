import { YarnAdditionalBookingReportDtoType } from "../yarn-additional-booking-report.-type";

export default function Signature({ masterInfo }: { masterInfo?: YarnAdditionalBookingReportDtoType }) {
    const data = ["Created By", "Checked By", "Knitting", "Dyeing", "COO", "Approve"];
    return (
        <div className="mt-12 flex justify-around">
            {data?.map((ele, index) =>
                <div className="flex flex-col justify-end" key={index}>
                    <span className="text-center" >{ele == "Created By" ? (masterInfo?.CREATED_BY_NAME) : ""}</span>
                    <div className="border-t border-t-gray-600 w-36 flex justify-center">
                        <span>{ele}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
