import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetMaterial() {
  const api = useApiUrl();

  const getData = async (): Promise<Material[]> =>
    (await axios.get(api.ProductionUrl + "/store/Material")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.material],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetAllFabric() {
  const api = useApiUrl();

  const getData = async (): Promise<Material[]> =>
    (await axios.get(api.ProductionUrl + "/store/Material/GetAllFabric")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.material_fabric],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetAllYarn() {
  const api = useApiUrl();

  const getData = async (): Promise<Material[]> =>
    (await axios.get(api.ProductionUrl + "/store/Material/GetAllYarn")).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.material_yarn],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

export function GetMaterialById(id: number) {
  const api = useApiUrl();

  const getData = async (): Promise<Material> =>
    (await axios.get(api.ProductionUrl + "/store/Material/" + id)).data;

  const query = useQuery({
    queryKey: [ReactQueryKey.material, id],
    queryFn: getData,
    staleTime: 1000 * 10,
  });

  return query;
}

type Material = {
  ID: number;
  MATERIALGROUPID: number;
  MATERIALSUBGROUPID: number;
  CODE: string;
  NAME: string;
  TYPE: string;
  UOM: string;
  FABRICSTYPE: string;
  REORDERPOINT: string;
  CONSUMPTIONQTY: string;
  LEADTIME: string;
  LENGTH: number;
  WIDTH: number;
  HEIGHT: number;
  RATE: number;
  COLORDEPENDENT: string;
  SIZEDEPENDENT: string;
  PODEPENDENT: string;
  IMAGE: string;
  REMARKS: string;
  ISACTIVE: string;
  CREATEBY: string;
  CREATEDATE: string;
  UPDATEBY: string;
  UPDATEDATE: string;
  PURCHASE_UOM: string;
  USE_UOM: string;
  IS_EXPIRABLE: string;
  HS_CODE: string;
  NON_SORTABLE: string;
  CAPITAL_ASSET: string;
  SERVICE_LAVEL: string;
  SAFETY_STOCK: string;
  GROSS_WEIGHT: string;
  NET_WEIGHT: string;
  VOLUME: string;
  AREA_OF_USES: string;
  TOTAL_STOCK: string;
  CURRENCY_CODE: string;
  STANDARD_PRICE: string;
  INVENTORY_PRICE: string;
  STORAGE_LOCATION: string;
  BRAND_ID: string;
  ORGIN_ID: string;
  PRODUCTION_CAT_ID: string;
  IS_FIXED_ASSET: string;
  IS_CURRENT_ASSET: string;
  STOCK_LEDGER: string;
  DEPRECIATION_LEDGER: string;
  COST_LEDGER: string;
  IS_YEARLY_DEPRECIATION: string;
  IS_MONTHLY_DEPRECIATION: string;
  DEPRECIATION_PERCENTAGE: string;
  CONVERT_ASSET_ACC: string;
  SUPRESS_STOCK: string;
  CONE: string;
  WASTAGE: string;
  ISTHREAD: string;
  IS_SERVICE_TYPE: string;
  YARN_COUNT_ID: string;
  YARN_TYPE_ID: string;
  YARN_COMPOSITION_ID: string;
  SECTION: string;
  DISPLAY_NAME: string;
  IS_ROUNDING: string;
  DECIMAL_PLACE_NUMBER: string;
  IS_DYED_YARN: string;
  DYED_YARN_COLOR_ID: string;
  YARN_QUALITY_ID: string;
  BLEND_TYPE_ID: string;
};
