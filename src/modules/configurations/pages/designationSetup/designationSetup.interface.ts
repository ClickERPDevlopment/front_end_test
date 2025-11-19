import { PaginationObject } from "@/types/global";

export interface IDesignation {
    DesignationId: number;
    DesignationName: string;
    UnitId: number;
    Grade: string | null;
    Remarks: string | null;
    DesignationGroupId: number;
    PositionPriority: string | null;
    HolidayAllow: number;
    ApprAttdBonus: number;
    BangDesignationName: string;
    BangGrade: string | null;
}


export interface IDesignationState {
    designation: IDesignation;
    designations: IDesignation[];
    filteredDesignations: IDesignation[];
    paginationObject: PaginationObject<IDesignation>;
    loading: boolean;
    // validationErrors: BuyerValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}