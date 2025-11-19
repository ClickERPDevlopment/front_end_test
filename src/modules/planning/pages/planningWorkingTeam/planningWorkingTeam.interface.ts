import z from "zod";
import { PaginationObject } from "../../../../types/global";

export interface IPlanningWorkingTeam {
    id: number;
    userCode: string;
    teamName: string;
    name: string;
    designation: string;
    department: string;
    email: string;
    role: string;
    status: string;
    del: string;
    actions?: string;
    isActive: boolean;
}

// Zod schema
export const planningWorkingTeamSchema = z.object({

    // IPlanningWorkingTeam
    id: z.number().min(0, "Id must be 0 or positive"),
    userCode: z.string().min(1, "User Code is required").max(100, "User Code too long"),
    teamName: z.string().min(1, "Team Name is required").max(100, "Team Name too long"),
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    designation: z.string().min(1, "Designation is required").max(100, "Designation too long"),
    department: z.string().min(1, "Department is required").max(100, "Department too long"),
    email: z.string().min(1, "Email is required").max(100, "Email too long"),
    role: z.string().min(1, "Role is required").max(100, "Role too long"),
    status: z.string().min(1, "Status is required").max(100, "Status too long"),
    del: z.string().min(1, "Del is required").max(100, "Del too long"),
    isActive: z.boolean(),
});

export type PlanningWorkingTeamValidationErrors = Partial<Record<keyof IPlanningWorkingTeam, string>>;
export type CreatePlanningWorkingTeamPayload = Omit<IPlanningWorkingTeam, 'id'>;
export type UpdatePlanningWorkingTeamPayload = Partial<CreatePlanningWorkingTeamPayload>;

export interface IPlanningWorkingTeamState {
    planningWorkingTeam: IPlanningWorkingTeam;
    planningWorkingTeamList: IPlanningWorkingTeam[];
    filteredPlanningWorkingTeam: IPlanningWorkingTeam[];
    paginationObject: PaginationObject<IPlanningWorkingTeam>;
    loading: boolean;
    validationErrors: PlanningWorkingTeamValidationErrors | null;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string | null;
}

