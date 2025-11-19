export type FontSize = "12px" | "16px" | "24px";
export type Theme = "light" | "dark";
export type Direction = "ltr" | "rtl";
export type Layout = "vertical" | "horizontal";
export type MenuStyle = "default" | "colored" | "gradient" | "transparent";
export type HeaderStyle = "default" | "colored" | "gradient" | "transparent";
export type ThemeName = "default" | "green" | "purple" | "blue";
export type InputType = "text" | "number";

export interface TabItem {
    label: string;
    href?: string; // for URL hash
    content: React.ReactNode;
    count?: number;
}

export type ValidatorFn<T = any> = (val: T, formData: FormData) => string | null;

export type PaginationVariant = "simple" | "links" | "numbers" | "input" | "loadMore" | "infinite" | "google";
export const paginationVariants: PaginationVariant[] = ["simple", "google", "input", "numbers"]

export type PerPageOption = 5 | 10 | 20 | 50 | 100;
export const perPageOptions: PerPageOption[] = [5, 10, 20, 50, 100]

export type ScreenSize = "mobile" | "tablet" | "desktop";
export type ModalType = "Shift" | "Operation" | "Work Station" | "Production Hour";

export type ThemeType = "light" | "dark";

export const themeTypes: ThemeType[] = ["light", "dark"]

export type DateFormatTypeName =
    | "long"
    | "short"
    | "db_format"
    | "datetime_long"
    | "datetime_short"
    | "db_format_time"
    | "day_only"
    | "dd-MMM-yyyy";
;

export type DateFormatType =
    | "yyyy-MM-dd" // 2025-06-22
    | "MM/dd/yyyy" // 06/22/2025
    | "dd MMM yyyy" // 22 Jun 2025
    | "EEEE, MMMM do, yyyy" // Monday, June 22nd, 2025
    | "hh:mm aa" // 01:30 PM
    | "MM/yyyy"
    | "dd-MMM-yyyy";

export const dateFormatTypes: DateFormatType[] = ["EEEE, MMMM do, yyyy", "MM/dd/yyyy", "dd MMM yyyy", "yyyy-MM-dd"];

export interface PaginationObject<T> {
    currentPage: number | 1;
    totalItems: number;
    data: T[];
    firstPageUrl: string;
    from: number;
    totalPages: number;
    lastPage: number;
    lastPageUrl: string;
    links: { url: string | null; label: string; active: boolean }[];
    nextPageUrl: string | null;
    path: string;
    perPage: number | 10;
    previousPageUrl: string | null;
    to: number;
    total: number;
    search?: string | "";
}

export interface FetchParams {
    page?: number;
    perPage?: number;
    searchCriteria?: Record<string, any>;
    searchTerm?: string;
    orderBy?: string;
}

export type FormatNumberOptions = {
    decimalPlaces?: number; // Number of decimal places to include
    currency?: string; // Currency symbol, e.g., "$" or "₹"
    useCommaSeparator?: boolean; // Whether to use comma separation
};

export type DurationType = "Backward(+)" | "Forward(-)" | "";
export const durationTypes: DurationType[] = ["Backward(+)", "Forward(-)"];

export type TNAChartComponentKey =
    | "DelayCause"
    | "PlanningCapacity"
    | "TaskCompletionStatus"
    | "TnaHeatmap"
    | "TnaProgress"
    | "TnaStatus";

export const tnaChartComponentKeys: TNAChartComponentKey[] = [
    "DelayCause",
    "PlanningCapacity",
    "TaskCompletionStatus",
    "TnaHeatmap",
    "TnaProgress",
    "TnaStatus",
];

export type AccountChartComponentKey =
    | "DailyTransaction"
    | "LiabilitiesAssets"
    | "ReceivableVsPayable";

export const accountChartComponentKeys: AccountChartComponentKey[] = [
    "DailyTransaction",
    "LiabilitiesAssets",
    "ReceivableVsPayable",
];

export type ProductionChartComponentKey =
    | "DefectRate"
    | "Efficiency"
    | "TargetVsActual"
    | "WIP"
    | "LineWiseOutput";

export const productionChartComponentKeys: ProductionChartComponentKey[] = [
    "DefectRate",
    "Efficiency",
    "TargetVsActual",
    "WIP",
    "LineWiseOutput",
];

