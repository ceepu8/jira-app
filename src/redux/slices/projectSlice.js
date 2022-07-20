import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllProject,
  getDetailProject,
} from "../../apis/project.management.apis";

const initialState = {
  projectList: [],
  projectDetail: {},
  isLoading: false,
  error: "",
};

export const fetchProjectDetail = createAsyncThunk(
  "project/fetch-project-detail",
  async (id) => {
    try {
      const response = await getDetailProject(id);
      return response.content;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProjectList = createAsyncThunk(
  "project/fetch-project-list",
  async () => {
    try {
      const { content } = await getAllProject();
      return content;
    } catch (error) {
      console.log(error);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjectDetail: (state, action) => {
      state.projectDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProjectDetail.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(fetchProjectDetail.rejected, (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    });
    builder.addCase(fetchProjectDetail.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, projectDetail: payload };
    });
    builder.addCase(fetchProjectList.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(fetchProjectList.rejected, (state, { payload }) => {
      return { ...state, isLoading: false, error: payload };
    });
    builder.addCase(fetchProjectList.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, projectList: payload };
    });
  },
});

export const { setProjectDetail } = projectSlice.actions;

export default projectSlice.reducer;
