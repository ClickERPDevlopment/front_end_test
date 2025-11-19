import TableHeader from "./components/table-header";
import TableRow from "./components/table-row";
import TableTotalRow from "./components/table-total-row";
import { IFinishFabricStockReport } from "./IFinishFabricStockReport";

interface props {
  data?: IFinishFabricStockReport[];
  CompanyName?: string;
  CompanyAddress?: string;
  isSizeWiseCheck?: boolean;
}

export default function Report({
  data,
  CompanyName,
  isSizeWiseCheck
}: props) {

  const uniquePo = [...new Set(data?.map(item => item.PO_NO))];

  return (
    <>
      <div className="m-3 inline-block print:overflow-visible">
        {/* heading */}
        <div className="">
          <div className=" text-slate-700 my-1 font-bold text-xl">
            <span className="px-3 py-1">
              {CompanyName}
            </span>
          </div>
          <div className="text-left text-slate-700 my-1 font-bold text-base">
            <span className="px-3 py-1">
              Order Wise Finish Fabric Delivery Report
            </span>
          </div>
        </div>
        {/* end heading */}

        {/* table */}
        <div className="min-w-[100%] mt-8">
          <div className="flex flex-col justify-center">
            <table className="w-full">
              <TableHeader isSizeWiseCheck={isSizeWiseCheck} />
              <tbody>
                {uniquePo?.map((po) => {
                  return (
                    <>
                      {GetStylesByPo(data, po)?.map((style) => {
                        return (
                          <>
                            {GetDataByPoStyle(data, po, style)?.map((styleData) => <TableRow data={styleData} isSizeWiseCheck={isSizeWiseCheck} />)}
                            <TableTotalRow data={GetDataByPoStyle(data, po, style)} title="Style Total" isSizeWiseCheck={isSizeWiseCheck} />
                          </>
                        )
                      })}
                      <TableTotalRow data={GetDataByPo(data, po)} title="PO Total" isSizeWiseCheck={isSizeWiseCheck} />
                    </>
                  )
                })}
                <TableTotalRow data={data} title="Grand Total" isSizeWiseCheck={isSizeWiseCheck} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

const GetStylesByPo = (data?: IFinishFabricStockReport[], po?: string) =>
  [...new Set(data?.filter((d) => d.PO_NO === po)?.map(item => item.STYLENO))]

const GetDataByPo = (data?: IFinishFabricStockReport[], po?: string) =>
  data?.filter((d) => d.PO_NO === po)

const GetDataByPoStyle = (data?: IFinishFabricStockReport[], po?: string, style?: string) =>
  data?.filter((d) => d.PO_NO === po && d.STYLENO === style)
