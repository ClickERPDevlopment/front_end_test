import z from "zod";

export interface FactoryGatePassDepartmentDto {
    name: string;
}

export interface SamplePOStyleSearchDto {
    placementMonthFrom?: string;
    placementMonthTo?: string;
    buyerId?: string;
    styleId?: string;
    colorId?: string;
    pono?: string;
    itemType?: number;
}

export interface FactoryGatePassSamplePOStyleListDto {
    BuyerList: { buyerId: number; buyerName: string }[];
    PoList: { poId: number; poNo: string }[];
    StyleList: { styleId: number; styleNo: string }[];
    ColorList: { colorId: number; colorName: string }[];
    SizeList: { sizeId: number; sizeName: string }[];
}

export interface IGatePassMaster {
    // general info
    id: number;
    refNo: string;
    passDate: string;
    itemType: string;
    gatePassType: string;
    isApproved: string;
    isSample?: number;
    remarks?: string;
    garmentsType: string;
    // sender info
    senderEmpName?: string;
    senderPhoneNo?: string;

    // carried info
    carriedBy?: string;

    // receiver info
    supplierName?: string;
    supplierAddress?: string;
    supplierId?: number;
    receiverName?: string;
    receiverDesignation?: string;
    receiverDepartment?: string;
    receiverPhoneNo?: string;

    factoryId: number;
    username?: string;
    approveUserName?: string;
    approveDate?: string;
    editAction?: string;
    reportAction?: string;
    isChecked?: boolean
}

export interface IGatePassDetail {
    id: number;
    masterId: number;
    poId?: number;
    poNo?: string;
    colorId?: number;
    colorName?: string;
    sizeId?: number;
    sizeName?: string;
    buyerId?: number;
    buyerName?: string;
    styleId?: number;
    styleNo?: string;
    sampleType?: string;
    uomId?: number;
    uomName?: string;
    qty?: number;
    noOfPkt?: number;
    remarks?: string;
    materialId?: number;
    itemName?: string;
    itemId?: number;
    issueName?: string;
    shortName?: string;
    actions?: string;
}


export interface IGatePass {
    master: IGatePassMaster;
    details: IGatePassDetail[];
}


export interface IGatePassReturnReceive {
    // general info
    effectDate: string;        // DD/MM/YYYY
    effectDateText: string;    // DD-MON-YYYY
    date: string;
    itemType: string;
    gmtType: string;
    isApproved: string;        // Approved | Pending | Rejected
    // sender info
    senderName: string;
    senderPhone: string;
    // carried info
    carriedName: string;
    carriedDepartment: string;
    carriedBy: string;
    carriedDesignation: string;
    carriedPhone: string;
    // receiver info
    supplier: string;
    receiver: string;
    receiverAddress: string;

    id?: number;
    refNo: string;
    gatePassType: string;
    receiveContactPerson: string;
    garmentsType: string;
    organizationType: string;
    supplierName: string;
    supplierAddress: string;
    supplierId: number;
    receiverName: string;
    receiverDesignation: string;
    receiverDepartment: string;
    receiverPhoneNo: string;
    isSample: string;
    proposedBy: string;
    factoryId: number;
    createdCompany: string;
    passDate: string;
    masterId: number;
    poId: number;
    sampleType: string;
    issueName: string;
    buyerId: number;
    styleId: number;
    colorId: number;
    sizeId: number;
    qty: number;
    uomId: number;
    noOfPkt?: number;
    materialId: number;
    poNo: number;
    buyerName: string;
    styleNo: string;
    colorName: string;
    sizeName: string;
    itemName: string;
    shortName: string;
    username: string;
    approveUserName: string;
    approveDate: string;
    senderEmpName: string;
    senderPhoneNo: string;
    uomName: string;
    gatePassDtlId: string;
    allRcvQty: string;
    actions?: boolean;

    receiveDate: string;
    gateEntryNo: string;
    returnCarriedBy: string;
    receiveBy: string;

