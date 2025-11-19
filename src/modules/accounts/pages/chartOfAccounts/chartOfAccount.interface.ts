import { PaginationObject } from "../../../../types/global";

export interface IChartOfAccount {
    actions?: number;
    accNo: number;
    parentAccNo?: number;
    parentAccName?: number;
    accName?: string;
    natureNo?: number;
    descr?: string;
    active?: number;
    accCode: string;
    postFlg?: number;
    lvl?: number;
    orderSl?: number;
    costFlg?: number;
    ssOgNo?: number;
    defaultCurNo?: number;
    costSelType?: string;
    allocationActive?: number;
    buNo?: number;
    baFlg?: number;
    baSelType?: string;
    summaryReportLvl?: number;
    companyNo?: number;
    ssUploadedOn?: string;
    ssIsDeleted?: number;
    ssIsUploaded?: number;
    refCompanyNo?: number;
    oldAccCode?: string;
    daySummaryFlag?: number;
    accNameTree?: string;
    accPath?: string;
    tranFlag?: number;
    treeSummaryReportLvl?: number;
    treeLvl?: number;
    recurringFlag?: number;
    refAccNo?: number;
    ssCreator?: string;
    ssCreatedOn?: string; // Converted from DateTime? to string? for JSON compatibility
    ssModifier?: string;
    ssModifiedOn?: string; // Converted from DateTime? to string? for JSON compatibility
    ispo?: number;
    priority?: string;
    empCode?: string;
    isAdvance?: string;
    calculateTo?: number;
    suppressInBalanceSheet?: string;
    isContra?: string;
    isExpenseWeb?: string;
    billFlag?: string;
    exFlag?: string;
    cashBankLedgerFlag?: string;
    isBank?: string;
    isCash?: string;
    currencyId?: number;
    isChequeApplicable?: string;
    isMultiCurrency?: string;
    isAll?: string;
    isArchive?: string;
    activityType?: string;
}

export interface IChartOfAccountState {
    chartOfAccount: IChartOfAccount;
    chartOfAccounts: IChartOfAccount[];
    filteredDebitSideCoa: IChartOfAccount[];
    filteredCreditSideCoa: IChartOfAccount[];
    filteredChartOfAccount: IChartOfAccount[];
    paginationObject: PaginationObject<IChartOfAccount>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}