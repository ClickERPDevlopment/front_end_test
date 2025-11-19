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
import useApiUrl from "@/hooks/use-ApiUrl"
import useAxiosInstance from "@/hooks/axios-instance";
import React from "react"

type IStyleWiseCostBreakdown_FabricCosting = {
    PO_ID: number,
    STYLE_ID: number,
    CUTTING_ISSUE_QTY: number,
    TOTAL_FABRIC_COST_BUDGET: number,
    FABRIC_COST: number,
    PONO: string,
    STYLENO: string,
    FABRIC: string,
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

    const [data, setData] = React.useState<IStyleWiseCostBreakdown_FabricCosting[]>()

    React.useEffect(() => {
        if (open) {
            setLoading(true)

            const getData = async () =>
                await axios.get(`${api.ProductionUrl}/production/StyleWiseCostBreakdown/GetStyleWiseCostBreakdown_FabricCost?poId=${poId}&styleId=${styleId}`);

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
                    <Button variant="link" className="m-0 p-0 h-auto">{text}</Button>
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
                                                    <TableCell>{x.TOTAL_FABRIC_COST_BUDGET.toFixed(3)}</TableCell>
                                                    <TableCell>{x.CUTTING_ISSUE_QTY}</TableCell>
                                                    <TableCell>{x.FABRIC_COST.toFixed(2)}</TableCell>
                                                </TableRow>)
                                        })}
                                        <TableRow>
                                            <TableCell className="text-wrap" colSpan={2}>Total</TableCell>
                                            <TableCell>{data?.reduce((p, c) => p + c.CUTTING_ISSUE_QTY, 0)}</TableCell>
                                            <TableCell>{data?.reduce((p, c) => p + c.FABRIC_COST, 0)?.toFixed(2)}</TableCell>
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
