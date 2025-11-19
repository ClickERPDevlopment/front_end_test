import {
  PoWiseFabricAccessoriesStautsReportDto_Accessories,
  PoWiseFabricAccessoriesStautsReportDto_Fabric,
} from "../po-wise-f-a-s-type";

function ReportTable({
  lstFabric,
  lstAccessories,
}: {
  lstFabric: PoWiseFabricAccessoriesStautsReportDto_Fabric[];
  lstAccessories: PoWiseFabricAccessoriesStautsReportDto_Accessories[];
}) {
  return (
    <div className="mt-2 text-sm">
      <div className="flex items-center font-semibold">
        <p>BUYER: {lstFabric && lstFabric[0]?.BUYER}</p>
        <p className="pl-3">STYLE: {lstFabric && lstFabric[0]?.STYLE}</p>
        <p className="pl-3">PO/JOB: {lstFabric && lstFabric[0]?.PONO}</p>
      </div>
      <table className="border-collapse border border-gray-300  w-[100%]">
        <thead>
          <tr className="text-center">
            <td colSpan={10} className="font-semibold">
              FABRIC DETAILS
            </td>
          </tr>
          <tr className="text-center font-semibold">
            <th className="border border-gray-300 p-1">SL NO</th>
            <th className="border border-gray-300 p-1">MATERIAL DESCRIPTION</th>
            <th className="border border-gray-300 p-1">MAT. COLOR</th>
            <th className="border border-gray-300 p-1">UOM</th>
            <th className="border border-gray-300 p-1">REQ. QTY</th>
            <th className="border border-gray-300 p-1">WO QTY</th>
            <th className="border border-gray-300 p-1">RCVD QTY</th>
            <th className="border border-gray-300 p-1">RCVD BAL</th>
            <th className="border border-gray-300 p-1">WO NO</th>
            <th className="border border-gray-300 p-1">SUPPLIER NAME</th>
          </tr>
        </thead>
        <tbody>
          {lstFabric?.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-1 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-1">
                {item.MATERIAL_DESCRIPTION}
              </td>
              <td className="border border-gray-300 p-1">{item.MAT_COLOR}</td>
              <td className="border border-gray-300 p-1 text-center">
                {item.UOM}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.REQ_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.WO_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.RCVD_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.RCVD_BAL}
              </td>
              <td className="border border-gray-300 p-1">{item.WO_NO}</td>
              <td className="border border-gray-300 p-1">
                {item.SUPPLIER_NAME}
              </td>
            </tr>
          ))}

          <tr className="text-center">
            <td colSpan={10} className="font-semibold">
              TRIMS & ACCESSORIES DETAILS
            </td>
          </tr>
          {lstAccessories?.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-1 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-1">
                {item.MATERIAL_DESCRIPTION}
              </td>
              <td className="border border-gray-300 p-1">{item.MAT_COLOR}</td>
              <td className="border border-gray-300 p-1 text-center">
                {item.UOM}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.REQ_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.WO_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.RCVD_QTY}
              </td>
              <td className="border border-gray-300 p-1 text-center">
                {item.RCVD_BAL}
              </td>
              <td className="border border-gray-300 p-1">{item.WO_NO}</td>
              <td className="border border-gray-300 p-1">
                {item.SUPPLIER_NAME}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
