import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Report from "./components/report";
import Skeleton from "react-loading-skeleton";
import TableSkeleton from "@/components/feedback-interaction/table-skeleton";
import useApiUrl from "@/hooks/use-ApiUrl";
import { BudgetReportResponseType } from "./budget-report-type";




function BudgetReport({ budgetApprovalCallback }: { budgetApprovalCallback?: (res: BudgetReportResponseType) => void }) {
    const [data, setData] = useState<BudgetReportResponseType>();
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const budgetId = searchParams.get("id");

    let id = "0";

    if (searchParams.get("id")) {
        id = String(searchParams.get("id"));
    }

    const api = useApiUrl();

    useEffect(() => {
        document.title = "Budget Report";
    }, []);

    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true);
                await axios
                    .get(
                        `${api.ProductionUrl}/production/MerchReport/BudgetReport?id=${id}`
                    )
                    .then((res) => {
                        if (res.data) {
                            setData(res.data);
                            budgetApprovalCallback?.(res.data);
                        }
                    })
                    .catch((m) => console.log(m));

                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error)
            }
        }
        getData();
    }, [api.ProductionUrl, id]);

    // useEffect(() => {

    //   setIsLoading(true)

    //   const getData = async () => {
    //     setIsLoading(true);

    //     await axios.get(api + "MerchReport/BudgetReport?id=" + id)
    //       .then(res => {
    //         setData(res?.data)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //       .finally(() => { setIsLoading(false) })
    //   }

    //   getData();
    // }, []);

    return isLoading ? (
        <>
            <div className="container">
                <h3 className=" text-center p-2 m-4 font-bold ">
                    <Skeleton width={400} height={40} />
                </h3>
                <TableSkeleton />
            </div>
        </>
    ) : (
        <>
            <div className="min-w-[50%] w-fit ms-auto me-auto">

                <Report data={data}></Report>
            </div>
        </>
    );
}
export default BudgetReport;
