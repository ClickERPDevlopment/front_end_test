import { PaginationObject } from "../../../types/global";


export interface MenuItem {
    id: number;
    name: string;
    link: string;
    moduleId: number;
    isAccess: boolean;
    isDelete: boolean;
    isInsert: boolean;
    isUpdate: boolean;
    parentMenuId: number;
    parentMenuName: string;
    moduleName: string;
    icon?: React.ComponentType<{ size?: number }>;
    submenu?: MenuItem[];
}



export interface MenuState {
    menu: MenuItem;
    menus: MenuItem[];
    moduleMenus: Record<string, MenuItem[]>[];
    flatMeanus: MenuItem[];
    filteredMenus: MenuItem[];
    paginationObject: PaginationObject<MenuItem>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string;
}
