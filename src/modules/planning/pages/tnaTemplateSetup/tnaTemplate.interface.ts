import { PaginationObject } from "../../../../types/global";
import { ITnaTask } from "../tnaTaskSetup/tnaTaskType.interface";

export interface ITnaTemplateMaster {
    id: number;
    name: string;
    code: string;
    buyerId: number | null;
    stylId: number | null;
    leadTime: number | null;
    createdBy: string;
    createdDate: string;
    updateBy: string | null;
    updatedDate: string | null;
    lead_time: number | null;
    companyId: number;
}

export interface ITnaTemplateTask
    extends Omit<ITnaTask, "id" | "taskCode" | "taskName"> {
    id: number;
    templateCode: string;
    templateName: string;
    taskCode: string;
    taskName: string;
    taskId: number;
    p_date_db_real: string | null;
    p_date_db_prev: Date | null;
    p_date_db_prev_string: string;
    p_date_db: string;
    presetDate: Date | null;
    changingDate: Date | null;
    changeBy: number;
    isDependentChangeBy: boolean;
}

export interface TnaTemplateState {
    isUpdateMode: boolean;
    templateName: string;
    isIndexDBStoreUpdated: boolean;
    tnaTemplate: ITnaTemplateMaster;
    tnaTemplates: ITnaTemplateMaster[];
    tnaTemplateTask: ITnaTemplateTask;
    tnaTemplateTasks: ITnaTemplateTask[];
    filteredTnaTemplate: ITnaTemplateMaster[];
    paginationObject: PaginationObject<ITnaTemplateMaster>;
    loading: boolean;
    error: string | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    message: string;
}
