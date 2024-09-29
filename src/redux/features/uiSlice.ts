import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type UiState = {
  isMenuModalOpen: boolean;
};

const initialState: UiState = {
  isMenuModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsMenuModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuModalOpen = action.payload;
    },
  },
});

export const { setIsMenuModalOpen } = uiSlice.actions;

export const selectUi = (state: RootState) => state.ui;

export default uiSlice.reducer;
