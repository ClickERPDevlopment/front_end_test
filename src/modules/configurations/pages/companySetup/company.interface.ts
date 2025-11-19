import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface ICompany {
    id: number;
    companyId: number;
    name: string;
    companyTypeName?: string;
    companyTypeId?: number;
    isFactoryChecked?: boolean;
    actions?: any;
    isDefault?: boolean;
    submenu?: { title: string; link: string }[];
}

export interface ICompanyPermittedMenus {
    companyId: number;
    moduleId: number;
    mainMenuId: number;
    menuId: number;
    isActive: boolean;
}

export interface IFactoryType {
    companyTypeId: number;
    companyTypeName: string;
}

export interface IImportedCompanies {
    companyId: number;
    companyName: string;
    moduleId: number;
    mainMenuId: number;
    menuId: number;
    isActive: boolean;
}

export interface IPermittedCompanies {
    companyId: number;
    companyName: string;
    moduleId: number;
    mainMenuId: number;
    menuId: number;
    isActive: boolean;
}

// Zod schema
export const companySchema = z.object({
    id: z.number(),
    companyId: z.number(),
    name: z.string(),
});

// Validation error type
export type CompanyValidationErrors = Partial<Record<keyof ICompany, string>>;
export type CreateCompanyPayload = Omit<ICompany, 'companyId'>;
export type UpdateCompanyPayload = Partial<CreateCompanyPayload>;



export interface ICompanyState {
    company: ICompany;
    companyTypes: IFactoryType[];
    dummyCompanies: ICompany[];
    companies: ICompany[];
    importedCompanies: IImportedCompanies[];
    uniqueImportedCompanies: IImportedCompanies[];
    permittedCompanies: IPermittedCompanies[];
    companyPermittedMenus: ICompanyPermittedMenus[];
    filteredCompanies: ICompany[];
    paginationObject: PaginationObject<ICompany>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string;
}
