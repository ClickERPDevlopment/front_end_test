export type GreyFabricIssueToDyeingChallanType = {
    MasterInfo: GreyFabricIssueToDyeingChallanType_Master,
    DetailsInfo: GreyFabricIssueToDyeingChallanType_Details[],
    Comments: GreyFabricIssueToDyeingChallanType_Comments[]
}

export type GreyFabricIssueToDyeingChallanType_Master = {
    PO_ID: string;
    JOB_ID: string;
    GROUP_COMPANY_NAME: string;
    GROUP_COMPANY_ADDRESS: string;
    COMPANY_NAME: string;
    COMPANY_ADDRESS: string;
    CHALLAN_NO: string;
    CHALLAN_DATE: string;
    BUYER: string;
    BUYER_CODE: string;
    BUYER_DISPLAY_NAME: string;
    ORDER_NO: string;
    STYLE: string;
    SEASON: string;
    JOB_NO: string;
    ISSUE_PURPOSE: string;
    PARTY: string;
    PARTY_ADDRESS: string;
    ISSUE_TYPE: string;
    TREATMENT: string;
    PREPARED_BY: string;
}

export type GreyFabricIssueToDyeingChallanType_Details = {
    DTLS_ID: string;
    YARN_LOT_NUMBER: string;
    YARN_BRAND: string;
    YARN: string;
    FABRIC: string;
    FABRIC_PART: string;
    GMT_COLOR: string;
    COLOR_CODE: string;
    MC_DIA: string;
    FINISH_DIA: string;
    GSM: string;
    STITCH_LENGTH: string;
    ROLL_QTY: string;
    GREY_WEIGHT: string;
    UOM: string;
    PCS: string;
    DETAILS_REMARKS: string;
    STORE_NAME: string;
}

export type GreyFabricIssueToDyeingChallanType_Comments = {
    PONO: string;
    BOOKING_QTY: string;
    ISSUED_QTY: string;
    BALANCE_QTY: string;
}