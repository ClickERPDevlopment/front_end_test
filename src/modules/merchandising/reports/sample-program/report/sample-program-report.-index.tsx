import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import SampleProgramReport from "./sample-program-report.";
import { SampleProgramReportDtoType } from "./sample-program-report.-type";

export default function SampleProgramReportIndex() {
    const [data, setData] = useState<SampleProgramReportDtoType>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const api = useApiUrl();

    let sampleId: string | null = "";
    if (searchParams.get("sampleId")) {
        sampleId = searchParams.get("sampleId");
    }


    useEffect(() => {
        document.title = "Sample program";
    }, []);

    useEffect(() => {
        console.log(`${api.ProductionUrl}/production/SampleProgram/SampleProgramReport?sampleId=${sampleId}`);
        async function getData() {
            try {
                setIsLoading(true);

                await axios
                    .get(
                        `${api.ProductionUrl}/production/SampleProgram/SampleProgramReport?sampleId=${sampleId}`
                    )
                    .then((res) => {
                        if (res.data) {
                            const result = res.data;
                            setData(result);
                        } else {
                            console.log(res);
                        }
                    })
                    .catch((m) => console.log("error ", m));

                setIsLoading(false);
            } catch {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="flex justify-center">
                    <ReportSkeleton />
                </div>
            ) : (
                <SampleProgramReport data={data} />
            )}
        </>
    );
}
