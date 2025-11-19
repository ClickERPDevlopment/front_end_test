type TableRowProps = {
    DS: string;
    MTL: string;
    UOM: string;
    TOTAL_QTY: number;
    BUDGET_PRICE: number;
    BUDGET_TOTAL_VALUE: number;
};

function TableRow({
    DS,
    MTL,
    UOM,
    TOTAL_QTY,
    BUDGET_PRICE,
    BUDGET_TOTAL_VALUE,
}: TableRowProps) {
    return (
        <tr style={{ fontSize: "11px" }} className="font-bol">
            <td className="border border-gray-950 p-0.5">{DS}</td>
            <td className="border border-gray-950 p-0.5">{MTL}</td>
            <td className="border border-gray-950 p-0.5">{UOM}</td>
            <td className="border border-gray-950 p-0.5">{TOTAL_QTY.toFixed(2)}</td>
            <td className="border border-gray-950 p-0.5">{BUDGET_PRICE.toFixed(2)}</td>
            <td className="border border-gray-950 p-0.5">{BUDGET_TOTAL_VALUE.toFixed(2)}</td>
        </tr>
    );
}

export default TableRow;
