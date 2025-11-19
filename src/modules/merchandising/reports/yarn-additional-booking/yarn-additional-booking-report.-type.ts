export type YarnAdditionalBookingReportDtoType = {
    ID: number;
    COMPANY_ID: number;
    COMPANY_NAME: string;
    BOOKING_NO: string;
    BOOKING_SERIAL: number;
    CUSTOM_BOOKING_NO: string;
    BOOKING_DATE: Date;
    BUYER_ID: number;
    BUYER: string;
    PO_ID: number;
    PO: string;
    JOB_POS: string;
    STYLE_ID: number;
    STYLE: string;
    ATTENTION_TO_EMP_ID: number;
    ATTENTION_TO_EMP: string;
    ATTENTION_TO_DESIGNATION: string;
    RESPONSIBLE_DEPT_ID: number;
    RESPONSIBLE_DEPT: string;
    REMARKS: string;
    ISSUE_TYPE_ID: number;
    ISSUE_TYPE: string;
    DEALING_MERCHANT: string;
    CREATED_BY_NAME: string;
    CREATED_BY: string;
    UPDATED_BY: string;
    CREATED_DATE: Date;
    UPDATED_DATE: Date;

    oYBookingDetailsFabricList: YarnAdditionalBookingReport_FabricDetailsType[],
    oYBookingDetailsCollarCuffList: YarnAdditionalBookingReport_CollarCuffType[],
    oYBookingDetailsYarnList: YarnAdditionalBookingReport_YarnDyeingDetails[]

    //-----------------------------------------------------------------------------------
    lstComments: YarnAdditionalBookingReport_CommentsType[],
    lstSpecialTreatment: YarnAdditionalBookingReport_SpecialTreatmentType[],
};

export type YarnAdditionalBookingReport_FabricDetailsType = {
    ID: number;
    MASTER_ID: number;
    FABRIC_ADD_GUID_ID: string;
    FABRIC_COLOR_ID: number;
    FABRIC_COLOR: string;
    FABRIC_ID: number;
    FABRIC: string;
    FABRIC_PRICE: number;
    GMT_PARTS_ID: number;
    GMT_SIZE_ID: number;
    GMT_SIZE: string;
    GMT_PARTS: string;
    FABRIC_REQUIRED_QTY: number;
    FINISH_DIA: string;
    FINISH_GSM: string;
    TOTAL_PRICE: number;
    DELIVERY_DATE: Date;
};

export type YarnAdditionalBookingReport_YarnDyeingDetails = {
    ID: number;
    FABRIC_ADD_GUID_ID: string;
    YARN_ID: number;
    YARN: string;
    YARN_REQUIRED_QTY: number;
    YARN_COLOR_ID: number;
    YARN_COLOR: string;
    YARN_RATIO: number;
};

export type YarnAdditionalBookingReport_CollarCuffType = {
    ID: number;
    FABRIC_ADD_GUID_ID: string;
    SIZE_ID: number;
    SIZE_NAME: string;
    COLLAR_PCS: number;
    COLLAR_SIZE: string;
    CUFF_PCS: number;
    CUFF_SIZE: string;
    PLACKET_QTY: number;
    PLACKET_SIZE: string;
    FABRIC_COLOR: string;
};

//-----------------------------------------------------------------------------------
export type YarnAdditionalBookingReport_SpecialTreatmentType = {
    FABRIC: string,
    TREATMENT: string,
    REQUIRED_QTY: string
};


export type YarnAdditionalBookingReport_CommentsType = {
    ID: number,
    COMMENTS: string
};

