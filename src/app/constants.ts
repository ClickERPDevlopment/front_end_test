export const API_BASE_URL = "https://api.example.com";
export const MAX_ITEMS_PER_PAGE = 20;
export const APP_NAME = "CLICK ERP";
export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PER_PAGE = 10;
// Colors
export const PRIMARY_COLOR = "#4caf50";
export const SECONDARY_COLOR = "#ff5722";
export const IDX_DB = "clickerp-offline-db"
//MasterSettings
export const IDX_MENU_STORE = "menuList"
export const IDX_MODULE_STORE = "moduleList"
export const IDX_COMPANY_STORE = "companyList"
//gmt-production
export const IDX_BUYER_STORE = "buyerList"
export const IDX_FLOOR_STORE = "floorList"
export const IDX_LINE_STORE = "lineList"
export const IDX_CUTTING_TABLE_STORE = "cuttingTableList"
export const IDX_STYLE_STORE = "styleList"
export const IDX_SIZE_STORE = "sizeList"
export const IDX_COLOR_STORE = "colorList"
export const IDX_GMT_PO_DATA_STORE = "gmtPoDataList"
export const IDX_PRODUCTION_DASHBOARD_STORE = "productionDashboard"
//store
export const IDX_UOM_STORE = "uomList"
//accounts
export const IDX_BUSINESS_UNIT_STORE = "businessUnitList"
export const IDX_CHART_OF_ACCOUNT_STORE = "chartOfAccountList"
export const IDX_COST_CENTER_STORE = "costCenterList"
export const IDX_CURRENCY_STORE = "currencyList"
export const IDX_ACCOUNTING_PERIOD_STORE = "accountingPeriodList"
export const IDX_PROJECT_STORE = "projectList"
export const IDX_VOUCHER_TYPE_STORE = "voucherTypeList"
export const IDX_ACCOUNT_DASHBOARD_STORE = "accountDashboard"
//planning
export const IDX_PLANNING_TEAM_STORE = "planningTeamList"
export const IDX_TNA_TASK_GROUP_STORE = "tnaTaskGroupList"
export const IDX_TNA_TASK_STORE = "tnaTaskList"
export const IDX_TNA_TEMPLATE_STORE = "tnaTemplateList"
export const IDX_TNA_DASHBOARD_STORE = "tnaDashboard"
export const IDX_TNA_PENDING_JOB_STORE = "tnaPendingJobList"
export const IDX_TNA_PENDING_CRITICAL_JOB_STORE = "tnaPendingCriticalJobList"
export const IDX_TNA_PENDING_REQUEST_STORE = "tnaPendingRequestList"
export const IDX_TNA_MISSING_ACTUAL_DATE_STORE = "tnaMissingActualDatetList"
//ie
export const IDX_IE_MACHINES_STORE = "iemachinesSetuplist"
export const IDX_OPERATIONTYPES_STORE = "operationtypeslist"
//quality
export const IDX_DEFECTREJECTYPE_STORE = "defectrejectstypelist"

export const IDX_STORE_LIST = [
    "menuList",
    "moduleList",
    "buyerList",
    "floorList",
    "lineList",
    "cuttingTableList",
    "styleList",
    "sizeList",
    "colorList",
    "companyList",
    "uomList",
    "gmtPoDataList",
    "businessUnitList",
    "chartOfAccountList",
    "costCenterList",
    "currencyList",
    "accountingPeriodList",
    "projectList",
    "voucherTypeList",
    "planningTeamList",
    "tnaTaskGroupList",
    "tnaTaskList",
    "tnaTemplateList",
    "tnaDashboard",
    "accountDashboard",
    "productionDashboard",
    "tnaPendingJobList",
    "tnaPendingRequestList",
    "tnaMissingActualDatetList",
    "tnaPendingCriticalJobList"
];



export type RouteLayout = "webapp" | "winapp" | "report" | "crystalReport";

const BASE_SEGMENTS: Record<RouteLayout, string> = {
    webapp: "/webapp",
    winapp: "/winapp",
    report: "/report",
    crystalReport: "/crystal-report",
};

