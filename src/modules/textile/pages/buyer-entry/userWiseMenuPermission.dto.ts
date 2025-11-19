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