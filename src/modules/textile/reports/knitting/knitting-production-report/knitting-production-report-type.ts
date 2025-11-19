export type KnittingProductionReportType = {
    PRODUCTION_DATE: string;
    INTER_COMPANY?: string | null;
    IN_HOUSE_PROD: number;
    OUTSIDE_PROD: number;
    COMPANY_NAME?: string | null;
    COMPANY_ADDRESS?: string | null;
    FLOOR_NAME?: string | null;
};
