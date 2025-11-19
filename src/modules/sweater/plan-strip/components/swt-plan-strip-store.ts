import {
  GetAllPlanStrips,
  Save,
  SwtPlanStripDtlsType,
  SwtPlanStripType,
} from "@/actions/Sweater/swt-plan-strip-action";
import { create } from "zustand";
import { StripSerachType } from "./swt-plan-strip-search-from";
import { AxiosInstance } from "axios";

type appStoreType = {
  //-------------------
  planStrips: SwtPlanStripType[];
  setPlanStripData: (formData: SwtPlanStripType[]) => void;
  getAllPlanStrips: (formData: StripSerachType, axios: AxiosInstance) => void;
  //-------------------
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  //-------------------
  openExtraPercDialog: boolean;
  setOpenExtraPercDialog: (openDialog: boolean) => void;
  //-------------------
  planStripsDialogData: SwtPlanStripDtlsType[];
  setPlanStripDialogData: (formData: SwtPlanStripDtlsType[]) => void;
  //-------------------
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  //-------------------
  isLstDetailsChanged: boolean;
  setIsLstDetailsChanged: (isLstDetailsChanged: boolean) => void;
  //-------------------
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
  //-------------------
  savePlanStrip: (formData: SwtPlanStripType[], axios: AxiosInstance) => void;
  //-------------------
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (userName: number) => void;
};

export const useSwtPlanStripStore = create<appStoreType>((set) => ({
  //-----------------------
  planStrips: [],
  setPlanStripData: (planStrips: SwtPlanStripType[]) => set({ planStrips }),
  getAllPlanStrips: async (formData: StripSerachType, axios: AxiosInstance) => {
    await GetAllPlanStrips(formData, axios).then((res) => {
      set({ planStrips: res });
    });
  },
  savePlanStrip: async (formData: SwtPlanStripType[], axios: AxiosInstance) => {
    Save(formData, axios);
  },
  //-----------------------
  planStripsDialogData: [],
  setPlanStripDialogData: (formData: SwtPlanStripDtlsType[]) => {
    set({ planStripsDialogData: [...formData] });
  },
  //-----------------------
  openDialog: false,
  setOpenDialog: (openDialog: boolean) => set({ openDialog }),
  //-----------------------
  openExtraPercDialog: false,
  setOpenExtraPercDialog: (openExtraPercDialog: boolean) =>
    set({ openExtraPercDialog }),
  //-----------------------
  selectedIndex: -1,
  setSelectedIndex: (selectedIndex: number) => set({ selectedIndex }),
  //-----------------------
  isLstDetailsChanged: false,
  setIsLstDetailsChanged: (isLstDetailsChanged: boolean) =>
    set({ isLstDetailsChanged }),
  //-----------------------
  isPending: false,
  setIsPending: (isPending) => set({ isPending }),
  //----------------
  bears: 0,
  increasePopulation: () =>
    set((state: appStoreType) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}));
