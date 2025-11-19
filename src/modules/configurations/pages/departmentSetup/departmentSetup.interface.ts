import { PaginationObject } from "@/types/global";

export interface IDepartment {
    DepartmentId: number;
    DepartmentName: string;
    UnitId: number;
    ShortName: string | null;
    Remarks: string | null;
    ShowPriority: string | null;
    BangDeptName: string | null;
    IsActive: string;
    CreatedBy: string | null;
    CreatedDate: string | null;
    UpdatedBy: string | null;
    UpdatedDate: string | null;
    IsDefault: string;
}


export interface IDepartmentState {
    department: IDepartment;
    departments: IDepartment[];
    filteredDepartments: IDepartment[];
    paginationObject: PaginationObject<IDepartment>;
    loading: boolean;
    // validationErrors: BuyerValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}