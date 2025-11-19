import { PaginationObject } from "../../../types/global";

export interface ModuleItem {
    id: number;
    name: string;
    link: string;
    image: string;
}

export interface ModuleState {
    module: ModuleItem;
    modules: ModuleItem[];
    filteredModule: ModuleItem[];
    paginationObject: PaginationObject<ModuleItem>;
    loading: boolean;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}