import { create } from "zustand";
export type storeType = {
    data: string;
    setData: (formData: string) => void;

    isTrInDialogOpen: boolean;
    setIsTrInDialogOpen: (isTrInDialogOpen: boolean) => void;

    isTrOutDialogOpen: boolean;
    setIsTrOutDialogOpen: (isTrOutDialogOpen: boolean) => void;
};

export const useBudgetWiseCostBreakdownStore = create<storeType>((set) => ({
    data: '---',
    setData: (data: string) => set({ data }),

    isTrInDialogOpen: false,
    setIsTrInDialogOpen: (isTrInDialogOpen: boolean) => set({ isTrInDialogOpen }),

    isTrOutDialogOpen: false,
    setIsTrOutDialogOpen: (isTrOutDialogOpen: boolean) =>
        set({ isTrOutDialogOpen }),
}));