import { PaginationObject } from "../../../types/global";

export interface ISize {
    id: number;
    buyerId: number;
    buyerName: string;
    sizeName: string;
    sortingNo: number;
    displayName: string;
}

export interface ISizeState {
    size: ISize;
    sizes: ISize[];
    filteredSize: ISize[];
    paginationObject: PaginationObject<ISize>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string;
}
