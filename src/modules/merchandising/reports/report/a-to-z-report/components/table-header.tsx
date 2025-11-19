
export default function TableHeader() {
    return (
        <>
            <tr>
                <th className="min-w-[100px]  text-balance  text-center p-1 rounded-tl-md border-r border-gray-500" rowSpan={2}>
                    Buyer
                </th>
                <th className="min-w-[100px]  text-balance  text-center p-1 border-r border-gray-500 " rowSpan={2}>
                    Order/Job #
                </th>
                <th className="min-w-[100px] text-balance  text-center p-1  border-r border-gray-500" rowSpan={2}>
                    Style
                </th>
                <th className="min-w-[100px] text-balance  text-center p-1  border-r border-gray-500" rowSpan={2}>
                    Item Type
                </th>
                <th className="min-w-[100px] text-balance  text-center p-1  border-r border-gray-500" rowSpan={2}>
                    SMV
                </th>
                <th className="min-w-[70px] text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>
                    Qrder Qty (Pcs) [A]
                </th>
                <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Consumption Release Dt. </th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={6}>Yarn</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Yarn Issue Last.Dt.</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Knitting Start Dt.</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={3}>Knitting</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 " rowSpan={2}>Knitting Close Dt.</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={11}>Dyeing</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500 " colSpan={3}>Finish Fabric</th>
                <th className="text-balance text-center p-1 border-r border-gray-500" rowSpan={2}>Fin Fabrics Del. Last Date</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={5}>General Info</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={3}>Cutting</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={2}>Input</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={2}>Sewing</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={3}>Finishing</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={3}>Packing</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500" colSpan={2}>Shipping</th>
                <th className="text-balance text-center p-1 border-r border-b border-gray-500">Summery</th>
            </tr>
            <tr>
                {/* <th colSpan={6}>Yarn</th> */}

                <th className="text-balance text-center p-1 border-r border-gray-500  ">Required (KG) [B]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Allocation (KGs) [C]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Bal. to Allocation (KGs) <span className="text-nowrap">[D=B-C]</span>	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Yarn Allocation Close Dt.	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Yarn Issue to Knitting (KGs) [E]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Issue Bal <span className="text-nowrap">[F=C-E] </span></th>


                {/* <th colSpan={3}>Knitting</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Knitting Qty (KGs) [G]	<span className="hidden">(Grey rcv by gmt) </span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500  "> Knitting Bal Qty (KGs)<span className="text-nowrap">[H=B-G]</span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500  "> WIP <span className="text-nowrap">[I=E-G]</span></th>


                {/* <th colSpan={7}>Dyeing</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Gray RCVD Qty (KGs) [J]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Batch Qty (KGs) [K]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Ready for Batch Qty (KGs) <span className="text-nowrap">[L=J-K]</span> 	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Dyeing Qty (KGs) [M]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500  ">Finishing Qty(GW) [T]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Finished Qty (KGs) [N]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Fabric Process Loss (%)</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Ready for Inspection Qty (KGs) [O]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Deliver Qty G.W [U]	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">RFT <span className="text-nowrap">[P=N-O]</span> 	</th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Del Bal G W<span className="text-nowrap">[P=N-O]</span> 	</th>

                {/* <th colSpan={3}>Finish fabric</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Req Finished Fabric Qty (KGs)<span className="text-nowrap">[Q=B*0.89]</span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Ready for Delivery [R]	</th>
                <th className="text-balance text-center p-1  border-r border-gray-500">Rcv Bal Qty (KGs) <span className="text-nowrap">[S=Q-R]</span></th>


                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={4}>General Info</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Style<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500 min-w-24">PO<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500 min-w-24">Ship Date<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Line<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Order Qty (KGs) <span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Cutting</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Cutting Qty (Pcs)<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Bal to Cut (Pcs)<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Cutting %<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Input</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Qty<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Ready<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Sewing</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Output<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">WIP<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Finishing</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Input<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Output<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">WIP<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={3}>Packing</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Input<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Output<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">WIP<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500" colSpan={2}>Shipping</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Qty<span className="text-nowrap"></span></th>
                <th className="text-balance text-center p-1 border-r border-gray-500">Bal<span className="text-nowrap"></span></th>

                {/* <th className="text-balance text-center p-1 border-r border-gray-500">Summery</th> */}
                <th className="text-balance text-center p-1 border-r border-gray-500">Cut to Ship(%)<span className="text-nowrap"></span></th>
            </tr>
        </>

    )
}
