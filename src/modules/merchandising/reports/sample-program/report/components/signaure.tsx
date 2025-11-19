import { SampleProgramReportDto_MasterType } from "../sample-program-report.-type";

export default function Signature({ masterInfo }: { masterInfo?: SampleProgramReportDto_MasterType }) {
    const data = ["Created By", "Checked By", "Knitting", "Dyeing", "HOD", "Approve"];
    return (
        <div className="mt-12 flex justify-around">
            {data?.map(ele =>
                <div className="flex flex-col justify-end">
                    <span>{ele == "Created By" ? (masterInfo?.CREATED_BY_USER) : ""}</span>
                    <div className="border-t border-t-gray-600 w-36 flex justify-center">
                        <span>{ele}</span>
                    </div>
                </div>
            )}
        </div>
    )
}
