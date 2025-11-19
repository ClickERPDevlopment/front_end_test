// types.ts
export interface KeyMapItem {
    label: string;
    key: string;
}

export interface MonthData {
    [key: string]: string | number;
}

export interface ManagementDashboard {
    [month: string]: MonthData;
}

export interface DashboardData {
    keyMap: KeyMapItem[];
    managementDashboard: ManagementDashboard;
}
