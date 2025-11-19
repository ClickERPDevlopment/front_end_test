import { PaginationObject } from "@/types/global";

export interface IStyle {
    Id: number;
    Producttypeid: number;
    Buyerid: number;
    Styleno: string;
    Prestyleno?: string;
    Stylename: string;
    Itemtype?: string;
    Productdepartmentid?: number;
    Smvsewing?: number;
    Smvsewingsideseam?: number;
    Cmsewing?: number;
    Currencyid?: number;
    Smvcutting?: number;
    Smvcuttingsideseam?: number;
    Smvfinishing?: number;
    Image?: Uint8Array;
    Remarks?: string;
    Isactive?: string;
    Isprint?: string;
    Isembroidery?: string;
    Issmoke?: string;
    Isdying?: string;
    Iswashing?: string;
    Isknitting?: string;
    Createby?: string;
    Createdate?: string;
    Updateby?: string;
    Updatedate?: string;
    Fabricsname?: string;
    Itemuom?: string;
    Productfamily?: string;
    IsPrintEmb?: string;
    ShortName?: string;
    FabricGsm?: string;
    FabricDia?: string;
    PrintEmbAfterSew?: string;
}

export interface IStyleState {
    style: IStyle;
    styles: IStyle[];
    filteredBuyers: IStyle[];
    paginationObject: PaginationObject<IStyle>;
    loading: boolean;
    // validationErrors: BuyerValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}