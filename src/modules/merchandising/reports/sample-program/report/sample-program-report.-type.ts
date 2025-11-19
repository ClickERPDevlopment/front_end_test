export type SampleProgramReportDtoType = {
    masterInfo: SampleProgramReportDto_MasterType,
    lstDetails: SampleProgramReportDto_DetailsType[],
    lstSpecialTreatment: SampleProgramReportDto_SpecialTreatmentType[],
    lstCollarCuff: SampleProgramReportDto_CollarCuffType[],
    lstComments: SampleProgramReportDto_CommentsType[],
    lstYarnDyeingDetails: SampleProgramReportDto_YarnDyeingDetails[],
    lstYarnDetails: SampleProgramReportDto_YarnDetails[],
};

export type SampleProgramReportDto_MasterType = {
    COMPANY_ID: string,
    COMPANY_NAME: string,
    COMPANY_ADDRESS: string,
    SP_NO: string,
    SP_DATE: string,
    PRIORITY_REMARKS: string,
    APPROVAL: string,
    PROGRAM_NO: string,
    BUYER: string,
    SAMPLE_ORDER_NO: string,
    SHIP_TNA_DATE: string,
    SAMPLE_TYPE: string,
    DEALING_MERCHANT: string,
    CREATED_BY_USER: string,
    RELEASE_DATE: string,
    ATTENTION: string
}

export type SampleProgramReportDto_DetailsType = {
    SP_FAB_ID: string,
    STYLE: string,
    PARTS: string,
    FABRICATION: string,
    YARN_COUNT: string,
    FABRIC_COLOR: string,
    LAB_DIP_NO: string,
    SPECIAL_TREATMENT: string,
    GMT_SIZE: string,
    GMT_SIZE_SORTING: string,
    FINISH_DIA: string,
    GSM: string,
    REQ_FINISH_FAB: string,
    UOM: string,
    TOTAL_YARN: string
};

export type SampleProgramReportDto_SpecialTreatmentType = {
    FABRIC: string,
    TREATMENT: string,
    REQUIRED_QTY: string
};

export type SampleProgramReportDto_CollarCuffType = {
    COLORNAME: string,
    FABRIC: string,
    SIZENAME: string,
    SORTINGNO: 0,
    COLLAR_PCS: string,
    COLLAR_SIZE: string,
    CUFF_PCS: string,
    CUFF_SIZE: string,
    PLACKET_QTY: string
    PLACKET_SIZE: string;
};

export type SampleProgramReportDto_CommentsType = {
    ID: number,
    COMMENTS: string
};

export type SampleProgramReportDto_YarnDyeingDetails = {
    BODY_PARTS: string
    FABRIC_COLOR: string
    FABRIC_QTY_KG: number,
    YD_COLOR: string
    YARN_QTY_KG: number
};

export type SampleProgramReportDto_YarnDetails = {
    YARN: string
    REQUIRED_QTY: number
};