export type IMaterialOrderYarnDyeingReport = {
    WORK_ORDER_NO: string;
    COMPANY_ID: number;
    MAIN_COMPANY: string;
    MAIN_COMPANY_ADDRESS: string;
    COMPANY_NAME: string;
    COMPANY_ADDRESS: string;
    COMPANY_EMAIL: string;
    COMPANY_WEB: string;
    COMPANY_REMARKS: string;

    SUPPLIER_ID: number;
    SUPPLIER_NAME: string;
    SUPPLIER_ADDRESS: string;

    ISSUE_DATE: Date;
    IS_APPROVE: string;
    APPROVE_DATE: string | null;

    REMARKS: string;

    RECEIVE_STORE_ID: number;
    STORE_PERSONNEL: string;
    MOBILE_NO: string;
    RCV_STORE: string;

    DELIVERY_DATE: Date
    WO_SUBJECT: string;
    ATTENTION: string;
    SUPPLIER_MOBILE_NO: string;

    TOTAL_AMOUNT: number;

    BUYER_ID: number;
    PO_ID: number;
    BUYER_NAME: string;
    PO_NO: string;

    STYLE_ID: number;
    STYLENAME: string;

    MATERIAL_ID: number;
    MTL_NAME: string;

    GMT_COLOR_ID: number;
    GMT_SIZE_ID: number;
    MTL_COLOR_ID: number;

    UOM_ID: number;
    UOM: string;

    SUPPLIER_RATE_PER_PCS: number;
    TOTAL_SUP_AMOUNT: number;
    WORK_ORDER_QTY: number;
    ISSUE_QTY: number;

    GMT_COLOR_NAME: string;
    GMT_COLOR_CODE: string;
    MTL_COLOR_NAME: string;
    GMT_SIZE_NAME: string;
    DESCRIPTION: string;

    SORTINGNO: number;
    FACTORY_CODE: string;
    NOTE: string;

    APPROVED_BY: string;
    APPROVED_BY_DESG: string;

    PREPARED_BY: string;
    PREPARED_BY_DESG: string;
    PREPARED_BY_MOBILENO: string;
};
