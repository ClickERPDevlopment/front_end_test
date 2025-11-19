import { IAtoZReportFabric } from "./IAtoZReportFabric";
import { IAtoZReportGmt } from "./IAtoZReportGmt";
import PoStyleGroupSection from "./po-style-group-section";
import TotalRow from "./total-row";

type props = {
  data_fabric: IAtoZReportFabric[]
  data_gmt: IAtoZReportGmt[]
  buyerIndex: number
}

export default function BuyerGroupSection({ data_fabric, data_gmt, buyerIndex }: props) {

  const uniquePoStyle = Array.from(
    new Map(
      data_fabric
        ?.filter(item => item.PO_ID && item.STYLE_ID)
        .map(item => [
          `${item.PO_ID}__${item.STYLE_ID}`,
          { PO_ID: item.PO_ID, STYLE_ID: item.STYLE_ID }
        ])
    ).values()
  );

  return (
    <>
      {uniquePoStyle?.map((item, i) => (
        <PoStyleGroupSection
          data_fabric={data_fabric?.filter(y => y.PO_ID === item.PO_ID && y.STYLE_ID === item.STYLE_ID)}
          data_gmt={data_gmt?.filter(y => y.JOB_PO_ID === item.PO_ID && y.MAIN_STYLE_ID === item.STYLE_ID)}
          buyerIndex={buyerIndex}
          poStyleIndex={i}
          key={i}
        />
      ))}
      <TotalRow data={data_fabric} title="Buyer-wise Total" />
    </>
  )
}
