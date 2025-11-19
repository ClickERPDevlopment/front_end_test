import { VoucherScope, VoucherTransactionType,  } from "../../../../types/global";

export type VoucherMaster = {
  voucherId: number;
  voucherNo: string;
  voucherDate: string;
  bussinessUnitId: number;
  bussinessUnitName: string;
  projectId: number;
  projectName: string;
  costCenterId: number;
  costCenterName: string;
  maturityDate: string;
  narration: string;
  voucherTypeName: string;
  voucherTypeId: number;
  voucherScope: VoucherScope
};

export type VoucherDetails = {
  actions?: string;
  transactionType: VoucherTransactionType;
  ledgerId: number;
  ledgerName: string;
  balance: number;
  note: string;
  debit: number;
  credit: number;
  costCenterId: number;
  costCenterName: string;
  refNo: string;
  currencyId: number;
  currencyName: string;
  currencyRate: number;
  currencyAmount: number;
  chequeNo: string;
  chequeDate: string;
  bussinessUnitId: number;
  bussinessUnitName: string;
};
