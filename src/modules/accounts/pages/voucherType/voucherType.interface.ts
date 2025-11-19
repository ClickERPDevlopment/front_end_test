import { PaginationObject } from "../../../../types/global";

export interface VoucherType {
  vtypeNo: number;
  typeName: string;
  alias: string;
  vType: string;
  descr: string | null;
  vDefault: number;
  companyNo: number;
  nature: number;
};

export interface VoucherTypeState {
    voucherType: VoucherType;
    voucherTypes: VoucherType[];
    filteredVoucherType: VoucherType[];
    paginationObject: PaginationObject<VoucherType>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}