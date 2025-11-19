import { PaginationObject } from "../../../../types/global";

export interface Project {
  id: number;
  projectName: string;
  fixedAssetId: number;
  wipLedger: number;
  isClose: string; // or boolean if you convert "0"/"1"
  convertedAssetId: number | null;
  inventoryIssueLedgerId: number | null;
}

export interface ProjectState {
    project: Project;
    projects: Project[];
    filteredProjects: Project[];
    paginationObject: PaginationObject<Project>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}