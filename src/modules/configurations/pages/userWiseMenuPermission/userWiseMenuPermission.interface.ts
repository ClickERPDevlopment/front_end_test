import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IUserWiseMenuPermissionList {
    Id: number;
    UserId: number;
    EmpCode: string;
    UserName: string;
    Designation: string;
    NoOfModules: number;
    NoOfMenus: number;
    CreateBy: string;
    CreateDate: string;
    UpdateBy: string;
    UpdateDate: string;
    actions?: any;
}

export interface IUserWiseMenuPermissionUsersList {
    Id: number;
    UserId: number;
    UserName: string;
    Designation: string;
    CompanyName: string;
    IsChecked: boolean
    actions?: any;
}

export interface IUserWiseMenuPermissionMenusList {
    Id: number;
    MenuId: number;
    ModuleId: number;
    ModuleName: string;
    MainMenu: string;
    MenuName: string;
    IsAccess: boolean;
    IsInsert: boolean;
    IsUpdate: boolean;
    IsDelete: boolean;
    actions?: any;
}

export interface IUserWiseMenuPermission {
    Id: number;
    UserId: number;
    MenuId: number;
    ModuleId: number;
    ModuleName: string;
    MainMenu: string;
    MenuName: string;
    IsAccess: boolean;
    IsInsert: boolean;
    IsUpdate: boolean;
    IsDelete: boolean;
}

export interface IUserWiseMenuPermissionModuleItems {
    Id: number;
    Modulename: string;
    Modulepropertiesname: string;
    Imagename: string;
    Onclickfunction: string;
    Createby: string;
    Createdate: string;
    Updateby: string | null;
    Updatedate: string | null;
}

export interface IUserWiseMenuPermissionMenuItems {
    ID: number;
    MENUNAME: string;
    MODUELID: number;
    MODULE_NAME: string | null;
    CONTROLNAME: string | null;
    MODULENAME: string;
    MAIN_MENU_ID: number;
    MAINMENU: string | null;
    CREATEBY: string | null;
    CREATEDATE: string | null;
    UNDER_MODIFICATION: string | null;
    MODIFICATION_MSG: string | null;
    Title: string;
    Path: string;
}

export interface ICreateUserWiseMenuPermissionPayload {
    users: IUserWiseMenuPermissionUsersList[];
    menus: IUserWiseMenuPermissionMenusList[];
}


export interface IUserWiseMenuPermissionState {
    list: IUserWiseMenuPermissionList[];
    usersLIst: IUserWiseMenuPermissionUsersList[];
    menusList: IUserWiseMenuPermissionMenusList[];
    menuPermission: IUserWiseMenuPermission[];
    moduleItems: IUserWiseMenuPermissionModuleItems[];
    menuItems: IUserWiseMenuPermissionMenuItems[];
    paginationObject: PaginationObject<IUserWiseMenuPermissionList>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}