import { IGreyFabricStock } from "./IGreyFabricStock";
import PoGroupSection from "./po-group-section";
import TotalRow from "./total-row";

type props = {
  data_fabric: IGreyFabricStock[]
  buyerIndex: number
}

export default function BuyerGroupSection({ data_fabric, buyerIndex }: props) {
  const uniquePo = [...new Set(data_fabric?.map(item => item.PO_ID))];

  return (
    <>
      {uniquePo?.map((item, i) => (
        <PoGroupSection
          data={data_fabric?.filter(y => y.PO_ID === item)}
          buyerIndex={buyerIndex}
          poStyleIndex={i}
          key={i}
        />
      ))}
      <TotalRow data={data_fabric} title={`${data_fabric[0]?.BUYER} Total`} />
    </>
  )
}
