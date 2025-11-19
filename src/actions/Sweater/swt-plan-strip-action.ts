import { StripSerachType } from "@/modules/sweater/plan-strip/components/swt-plan-strip-search-from";
import { AxiosInstance } from "axios";
// import { StripSerachType } from "@/app/sweater/plan-strip/components/swt-plan-strip-search-from";
import moment from "moment";

export type SwtPlanStripType = {
  ID: number;
  COMPANY_ID: number;
  BUYER_ID: number;
  PO_ID: number;
  STYLE_ID: number;
  DELIVERY_DATE: string;
  ORDER_PLACEMENT_MONTH: string;
  COLOR_ID: number;
  MC_GAUGE_ID: number;
  ORDER_QTY: number;
  EXTRA_PERCENTAGE: number;
  REQUIRED_DAY_FOR_FINISHING: number;
  TOTAL_ORDER_QTY: number;
  CREATED_BY: string | undefined;
  CREATED_DATE: Date | undefined;
  UPDATED_BY: string | undefined;
  UPDATED_DATE: Date | undefined;
  //===================
  COMPANY: string | undefined;
  BUYER: string | undefined;
  PO: string;
  STYLE: string;
  STYLENAME: string;
  COLOR: string | undefined;
  MC_GAUGE: string;
  MERCHANDISER: string;
  CREATED_BY_NAME: string | undefined;
  UPDATED_BY_NAME: string | undefined;
  //===================
  lstSwtPlanStripDetails: SwtPlanStripDtlsType[];
};

export type SwtPlanStripDtlsType = {
  ID: number;
  MASTER_ID: number;
  MC_BRAND_ID: number;
  LEARNING_CURVE_ID: number;
  SMV: number;
  MC_BRAND: string;
  LEARNING_CURVE: string;
};

export async function GetAllPlanStrips(
  formData: StripSerachType,
  axios: AxiosInstance
) {
  const companyId = localStorage.getItem("companyId");
  const data = async () =>
    await axios.get(
      `/production/SwtPlanStrip?companyid=${companyId}&buyerId=${formData.buyerId
      }&poId=${formData.poId}&styleId=${formData.styleId
      }&deliveryDateFrom=${moment(formData.fromDate).format(
        "DD-MMM-YY"
      )}&deliveryDateTo=${moment(formData.toDate).format(
        "DD-MMM-YY"
      )}&isStripDone=${formData.isStripDone}`
    );

  return data().then((res) => {
    const tempData = (res.data as SwtPlanStripType[] | undefined)?.map((d) => {
      d.DELIVERY_DATE = moment(d.DELIVERY_DATE).format("DD-MMM-YY");
      d.ORDER_PLACEMENT_MONTH = moment(d.ORDER_PLACEMENT_MONTH).format(
        "DD-MMM-YY"
      );
      return d;
    });

    return tempData;
  });
}

export async function Save(formData: SwtPlanStripType[], axios: AxiosInstance) {
  if (formData.length <= 0) {
    throw new Error("No strip to be saved. Strips are required.");
  }

  formData.forEach((element) => {
    if (element.lstSwtPlanStripDetails.length <= 0)
      throw new Error(
        `${element.BUYER} || ${element.STYLE} || ${element.PO}. Please add Brand and Learning curve details.`
      );
  });
  const response = await axios.post("/production/SwtPlanStrip", formData);
  if (!response || response.status !== 204) {
    console.log(response.data);
    throw new Error("Some error happend. Please try agian.");
  }
}

export async function Delete(id: number, axios: AxiosInstance) {
  if (id <= 0) {
    throw new Error("Please select a strip.");
  }

  const response = await axios.delete(`/production/SwtPlanStrip/${id}`);

  if (!response || response.status !== 204) {
    console.log(response.data);
    throw new Error(JSON.stringify(response.data));
  }
}
