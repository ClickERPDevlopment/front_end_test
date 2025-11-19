import z from "zod";
export interface IPoRelease {
  id: number;
  purchaseOrderNo: string;
  poDate: string;
  poDateString: string;
  proposeBy: string;
  prefix: string;
  orderType: string;
  approvedName?: string;
  departmentName?: string;
  supplierName?: string;
  isReleased?: number;
  isApproved: number;
  myReleaseStatus: number;
  actions?: string;
  details: IPoReleaseDetails[];
}

export interface IPoReleaseDetails {
  id: number;
  itemId: number;
  itemName: string;
  brandId: number;
  brandName: string;
  originId: number;
  originName: string;
  modelName: string;
  approvedQty: number;
  approxRate: number;
  uomName: string;
  assignedTo?: string;
  supplierName?: string;
  currencyName?: string;
  workOrderQty?: number;
  uomPrice?: number;
  totalPrice?: number;
  approvedUnitPrice?: number;
  approvedTotalPrice?: number;
  remarks?: string;
  btnHistoryAction?: string;
  btnRefAction?: string;
  maxApprovedPosition?: number;
  myPosition?: number;
  purchaseOrderNo?: string;
  currencySymbol?: string;
  masterID?: number;
  reqNumber?:string;
  reqIds?:string


}
export interface IHistoryLeft {
  materialName: string;
  brandName: string;
  originName: string;
  model: string;
  stockQty: number;
  uom: string;
}

export interface IHistoryRight {
  poDate: string;
  purchaseOrderNo: string;
  workOrderQty: number;
  receiveQty: number;
  uom: string;
  uomPrice: number;
  currency: string;
  brandName: string;
  originName: string;
  modelName: string;
  supplierName: string;
}


// {
//     "purchaseOrderNo": "POICCL112507001119",
//     "myPosition": 1,
//     "maxApprovalPosition": 1,
//     "id": 6933,
//     "itemId": 6705,
//     "itemName": "FLX128GBS (organ)",
//     "uomName": "PCS",
//     "currencySymbol": "BDT",
//     "brandName": null,
//     "originName": "N/A",
//     "modelName": "N/A",
//     "remarks": null,
//     "serviceDescription": null,
//     "workOrderQty": 109,
//     "uomPrice": 0.001,
//     "reqNumber": null,
//     "reqIds": null,
//     "CurrentPage": 0,
//     "PerPage": 0,
//     "PageNumber": 1,
//     "SearchTerm": "",
//     "PageSize": 10
// }

// Zod schema
const basePoReleaseSchema = z.object({
  // id: z.number().optional(),
  // saleDateString: z.string()
  //   .min(1, "Sale date is required")
  //   .regex(/^\d{4}-\d{2}-\d{2}$/, "Sale date must be in yyyy-mm-dd format"),

  // customerId: z.union([z.string(), z.number()])
  //   .transform(val => Number(val))
  //   .refine(val => val > 0, { message: "Please select Customer" }),

  // costCenterId: z.union([z.string(), z.number()])
  //   .transform(val => Number(val))
  //   .refine(val => val > 0, { message: "Please select Cost Center" }),

  // businessUnitId: z.union([z.string(), z.number()])
  //   .transform(val => Number(val))
  //   .refine(val => val > 0, { message: "Please select Business Unit" }),

  // currencyId: z.union([z.string(), z.number()])
  //   .transform(val => Number(val))
  //   .refine(val => val > 0, { message: "Please select Currency" }),

  // details: z.array(z.any()).min(1, "At least one sale detail is required"),

  // editingDetailIndex: z.number().optional(),
  // actions: z.string().optional(),
});

export const PoReleaseInsertSchema = basePoReleaseSchema.extend({
  factoryID: z
    .number({
      required_error: "Factory is required",
    })
    .nonnegative({ message: "Factory is required" }),
});

export const PoReleaseUpdateSchema = basePoReleaseSchema.extend({
  factoryID: z.number().optional(),
});

// Validation error type
export type PoReleaseValidationErrors = Partial<Record<keyof IPoRelease, string>>;
export type CreatePoReleasePayload = Omit<IPoRelease, 'id'>;
export type UpdatePoReleasePayload = Partial<CreatePoReleasePayload>;

export interface IPoReleaseState {
  info: IPoRelease;
  detailsInfo?: IPoReleaseDetails | null;
  detailsList: IPoReleaseDetails[];
  poList: IPoRelease[];
  paginationObject?: any;
  loading: boolean;
  validationErrors: PoReleaseValidationErrors | null;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  message: string | null;
}