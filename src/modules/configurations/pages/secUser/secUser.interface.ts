import { PaginationObject } from "@/types/global";

export interface ISecUser {
    ID: number;
    NAME: string;
    USERNAME: string;
    DESIGNATION: string;
    EMP_CODE: string;
    MOBILENO: string;
}



export interface ISecUserState {
    user: ISecUser;
    users: ISecUser[];
    filteredUsers: ISecUser[];
    paginationObject: PaginationObject<ISecUser>;
    loading: boolean;
    // validationErrors: BuyerValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}