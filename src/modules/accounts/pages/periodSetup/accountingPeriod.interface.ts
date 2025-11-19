import { PaginationObject } from "../../../../types/global";

export interface AccountingPeriod {
  periodNo: number;
  startPeriodDate: string; // or `Date` if you parse it
  endPeriodDate: string;   // or `Date` if you parse it
  closeFlag: number;
  companyNo: number;
}

export interface AccountingPeriodState {
    accountingPeriod: AccountingPeriod;
    accountingPeriods: AccountingPeriod[];
    filteredAccountingPeriod: AccountingPeriod[];
    paginationObject: PaginationObject<AccountingPeriod>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}