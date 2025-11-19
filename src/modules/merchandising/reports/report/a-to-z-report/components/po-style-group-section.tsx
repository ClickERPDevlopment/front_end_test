import { IAtoZReportFabric } from "./IAtoZReportFabric";
import { IAtoZReportGmt } from "./IAtoZReportGmt";
import PoStyleWiseRows from "./po-style-wise-rows";

type props = {
  data_fabric: IAtoZReportFabric[]
  data_gmt: IAtoZReportGmt[]
  buyerIndex: number
  poStyleIndex: number
}

export default function PoStyleGroupSection({ data_fabric, data_gmt, buyerIndex, poStyleIndex }: props) {
  return (
    <PoStyleWiseRows
      data_fabric={data_fabric}
      data_gmt={data_gmt}
      buyerIndex={buyerIndex}
      poStyleIndex={poStyleIndex} />
  );
}
