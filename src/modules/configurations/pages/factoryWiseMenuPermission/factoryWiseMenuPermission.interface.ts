import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IFactoryWiseMenuPermission {
    id: number;
    companyId: number;
    companyName: string;
    companyUnitType: string;

    moduleId: number;
    moduleName: string;

    noOfModule: number;
    noOfMenu: number;

    parentMenuId: number;
    parentMenuName: string;

    menuId: number;
    menuName: string;

    createdBy: string;
    updatedBy: string;
    isFactoryChecked?: boolean;
    isModuleChecked?: boolean;
    actions?: string;
}


// Zod schema
export const factoryWiseMenuPermissionSchema = z.object({

});


// Validation error type
export type FactoryWiseMenuPermissionValidationErrors = Partial<Record<keyof IFactoryWiseMenuPermission, string>>;
export type CreateFactoryWiseMenuPermissionPayload = Omit<IFactoryWiseMenuPermission, 'id'>;
export type UpdateFactoryWiseMenuPermissionPayload = Partial<CreateFactoryWiseMenuPermissionPayload>;



export interface IFactoryWiseMenuPermissionState {
    factoryWiseMenuPermission: IFactoryWiseMenuPermission;
    factoryWiseMenuPermissions: IFactoryWiseMenuPermission[];
    moduleMenusFromFlat: IFactoryWiseMenuPermission[];
    paginationObject: PaginationObject<IFactoryWiseMenuPermission>;
    loading: boolean;
    validationErrors: FactoryWiseMenuPermissionValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}