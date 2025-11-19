import { PaginationObject } from "../../../types/global";

export interface IStyle {
    id: number;
    buyerId: number;
    styleNo: string;
    styleName: string;
    itemType: string;
    smvSewing: number;
    smvCutting: number;
    smvFinishing: number;
    isActive: boolean;
    isPrint: boolean;
    isEmbroidery: boolean;
    isSmoke: boolean;
    isDying: boolean;
    isWashing: boolean;
    isKnitting: boolean;
    itemUom: string;
    isPrintEmb: boolean;
    printEmbAfterSew: boolean;
}

export interface IStyleState {
    style: IStyle;
    styles: IStyle[];
    filteredStyle: IStyle[];
    paginationObject: PaginationObject<IStyle>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string;
}
