import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IInventorySale {
    id: number;
    saleDate: string,
    saleDateString: string,
    saleNo: string,
    customerName: string,
    remarks?: string,
    totalAmount: number;
    vehicleNo?: string,
    driverName?: string,
    driverPhoneNo?: string,
    customerId: number,
    costCenterId: number,
    costCenterName: string,
    businessUnitId: number,
    businessUnitName: string,
    currencyId: number,
    currencyName: string,
    factoryID: number,
    actions?: string,
    customerAddress?: string;
    isApproved: number,
    details: IInventorySaleDetails[],
    editingDetailIndex?: number
}

export interface IInventorySaleDetails {
    id: number;
    storeId: number,
    storeName: string,
    itemId: number,
    itemName: string,
    brandName: string,
    brandId: number,
    originName: string,
    originId: number,
    model: string,
    qty: number,
    approvedQty: number,
    unitPrice: number,
    packingNote?: string,
    amount?: number,
    uom: string,
    actions?: string;

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
export type InventorySaleValidationErrors = Partial<Record<keyof IInventorySale, string>>;
export type CreateInventorySalePayload = Omit<IInventorySale, 'id'>;
export type UpdateInventorySalePayload = Partial<CreateInventorySalePayload>;

export interface IInventorySaleState {
    saleInfo: IInventorySale;
    detailsInfo: IInventorySaleDetails;
    sales: IInventorySale[];
    filteredStore: IInventorySale[];
    paginationObject: PaginationObject<IInventorySale>;
    loading: boolean;
    validationErrors: InventorySaleValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}