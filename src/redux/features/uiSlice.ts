import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type UiState = {
  isMenuModalOpen: boolean;
  isSidebarExpanded: boolean;
};

const initialState: UiState = {
  isMenuModalOpen: false,
  isSidebarExpanded: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsMenuModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuModalOpen = action.payload;
    },
    setIsSidebarExpanded: (state, action: PayloadAction<boolean>) => {
      state.isSidebarExpanded = action.payload;
    },
  },
});

export const { setIsMenuModalOpen, setIsSidebarExpanded } = uiSlice.actions;

export const selectUi = (state: RootState) => state.ui;

export default uiSlice.reducer;
