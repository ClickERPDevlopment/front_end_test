import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuToggleState {
  [key: string]: {
    isOpen: boolean;
    wasOpen: boolean;
  };
}

const initialState: MenuToggleState = {};

const menuToggleSlice = createSlice({
  name: "menuToggle",
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<string>) => {
      const menuKey = action.payload;
      const current = state[menuKey] || { isOpen: false, wasOpen: false };

      const isOpen = !current.isOpen;
      const wasOpen = current.isOpen || current.wasOpen;
      console.log({ menuKey, isOpen, wasOpen });
      state[menuKey] = { isOpen, wasOpen };
    },
    setMenuState: (
      state,
      action: PayloadAction<{ key: string; isOpen: boolean; wasOpen?: boolean }>
    ) => {
      const { key, isOpen, wasOpen = false } = action.payload;
      state[key] = { isOpen, wasOpen };
    },
    resetAllMenus: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = { isOpen: false, wasOpen: false };
      });
    },
  },
});

export const { toggleMenu, setMenuState, resetAllMenus } = menuToggleSlice.actions;
export default menuToggleSlice.reducer;
