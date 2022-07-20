import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProjectFormEditToggle: false,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    openProjectEditForm: (state) => {
      state.isProjectFormEditToggle = true;
    },
    closeProjectEditForm: (state) => {
      state.isProjectFormEditToggle = false;
    },
  },
});

export const { openProjectEditForm, closeProjectEditForm } =
  toggleSlice.actions;

export default toggleSlice.reducer;
