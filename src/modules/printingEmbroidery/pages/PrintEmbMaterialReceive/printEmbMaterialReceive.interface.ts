import z from "zod";
import { PaginationObject } from "../../../../types/global";

//print emb material receive
export interface EmbMaterialReceiveMasterType{
    ID: number;
    RECEIVE_DATE: string
    WORKORDER_TYPE_ID: number;
    WORKORDER_TYPE: string;
    FLOOR_ID: number;
    FLOOR: string;
    WORKORDER_ID: number;
    WORKORDER_NO: string;
    WORKORDER_RECEIVE_ID: number;
    WORKORDER_RECEIVE_NO: string;
    MATERIAL_RECEIVE_NO: string;
    EMB_CATEGORY_ID: number;
    EMB_CATEGORY: string;
    SUPPLIER_ID: number;
    SUPPLIER: string;
    CREATED_BY?: string | null;
    CREATED_DATE?: string | null;
    UPDATED_BY?: string | null;
    UPDATED_DATE?: string | null;
    BUYER: string;
    STYLE: string;
    PO: string;
    OS_BUYER: string;
    OS_STYLE: string;
    OS_PO: string;
    MATERIAL_RECEIVE_SERIAL: number;
    EmbMaterialReceiveDetails: EmbMaterialReceiveDetailsType[];
      actions?: string,
};
export type EmbMaterialReceiveDetailsType = {
    ID: number;
    MASTER_ID: number;
    BUYER_ID: number;
    BUYER: string;
    OS_BUYER_ID: number;
    OS_BUYER: string;
    STYLE_ID: number;
    STYLE: string;
    OS_STYLE_ID: number;
    OS_STYLE: string;
    PO_ID: number;
    PO: string;
    OS_PO_ID: number;
    OS_PO: string;
    COLOR_ID: number;
    COLOR: string;
    SIZE_ID: number;
    SIZE: string;
    WO_QTY: number;
    RCV_QTY: number;
    PREV_RCV_QTY: number;
    PARTS: string;
    EmbMaterialReceiveParts: EmbMaterialReceiveDetailsPartsType[];
};

export type EmbMaterialReceiveDetailsPartsType = {
    ID: number;
    MASTER_ID: number;
    PARTS_ID: number;
    PARTS: string;
};

export type NextReceiveNumberType = {
    serialNo: number;
    receiveNo: string;
}

// Zod schema
const baseInventorySaleSchema = z.object({
  id: z.number().optional(),
  saleDateString: z.string()
    .min(1, "Sale date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Sale date must be in yyyy-mm-dd format"),

  customerId: z.union([z.string(), z.number()])
    .transform(val => Number(val))
    .refine(val => val > 0, { message: "Please select Customer" }),

  costCenterId: z.union([z.string(), z.number()])
    .transform(val => Number(val))
    .refine(val => val > 0, { message: "Please select Cost Center" }),

  businessUnitId: z.union([z.string(), z.number()])
    .transform(val => Number(val))
    .refine(val => val > 0, { message: "Please select Business Unit" }),

  currencyId: z.union([z.string(), z.number()])
    .transform(val => Number(val))
    .refine(val => val > 0, { message: "Please select Currency" }),

  vehicleNo: z
    .string()
    .max(100, "Vehicle number cannot exceed 100 characters")
    .optional().nullable(),

  driverName: z
    .string()
    .max(100, "Driver name cannot exceed 100 characters")
    .optional().nullable(),

  driverPhoneNo: z
    .string()
    .max(13, "Driver phone number cannot exceed 13 characters")
    .optional().nullable(),

  remarks: z
    .string()
    .max(200, "Remarks cannot exceed 200 characters")
    .optional().nullable(),

  details: z.array(z.any()).min(1, "At least one sale detail is required"),

  editingDetailIndex: z.number().optional(),
  actions: z.string().optional(),
});

export const inventorySaleInsertSchema = baseInventorySaleSchema.extend({
  factoryID: z
    .number({
      required_error: "Factory is required",
    })
    .nonnegative({ message: "Factory is required" }),
});

export const inventorySaleUpdateSchema = baseInventorySaleSchema.extend({
  factoryID: z.number().optional(),
});

// Validation error type
export type EmbMaterialReceiveValidationErrors = Partial<Record<keyof EmbMaterialReceiveMasterType, string>>;
export type CreateEmbMaterialReceivePayload = Omit<EmbMaterialReceiveMasterType, 'id'>;
export type UpdateEmbMaterialReceivePayload = Partial<CreateEmbMaterialReceivePayload>;

export interface EmbMaterialReceiveMasterTypeState {
  masterInfo: EmbMaterialReceiveMasterType;
  detailsInfo: EmbMaterialReceiveDetailsType;
  materialReceiveLst:  EmbMaterialReceiveMasterType[];
  paginationObject: PaginationObject<EmbMaterialReceiveMasterType>;
  loading: boolean;
  validationErrors: EmbMaterialReceiveValidationErrors | null;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  message: string | null;
}


