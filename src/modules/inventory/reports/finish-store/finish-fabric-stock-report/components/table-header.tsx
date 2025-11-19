import { cn } from "@/lib/utils";

export default function TableHeader({ isSizeWiseCheck }: { isSizeWiseCheck?: boolean }) {
    return (
        <thead className="bg-blue-300 sticky top-0">
            <tr>
                <th className="text-xs border border-black p-2 min-w-24">OPM</th>
                <th className="text-xs border border-black p-2 min-w-24">Buyer</th>
                <th className="text-xs border border-black p-2 min-w-24">PO</th>
                <th className="text-xs border border-black p-2 min-w-24">Style</th>
                <th className="text-xs border border-black p-2 min-w-24" >Color</th>
                <th className={cn(`text-xs border border-black p-2 min-w-24`, isSizeWiseCheck ? '' : 'hidden')}>Size</th>
                <th className="text-xs border border-black p-2 min-w-24">Parts</th>
                <th className="text-xs border border-black p-2 min-w-24">UOM</th>
                <th className="text-xs border border-black p-2 min-w-24">Order Qty [A]</th>
                <th className="text-xs border border-black p-2 min-w-24">Grey Del. To Dyeing [B]</th>
                <th className="text-xs border border-black p-2 min-w-24">Fin. Fab. RCV (G.W) [C]</th>
                <th className="text-xs border border-black p-2 min-w-24">B/L on Grey Issue [D=B-C]</th>
                <th className="text-xs border border-black p-2 min-w-24">Fin. Fab. RCV (F.W) [E]</th>
                <th className="text-xs border border-black p-2 min-w-24">Dye. Process loss%  [F=(C-E)/C]</th>
                <th className="text-xs border border-black p-2 min-w-24">Fabrics Purchased [G]</th>
                <th className="text-xs border border-black p-2 min-w-24">RCV From Other PO [H]</th>
                <th className="text-xs border border-black p-2 min-w-24">Total Rcv [I=E+G+H]</th>
                <th className="text-xs border border-black p-2 min-w-24">Cutting Issue Return Rcv [J]</th>
                <th className="text-xs border border-black p-2 min-w-24">Issue For Re-Dyeing [K]</th>
                <th className="text-xs border border-black p-2 min-w-24">Re-Dyeing Receive [L]</th>
                <th className="text-xs border border-black p-2 min-w-24">Re-Dyeing RCV B/L [M=K-L]</th>
                <th className="text-xs border border-black p-2 min-w-24">Cutting Issue Qty [N]</th>
                <th className="text-xs border border-black p-2 min-w-24">Issue to Other PO [O]</th>
                <th className="text-xs border border-black p-2 min-w-24">LO Issue [P]</th>
                <th className="text-xs border border-black p-2 min-w-24">Total Issue [Q=N+O+P]</th>
                <th className="text-xs border border-black p-2 min-w-24">Stock Qty [R=I+J+L-K-Q]</th>
            </tr>
        </thead>
    )
}