    /* Multiple item details for this gate pass */
    items?: IGatePassReturnReceiveItem[];
}
// Individual item details (one row per item)
export interface IGatePassReturnReceiveItem {
    id: number;
    itemType: string;
    gpQty: number;
    receiveQty: number;
    allReceive: string;
    uom: string;
    receiveRemarks: string;
    buyer: string;
    style: string;
    color: string;
    size: string;
    remarks: string;
    noOfPackets: number;
}

export interface IGatePassApproval {
    id: number;
    gatePassNo: number;
    proposedBy: string;
    companyName: string;
    gatePassType: string;
    orgSupplierName: string;
    type: string;
    createdDate: string;
    status: number;
    authorizedDate: string;
    actions?: boolean;
}


export interface IGatePassOut {
    id: number;
    gatePassNo: string;
    report?: boolean;
    passDate: string;
    status: number;
    actions?: boolean;
}


// Zod schema for gatePass

// export const gatePassMasterSchema = z.object({
//     supplierId: z.number().min(1, "Supplier is required"),
//     passDate: z.string(),
//     itemType: z.string().min(1, "Item Type is required"),
//     gatePassType: z.string().min(1, "GatePass Type is required"),
//     remarks: z.string().max(500).optional(),
// });
// export const gatePassDetailSchema = z.object({
//     itemName: z.string().min(1, "Item Name is required").max(100),
//     buyerId: z.number().min(1, "Buyer is required"),
//     materialId: z.number().min(1, "Material is required"),
//     qty: z.number().min(0, "Qty must be 0 or positive"),
//     uomId: z.number().min(1, "UOM is required"),
//     noOfPkt: z.string().min(1, "PKT is required").max(100),
//     remarks: z.string().max(200).optional(),
// });

export const gatePassMasterSchema = z.object({
//   supplierId: z.number().min(1, "Supplier is required"),
//   passDate: z.string().min(1, "Date is required"),
//   itemType: z.string().min(1, "Item Type is required"),
//   gatePassType: z.string().min(1, "Gate Pass Type is required"),
//   remarks: z.string().max(500).optional(),
});

export const gatePassDetailSchema = z.object({
  itemName: z.string().min(1, "Item Name is required").max(100),
  itemId: z.number().min(1, "Item is required"),
  buyerId: z.number().min(1, "Buyer is required"),
  buyerName: z.number().min(1, "Buyer is required"),
  qty: z.number().min(1, "Quantity must be greater than zero"),
  uomName: z.string().min(1, "UOM is required"),
  remarks: z.string().max(200).optional(),
});


// Validation error type
// --- Full GatePass Schema ---
export const gatePassSchema = z.object({
master: gatePassMasterSchema,
details: z.array(gatePassDetailSchema)
    .min(1, "At least one detail is required"),
});


// --- Validation Error Type ---
export type GatePassValidationErrors = Partial<
    Record<keyof IGatePassMaster |  keyof IGatePassDetail | "details", string>
>;

// --- Payload Types ---
export type CreateGatePassPayload = Omit<IGatePass, "id">;
export type UpdateGatePassPayload = Partial<CreateGatePassPayload>;


export interface IGatePassState {

    gatePass: IGatePass | null;
    gatePassList: IGatePassMaster[];
    gatePassTypes: IGatePass[];

    gatePassReturnReceive: IGatePassReturnReceive;
    gatePassReturnReceiveList: IGatePassReturnReceive[];

    gatePassReturnReceiveItem: IGatePassReturnReceiveItem;
    gatePassReturnReceiveItemList: IGatePassReturnReceiveItem[];

    gatePassApprovalDetails: IGatePassApproval;
    gatePassApprovalList: IGatePassApproval[];
    gatePassOutDetails: IGatePassOut;
    gatePassOutList: IGatePassOut[];
    filteredGatePass: IGatePass[];
    paginationObject?: any;
    loading: boolean;
    validationErrors: GatePassValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}