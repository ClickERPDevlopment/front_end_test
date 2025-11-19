import { PaginationObject } from "../../../../types/global";

export interface PlanWorkingTeam {
    id: number;
    teamName: string;
}

export interface PlanWorkingTeamState {
    planWorkingTeam: PlanWorkingTeam;
    planWorkingTeams: PlanWorkingTeam[];
    filteredPlanWorkingTeam: PlanWorkingTeam[];
    paginationObject: PaginationObject<PlanWorkingTeam>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}