const ENDPOINTS = {

    PRINT_PRODUCTION_LIST: "/printing/printing-production",
    PRINT_PRODUCTION_ENTRY: "/printing/printing-production/entry",

    // MasterSettings
    CURRENCY_LIST: "/MasterSettings/currencies",
    CURRENCY_SAVE: "/MasterSettings/currencies/entry",
    FLOOR_LIST: "/MasterSettings/floors",
    FLOOR_SAVE: "/MasterSettings/floors/save",
    SECTION_LIST: "/MasterSettings/sections",
    SECTION_SAVE: "/MasterSettings/sections/entry",
    LINE_LIST: "/MasterSettings/lines",
    LINE_SAVE: "/MasterSettings/lines/entry",

    USER_GROUP_LIST: "/MasterSettings/user-group",
    USER_GROUP_ENTRY: "/MasterSettings/user-group/entry",

    USER_WISE_MENU_PERMISSION_LIST: "/MasterSettings/user-wise-menu-permission",
    USER_WISE_MENU_PERMISSION_ENTRY: "/MasterSettings/user-wise-menu-permission/entry",
    USER_WISE_MENU_PERMISSION_DELETE_BY_USER_GROUP: "/MasterSettings/user-wise-menu-permission/entry?action=delete_by_user_group",

    // InventoryControl
    UOM_LIST: "/InventoryControl/uom",
    UOM_SAVE: "/InventoryControl/uom/entry",
    MATERIALGROUP_LIST: "/InventoryControl/material-group",
    MATERIALGROUP_SAVE: "/InventoryControl/material-group/entry",
    MATERIAL_DETAILS_SAVE: "/InventoryControl/material-group/save",
    MATERIAL_SUBGROUP_LIST: "/InventoryControl/material-sub-group",
    MATERIAL_SUBGROUP_SAVE: "/InventoryControl/material-sub-group/entry",
    STORE_LIST: "/InventoryControl/store-info/",
    STORE_SAVE: "/InventoryControl/store-info/save",
    GATE_PASS_LIST: "/InventoryControl/gatepass-list",
    GATE_PASS_SAVE: "/InventoryControl/gatepass-list/entry",

    GATE_PASS_RETURN_RECEIVE_LIST: "/InventoryControl/gatepass-return-receive-list",
    GATE_PASS_RETURN_RECEIVE_SAVE: "/InventoryControl/gatepass-return-receive-list",
    GATE_PASS_APPROVAL_FORM: "/InventoryControl/gatepass-approvals",

    // IndustrialEngineering
    IE_MACHINES_LIST: "/IndustrialEngineering/machines",
    IE_MACHINES_SAVE: "/IndustrialEngineering/machines/save",
    MACHINE_TO_STITCH_SAVE: "/IndustrialEngineering/machine-to-stich-map",
    OPERATION_TYPE_LIST: "/IndustrialEngineering/operation-type",
    OPERATION_TYPE_SAVE: "/IndustrialEngineering/operation-type/entry",
    OPERATION_LIST: "/IndustrialEngineering/operation-list",
    OPERATION_SAVE: "/IndustrialEngineering/operation-list/entry",

    // QualityControl
    DEFECT_REJECTS_LIST: "/QualityControl/defect-reject-type",
    DEFECT_REJECTS_SAVE: "/QualityControl/defect-reject-type/entry",


    PURCHASE_REQ_APPROVAL: "/Procurement/purchase-req-approval",
    PURCHASE_REQ_DETAILS: "/Procurement/purchase-req-details",
    PURCHASE_REQ_HISTORY: "/Procurement/purchase-req-history",

    // ProductionPlanning
    PLANNING_WORKING_TEAM_LIST: "/ProductionPlanning/planning-working-team",
    PLANNING_WORKING_TEAM_SAVE: "/ProductionPlanning/planning-working-team/entry",
    PLANNING_WORKING_CALENDAR: "/ProductionPlanning/planning-calendar",

    // pnProduction
    MANAGEMENT_REPORT: "/management-dashboard-report",
    SHIPMENT_SCHEDULE_REPORT: "/pnProduction/shipment-schedule-report",
    GMT_PRODUCTION_STATUS: "/pnProduction/gmt-production-status",

    // pnCommercial
    COUNTRY_SAVE: "/commercial/country-info",
    COUNTRY_LIST: "/commercial/countryList",

    // MarketingMerchandising
    BUYER_LIST: "/MarketingMerchandising/buyers",
    BUYER_SAVE: "/MarketingMerchandising/buyers/entry",

    COLOR_LIST: "/MarketingMerchandising/colors",
    COLOR_SAVE: "/MarketingMerchandising/colors/entry",

    SIZE_LIST: "/MarketingMerchandising/size/",
    SIZE_SAVE: "/MarketingMerchandising/size/entry",


    //sale 
    INVENTORY_LIST: "/InventoryControl/inventory-sale",
    INVENTORY_SALE_CREATE: "/InventoryControl/inventory-sale/entry",
    INVENTORY_SALE_CHALLAN_REPORT: "/inventory/inventory-sale/challan-report",
    INVENTORY_SALE_BILL_REPORT: "/inventory/inventory-sale/bill-report",

    //sale Approve
    INVENTORY_LIST_APPROVE: "/InventoryControl/inventory-sale-approval-list",
    INVENTORY_SALE_APPROVE: "/InventoryControl/inventory-sale-approval-list/approve",

    //PROCUREMENT PO RELEASE
    PROCUREMENT_UNRELEASED_LIST: "/Procurement/po-unreleased-list",
    PROCUREMENT_UNRELEASED_LIST_APPROVE: "/Procurement/po-unreleased-list/approve",

    //PROCUREMENT REPORTS
    PURCHASE_ORDER_REPORT: "/procurement/purchase-order-report/",
    PROCUREMENT_PURCHASE_REQUISITION_REPORT: "/procurement/purchase-requisition-report/",

    FACTORY_WISE_MENU_PERMISSION_SAVE: "/MasterSettings/factory-wise-menu-permission",

    PRINT_EMB_MATERIAL_RECEIVE_LIST: "/printing/print-emb-material-receive",
    PRINT_EMB_MATERIAL_RECEIVE_ENTRY: "/printing/print-emb-material-receive/entry",

    //garments production 
    CUTTING_EFFICIENCY_REPORT: "/production/gmt-cutting-efficiency-report",
    CUTTING_EFFICIENCY_DATE_RANGE_REPORT: "/production/gmt-cutting-efficiency-date-range-report",

    CUTTING_TARGET_REPORT: "/production/gmt-cutting-target-report",
    CUTTING_TARGET_DATE_RANGE_REPORT: "/production/gmt-cutting-target-daterange-report",
    SEWING_TARGET_REPORT: "/production/gmt-sewing-target-report",
    PRODUCTION_STATUS_REPORT: "/production/gmt-production-status-report",

    SEWING_INPUT_OUTPUT_REPORT: "/production/sewing/sewing-input-output-report",
    SEWING_PRODUCTION_STATUS_REPORT: "/production/sewing/sewing-production-status-report",
    MONTHLY_STYLE_WISE_PRODUCTION_SUMMARY_REPORT: "/production/sewing/monthly-style-wise-production-summary-report",
    SEWING_SUMMARY_REPORT: "/production/sewing/sewing-summary-report",

    //textile
    DYEING_FINISHING_CHEMICAL_USED_REPORT: "/textile/dyeing-finishing-chemical-used-report",

    //management
    MANAGEMENT_BUDGET_REPORT: "/merchandising/budget-approval"
} as const;

export const getRoutes = (layout: RouteLayout) => {
    const prefix = BASE_SEGMENTS[layout]; // safe now

    const routes: Record<keyof typeof ENDPOINTS, string> = {} as any;
    Object.keys(ENDPOINTS).forEach((key) => {
        routes[key as keyof typeof ENDPOINTS] = `${prefix}${ENDPOINTS[key as keyof typeof ENDPOINTS]}`;
    });

    return routes;
};