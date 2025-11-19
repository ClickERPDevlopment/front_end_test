import { PaginationObject } from "../../../types/global";

export interface IGmtPurchaseOrder {
    id: number;
    factoryId: number;
    poNo: string;
    orderType: string;
    buyerId: number;
    styleId: number;
    styleNo: string;
    colorId: number;
    colorName: string;
    sizeId: number;
    sizeName: string;
    orderPlacementMonth: string; // ISO date string
    proposedDeliveryDate: string; // ISO date string
    deliveryDate: string; // ISO date string
    actualETD: string; // ISO date string
    isSideSeam: boolean;
    qty: number;
    shipQty: number;
    revisedNo: string;
    additionalBookingId: number;
    sampleProgramId: number;
    isMultiPoCombine: boolean; // "0" or "1", consider changing to boolean if needed
}

export interface IOrderColor {
    colorId: number;
    colorName: string;
}

export interface IOrderSize {
    sizeId: number;
    sizeName: string;
}

export interface IGmtPurchaseOrderState {
    order: IGmtPurchaseOrder;
    orders: IGmtPurchaseOrder[];
    placementMonths: string[];
    deliveryDates: string[];
    orderColors: IOrderColor[];
    orderSizes: IOrderSize[];
    filteredOrder: IGmtPurchaseOrder[];
    paginationObject: PaginationObject<IGmtPurchaseOrder>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string;
}
