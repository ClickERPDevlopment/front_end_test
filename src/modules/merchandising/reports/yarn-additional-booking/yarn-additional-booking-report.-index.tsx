import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";
import { YarnAdditionalBookingReportDtoType } from "./yarn-additional-booking-report.-type";
import YarnAdditionalBookingReport from "./yarn-additional-booking-report.";

export default function YarnAdditionalBookingReportIndex() {
    const [data, setData] = useState<YarnAdditionalBookingReportDtoType>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const api = useApiUrl();

    let sampleId: string | null = "";
    if (searchParams.get("sampleId")) {
        sampleId = searchParams.get("sampleId");
    }


    useEffect(() => {
        document.title = "Yarn additional booking";
    }, []);

    useEffect(() => {
        console.log(`${api.ProductionUrl}/production/YarnAdditionalBooking/${sampleId}`);
        async function getData() {
            try {
                setIsLoading(true);

                await axios
                    .get(
                        `${api.ProductionUrl}/production/YarnAdditionalBooking/${sampleId}`
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
                <YarnAdditionalBookingReport data={data} />
            )}
        </>
    );
}
