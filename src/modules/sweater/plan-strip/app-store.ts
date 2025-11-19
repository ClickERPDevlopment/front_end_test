/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type appStoreType = {
  openConfirmationDialog: boolean;
  confirmationDialogCallBackFunc: ((...args: any[]) => void) | null;
  setOpenConfirmationDialog: (callback: (...args: any[]) => void) => void;
  resetConfirmationDialogCallBackFunc: () => void;
  //-------------------------------------------------------------
  openErrorDialog: boolean;
  setOpenErrorDialog: (openDialog: boolean) => void;
};

export const useAppStore = create<appStoreType>((set) => ({
  openConfirmationDialog: false,
  confirmationDialogCallBackFunc: null,
  setOpenConfirmationDialog: (callback) =>
    set({
      confirmationDialogCallBackFunc: callback,
      openConfirmationDialog: true,
    }),
  resetConfirmationDialogCallBackFunc: () =>
    set({
      confirmationDialogCallBackFunc: null,
      openConfirmationDialog: false,
    }),
  //-------------------------------------------------------------
  openErrorDialog: false,
  setOpenErrorDialog: (openDialog: boolean) =>
    set({ openConfirmationDialog: openDialog }),
}));


interface PrintEmbProductionState {
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export const usePrintEmbProductionStore = create<PrintEmbProductionState>((set) => ({
  pageIndex: 0,
  pageSize: 10,
  setPageIndex: (index) => set({ pageIndex: index }),
  setPageSize: (size) => set({ pageSize: size }),
}));


interface PrintEmbMaterialReceiveState {
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export const usePrintEmbMaterialReceiveStore = create<PrintEmbMaterialReceiveState>((set) => ({
  pageIndex: 0,
  pageSize: 10,
  setPageIndex: (index) => set({ pageIndex: index }),
  setPageSize: (size) => set({ pageSize: size }),
}));


interface PrintEmbDeliveryState {
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
}

export const usePrintEmbDeliveryStore = create<PrintEmbDeliveryState>((set) => ({
  pageIndex: 0,
  pageSize: 10,
  setPageIndex: (index) => set({ pageIndex: index }),
  setPageSize: (size) => set({ pageSize: size }),
}));