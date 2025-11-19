import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IPlanningBoard {
    id: number;
    name: string;
}

export interface ICalendarDay {
    date: string,
    workingHour: number;
    efficiency: number;
    manpower: number;
}

export interface IPlanningCalendar {

    // selectedBoard: any;
    id: number;
    factory: string;
    section: string;
    board?: IPlanningBoard[];
    fromDate: string;
    toDate: string;
    boardId: number;
    actions?: string;

    // for calendar table component
    year: number;
    month: number;
    sunday: number;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;

    weekData: ICalendarDay[];
    isSelected: boolean;
}

// Zod schema
export const planningCalendarSchema = z.object({

    // selectedBoard: any;
    id: z.number().min(1, "Id is required").max(100, "Id too long"),
    factory: z.string().min(1, "Factory is required").max(100, "Factory too long"),
    section: z.string().min(1, "Section is required").max(100, "Factory too long"),
    // board: 
    fromDate: z.string(),
    toDate: z.string(),
    boardId: z.number(),

    // for calendar table component
    year: z.number(),
    month: z.number(),
    sunday: z.number(),
    monday: z.number(),
    tuesday: z.number(),
    wednesday: z.number(),
    thursday: z.number(),
    friday: z.number(),
    saturday: z.number()
});

export type PlanningCalendarValidationErrors = Partial<Record<keyof IPlanningCalendar, string>>;
export type CreatePlanningCalendarPayload = Omit<IPlanningCalendar, 'id'>;
export type UpdatePlanningCalendarPayload = Partial<CreatePlanningCalendarPayload>;

export interface IPlanningCalendarState {
    planningCalendar: IPlanningCalendar;
    boards: IPlanningBoard[];
    planningCalendarList: IPlanningCalendar[];
    selectedIndex: number;
    filteredPlanningCalendar: IPlanningCalendar[];
    paginationObject: PaginationObject<IPlanningCalendar>;
    loading: boolean;
    validationErrors: PlanningCalendarValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}

