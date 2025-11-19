/* eslint-disable @typescript-eslint/no-explicit-any */

interface IGroupedRow {
  STYLE: string;
  JOB: string;
  PO: Set<string>;
  ORDER: string;
  COLOR: string;
  MTL_COLOR: string;
  REF_SWATCH: string;
  MTL_SIZE: string;
  ITEM_NAME: string;
  UOM: string;
  ITEM_REF: string;
  TOTAL_QTY: number;
  RATE: number;
  AMOUNT: number;
  SIZES: { [key: string]: number };
}

interface ReportSubGroupProps {
  data: IGroupedRow[];
  sizeHeader: string[] | null;
  mtlName: string;
}

function ReportSubGroup({ data, sizeHeader }: ReportSubGroupProps) {

  const subTotal: { [key: string]: number } = {};
  let totalQty = 0;
  let totalAmt = 0;

  data.forEach((row) => {
    totalQty += row.TOTAL_QTY;
    totalAmt += row.AMOUNT;

    sizeHeader?.forEach((size) => {
      subTotal[size] = (subTotal[size] || 0) + (row.SIZES[size] || 0);
    });
  });

  return (
    <>
      {data.map((row, index) => (
        <tr key={index}>
          <td className="border text-center border-gray-950 p-1">
            {row.STYLE}
          </td>
          <td className="border border-gray-950 p-1">{row.COLOR}</td>
          <td className="border border-gray-950 p-1">{row.MTL_COLOR}</td>
          <td className="border border-gray-950 p-1">{row.ITEM_NAME}</td>

          {sizeHeader?.map((size) => (
            <td key={size} className="border border-gray-950 p-1 text-center">
              {row.SIZES[size] || ""}
            </td>
          ))}

          <td className="border border-gray-950 p-1 text-center">
            {row.TOTAL_QTY}
          </td>
          <td className="border border-gray-950 p-1 text-center">{row.UOM}</td>
        </tr>
      ))}

      <tr className="font-semibold" style={{ backgroundColor: "#fbffdd" }}>
        <td
          colSpan={4}
          className="border text-center border-gray-950 p-1 font-semibold"
        >
          Item Wise Sub Total
        </td>

        {sizeHeader?.map((size) => (
          <td
            key={size}
            className="border border-gray-950 p-1 text-center font-semibold"
          >
            {subTotal[size] || ""}
          </td>
        ))}

        <td className="border border-gray-950 p-1 text-center font-semibold">
          {totalQty}
        </td>
        <td className="border border-gray-950 p-1 text-center"></td>
      </tr>
    </>
  );
}

export default ReportSubGroup;
