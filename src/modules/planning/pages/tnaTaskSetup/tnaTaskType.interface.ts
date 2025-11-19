import z from "zod";
import { DurationType, PaginationObject } from "../../../../types/global";

export interface ITnaTask {
    actions?: string;
    id: number;
    leadTime: number;
    taskType: string;
    taskCode: string;
    taskName: string;
    taskGroupName: string;
    teamName: string;
    dependOn: string;
    standardDuration: number;
    durationDifferent: number;
    durationType: DurationType;
    dependentTaskFrontId: number | null;
    dependentTaskFront?: string;
    dependentTaskBackId: number | null;
    dependentTaskBack?: string;
    sortBy: number;
    departmentId: number;
    emailAddress: string | null;
    remarks: string | null;
    isActive: string;
    isCritical: string;
    isManual: string;
    isAuto: string;
    taskAfterId: number | null;
    offsetTime: number;
    relatedTaskId: number | null;
    companyId: number;
    isEnd: string | null;
    isStart: string | null;
    fakeId: number;
    teamId: number;
    isSwStart: string;
    isSwEnd: string;
    isDyeingStart: string;
    isDyeingEnd: string;
    isKnittingStart: string;
    isKnittingEnd: string;
    taskGroupId: number;
    isYarnStart: string;
    isYarnEnd: string;
}

export const durationTypes = ["Backward(+)", "Forward(-)"] as const;
// Zod schema for validation
export const tnaTaskSchema = z.object({
    // taskName: z.string().min(1, "Task Name is required").max(100, "Task Name too long"),
    // leadTime: z.number().min(0),
    // durationDifferent: z.number(),
    // durationType: z.enum(durationTypes), // match DurationType
    // departmentId: z.number(),
    // teamId: z.number(),
    // taskGroupId: z.number(),

    // ITnaTask
    id: z.number().min(1, "Task Id is required").max(100, "Task Id too long"),
    leadTime: z.number().min(0),
    taskType: z.string().min(1, "Task Type is required").max(100, "Task Type too long"),
    taskCode: z.string().min(1, "Task Code is required").max(100, "Task Code too long"),
    taskName: z.string().min(1, "Task Name is required").max(100, "Task Name too long"),
    taskGroupName: z.string().min(1, "Task Group Name is required").max(100, "Task Group Name too long"),
    teamName: z.string().min(1, "Task Team Name is required").max(100, "Task Team Name too long"),
    dependOn: z.string().min(1, "Depend On is required").max(100, "Depend On too long"),
    standardDuration: z.number(),
    durationDifferent: z.number(),
    durationType: z.enum(durationTypes), // match DurationType
    dependentTaskFront: z.string().min(1, "Dependent Task Front is required").max(100, "Dependent Task Front too long"),
    dependentTaskBack: z.string().min(1, "Dependent Task Back is required").max(100, "Dependent Task Back too long"),
    sortBy: z.number(),
    departmentId: z.number(),
    //emailAddress: string | null;
    //remarks: string | null;
    isActive: z.string(),
    isCritical: z.string(),
    isManual: z.string(),
    isAuto: z.string(),
    //taskAfterId: number | null;
    offsetTime: z.number(),
    //relatedTaskId: number | null;
    companyId: z.number(),
    //isEnd: string | null;
    //isStart: string | null;
    fakeId: z.number(),
    teamId: z.number(),
    isSwStart: z.string(),
    isSwEnd: z.string(),
    isDyeingStart: z.string(),
    isDyeingEnd: z.string(),
    isKnittingStart: z.string(),
    isKnittingEnd: z.string(),
    taskGroupId: z.number(),
    isYarnStart: z.string(),
    isYarnEnd: z.string(),
});

// Validation error type
export type TnaTaskValidationErrors = Partial<Record<keyof ITnaTask, string>>;
export type CreateTnaTaskPayload = Omit<ITnaTask, "id">;
export type UpdateTnaTaskPayload = Partial<CreateTnaTaskPayload>;

// State interface
export interface ITnaTaskTypeState {
    tnaTask: ITnaTask;
    isIndexDBStoreUpdated: boolean;
    isUpdateMode: boolean;
    tnaTasks: ITnaTask[];
    paginationObject: PaginationObject<ITnaTask>;
    loading: boolean;
    validationErrors: TnaTaskValidationErrors | null;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string | null;
}
