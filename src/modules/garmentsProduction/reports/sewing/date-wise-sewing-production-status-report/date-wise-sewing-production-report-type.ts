export type DateWiseSewingProductionReportDto = {
    COUNT: number;
    FACTORYID: number;
    SEWINGDATE: string;
    TARGET: number;
    WORKING_HOUR: number;
    SEWING_OUTPUT: number;
    TOTAL_CM: number;
    TOTAL_FOB: number;
    COMPANY_NAME?: string | null;
    COMPANY_ADDRESS?: string | null;
    COMPANY_PREFIX?: string | null;
};
