export default function TableHeader() {
    return (
        <>
            <tr>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Buyer</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Job No</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Style</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Order No</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Color</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Fabric</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">GSM</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 max-w-24">Fin. Dia</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Gray Req. Qty [A]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Receive Qty [B]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Transfer In Qty [C]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Total Rcvd Qty [D= B+C]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Receive Bal. Qty [E= D-A]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Delivery Qty [F]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Transfer Out Qty [G]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Total Delivery Qty [H= F+G]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Delivery Bal. Qty [I= H-A]</th>
                <th className="text-balance text-center p-1 border-r border-gray-500 ">Stock Qty [J= D-H]</th>
            </tr>
        </>

    )
}
