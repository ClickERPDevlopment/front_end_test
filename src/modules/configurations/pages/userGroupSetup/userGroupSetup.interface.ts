import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IUserGroupSetupMaster {
    Id: number;
    GroupName?: string;
    CreateBy?: string;
    CreateDate?: string;
    UpdateBy?: string;
    UpdateDate?: string;
    Details?: IUserGroupSetupDetail[];
    actions?: string;
}

export interface IUserGroupSetupDetail {
    Id: number;
    MasterId: number;
    UserId: number;
    UserName?: string;
    Designation?: string;
    EmpCode?: string;
    DepartmentName?: string;
    actions?: string
}


export interface IUserGroupSetupState {
    masterInfo: IUserGroupSetupMaster;
    detailsInfo: IUserGroupSetupDetail;
    userGroupList: IUserGroupSetupMaster[];
    userList: IUserGroupSetupDetail[];
    paginationObject: PaginationObject<IUserGroupSetupMaster>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}