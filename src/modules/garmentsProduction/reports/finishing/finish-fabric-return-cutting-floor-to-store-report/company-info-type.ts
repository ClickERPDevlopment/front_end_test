export interface ICompany {
  ID: number;
  NAME: string;
  PREFIX: string;
  ADDRESS: string;
  CONTACT: string | null;
  EMAIL: string | null;
  WEB: string | null;
  REMARKS: string | null;
  ISSUBCONTACT: "0" | "1";
  SUBCONTACTPERSONNAME: string | null;
  ISGERMENTSUNIT: "0" | "1";
  ISDYEINGUNIT: "0" | "1";
  ISKNITTINGUNIT: "0" | "1";
  VATNO: string | null;
  REXNO: string | null;
  EPBREGNO: string | null;
  BKMEAMEMBERSHIPNO: string | null;
  FACTORYCODE: string | null;
  TINNO: string | null;
  CAPACITY: string | null;
  MAINCOMPANY_ID: number;
  CREATEBY: string;
  CREATEDATE: string; // ISO Date string
  UPDATEBY: string | null;
  UPDATEDATE: string | null;
  SL: number;
  COMPANY_ID: number;
  SALARY_ACCOUNT_ID: number;
  SALARY_ACCOUNT_MOBILE_ID: number;
}
