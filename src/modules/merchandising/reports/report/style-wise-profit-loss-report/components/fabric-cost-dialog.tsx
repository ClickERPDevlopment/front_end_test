/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useAxiosInstance from "@/hooks/axios-instance";
import useApiUrl from "@/hooks/use-ApiUrl"
// import useAxiosInstance from "@/hooks/axios-instance";
import React from "react"

type IStyleWiseProfitLossReportFabricCosting = {
    PO_ID: number;
    PONO: string;
    STYLE_ID: number;
    STYLENO: string;
    FABRIC_ID: number;
    FABRIC: string;
    FABRIC_QUANTITY: number;
    FABRIC_COST: number;
    FABRIC_RATE: number;
}

type props = {
    text: string,
    poId: number,
    styleId: number
}
export function FabricCostDialog({ text, poId, styleId }: props) {
    const api = useApiUrl();
    const axios = useAxiosInstance();
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const [data, setData] = React.useState<IStyleWiseProfitLossReportFabricCosting[]>()

    React.useEffect(() => {
        if (open) {
            setLoading(true)

            const getData = async () =>
                await axios.get(`${api.ProductionUrl}/production/MerchReport/StyleWiseProfitLossReport_FabricCost?poId=${poId}&styleId=${styleId}`);

            getData().then((res) => {
                setData(res.data)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            }).catch((err) => {
                console.log(err)
                setTimeout(() => {
                    setLoading(false)
                }, 200);
            });
        }
    }, [open, poId, styleId])

    return (
        <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
            <form>
                <DialogTrigger asChild>
                    <Button variant="link" className="m-0 p-0 h-auto text-[11px] text-blue-700 cursor-pointer">{text}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Fabric Cost Details</DialogTitle>
                        <DialogDescription>
                            Fabric unit price data get from budget. Fabric quantity data get from cutting issue.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 flex-col min-h-24">
                        <div className="flex justify-start items-center flex-wrap gap-2 font-bold">
                            <Label className="font-bold underline">Style: {loading ? <Skeleton className="h-3 w-20 ml-1 rounded-sm" /> : data && data[0]?.STYLENO}</Label>
                            <Label className="font-bold underline">PO: {loading ? <Skeleton className="h-3 w-20 ml-1 rounded-sm" /> : data && data[0]?.PONO}</Label>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="sm:w-48">Fabric</TableHead>
                                    <TableHead className="text-wrap">Fabric Unit Price</TableHead>
                                    <TableHead className="text-wrap">Fabric Quantity</TableHead>
                                    <TableHead className="text-wrap">Fabric Total Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ?
                                    <>
                                        <TableRow>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-5 w-full" /></TableCell>
                                        </TableRow>
                                    </>
                                    :
                                    <>
                                        {data?.map((x, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell className="text-wrap">{x.FABRIC}</TableCell>
                                                    <TableCell>{x.FABRIC_RATE.toFixed(6)}</TableCell>
                                                    <TableCell>{x.FABRIC_QUANTITY}</TableCell>
                                                    <TableCell>{x.FABRIC_COST.toFixed(6)}</TableCell>
                                                </TableRow>)
                                        })}
                                        <TableRow>
                                            <TableCell className="text-wrap" colSpan={2}>Total</TableCell>
                                            <TableCell>{data?.reduce((p, c) => p + c.FABRIC_QUANTITY, 0).toFixed(6)}</TableCell>
                                            <TableCell>{data?.reduce((p, c) => p + c.FABRIC_COST, 0)?.toFixed(6)}</TableCell>
                                        </TableRow>
                                    </>
                                }



                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter>
                        {/* <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button> */}
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
