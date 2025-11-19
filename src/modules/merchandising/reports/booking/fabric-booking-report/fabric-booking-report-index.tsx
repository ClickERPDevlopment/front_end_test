import useApiUrl from "@/hooks/use-ApiUrl";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { FabricBookingReportDto } from "./fabric-booking-type";
import axios from "axios";
import useAppClient from "@/hooks/use-AppClient";
import FabricBookingReportFame from "./fame/fabric-booking-report-fame";
import FabricBookingReport from "./others-client/fabric-booking-report";
import ReportSkeleton from "@/components/feedback-interaction/report-skeleton";

export default function FabricBookingReportIndex() {
    const [data, setData] = useState<FabricBookingReportDto>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const api = useApiUrl();

    let poId: string | null = "";
    let styleId: string | null = "";
    let isPoWise: string | null = "";

    if (searchParams.get("poId")) {
        poId = searchParams.get("poId");
    }
    if (searchParams.get("styleId")) {
        styleId = searchParams.get("styleId");
    }
    if (searchParams.get("isPoWise")) {
        isPoWise = searchParams.get("isPoWise");
    }

    useEffect(() => {
        document.title = "Fabric Booking";
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);

                await axios
                    .get(
                        `${api.ProductionUrl}/production/Booking/FabricBookingReport?poId=${poId}&styleId=${styleId}&isPoWise=${isPoWise}`
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
    }, [api.ProductionUrl, isPoWise, poId, styleId]);
    const client = useAppClient();
    return (
        <>
            {isLoading ? (
                <div className="flex justify-center">
                    <ReportSkeleton />
                </div>
            ) :
                (client.currentClient == client.FAME ?
                    <FabricBookingReportFame data={data} isPoWise={isPoWise?.toLowerCase() === "true" ? true : false} /> :
                    <FabricBookingReport data={data} isPoWise={isPoWise?.toLowerCase() === "true" ? true : false} />)
            }
        </>
    );
}