export interface DashboardItem {
    id: number;
    dashboard_config_id: number;
    component_name: string;
    x: number;
    y: number;
    w: number;
    h: number;
    config: string;
}

export interface DashboardConfig {
    id: number;
    user_id: number;
    name: string;
    is_default: boolean;
    items: DashboardItem[];
}

export interface DashboardConfigState {
    config: DashboardConfig;
    configList: DashboardConfig[];
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string;
}

export type VoucherTransactionType = "DR" | "CR";
export const voucherTransactionTypes: VoucherTransactionType[] = ["DR", "CR"];

export type VoucherScope = "Project" | "Costcenter" | "";
export const voucherScopes: VoucherScope[] = ["Project", "Costcenter"];

export const createInitialPaginationObject = <T>(): PaginationObject<T> => ({
    currentPage: 1,
    data: [],
    firstPageUrl: "",
    from: 1,
    lastPage: 1,
    totalPages: 0,
    lastPageUrl: "",
    links: [],
    nextPageUrl: null,
    path: "",
    perPage: 10,
    previousPageUrl: null,
    to: 1,
    total: 0,
    totalItems: 0,
});

//modal constants
export const MODAL_KEYS = {
    FLOOR_ADD: "floor/add",
    SECTION_ADD: "section/add",
    LINE_ADD: "line/add",
    UOM_ADD: "uom/add",
    IE_MACHINES_ADD: "iemachinesetup/add",
    MATERIALGROUP_ADD: "materialgroup/add",
} as const;

export type MODAL_TYPE_KEY = (typeof MODAL_KEYS)[keyof typeof MODAL_KEYS];

export type UOMMeasurementType =
    | "Length"
    | "Volume"
    | "Weight"
    | "Square"
    | "Common"
    | "Pieces";

export const UOMMeasurementTypeOptions: UOMMeasurementType[] = [
    "Length",
    "Volume",
    "Weight",
    "Square",
    "Common",
    "Pieces",

];


// material group category
export type MGCategoryType =
    | "Dyes"
    | "Chemical"
    | "Yarn"
    | "Fabrics"
    | "Trims"
    | "Accessories"
    | "Packaging"
    | "Grocery"
    | "Stationary"
    | "Machinery"
    | "SpareParts"
    | "Tools"
    | "Embellishments"
    | "WashChemical"
    | "PrintingMaterial"
    | "GeneralItem"
    | "SafetyEquipment"
    | "Electrical"
    | "Others";


export const MGCategoryTypeOptions: MGCategoryType[] = [
    "Dyes",
    "Chemical",
    "Yarn",
    "Fabrics",
    "Trims",
    "Accessories",
    "Packaging",
    "Grocery",
    "Stationary",
    "Machinery",
    "SpareParts",
    "Tools",
    "Embellishments",
    "WashChemical",
    "PrintingMaterial",
    "GeneralItem",
    "SafetyEquipment",
    "Electrical",
    "Others",

];


// material group company
export type MGCompanyType =
    | "CONSIST APPAREL LTD"
    | "A"
    | "B"
    | "C"
    | "D";


export const MGCompanyTypeOptions: MGCompanyType[] = [
    "CONSIST APPAREL LTD",
    "A",
    "B",
    "C",
    "D",
];


// material sub group category
export type MSGdropdownType =
    | "CIVIL"
    | "MECHANICAL"
    | "ELECTRICAL"
    | "INDUSTRIAL";


export const MSGdropdownTypeOptions: MSGdropdownType[] = [
    "CIVIL",
    "MECHANICAL",
    "ELECTRICAL",
    "INDUSTRIAL",
];


// material sub group company
export type MSGCompanyName =
    | "Frame Luxewear"
    | "A"
    | "B"
    | "C"
    | "D";


export const MSGCompanyNameOptions: MSGCompanyName[] = [
    "Frame Luxewear",
    "A",
    "B",
    "C",
    "D",
];



// ie materials setup
export type IEMachineType =
    | "A"
    | "B"
    | "C"
    | "D";


export const IEMachineTypeOptions: IEMachineType[] = [
    "A",
    "B",
    "C",
    "D",
];


// planning 
export type PlanningRoleType =
    | "A"
    | "B"
    | "C"
    | "D";


export const PlanningRoleOptions: PlanningRoleType[] = [
    "A",
    "B",
    "C",
    "D",
];


export interface IVisibility {
    isHiddenRow: false;
}