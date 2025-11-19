import { IGreyFabricStock } from "./IGreyFabricStock";
import PoWiseRows from "./po-wise-rows";
import TotalRow from "./total-row";

type props = {
  data: IGreyFabricStock[]
  buyerIndex: number
  poStyleIndex: number
}

export default function PoGroupSection({ data, buyerIndex, poStyleIndex }: props) {
  return (
    <>
      {data.map((f, key) => (
        <PoWiseRows
          key={key}
          rowIndex={key}
          data={f}
          buyerIndex={buyerIndex}
          poStyleIndex={poStyleIndex} />))}

      <TotalRow data={data} title={`${data[0]?.JOB_NO} Total`} />
    </>

  );
}
