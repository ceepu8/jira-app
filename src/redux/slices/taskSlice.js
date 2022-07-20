import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTaskDetail } from "../../apis/task.management.apis";

const initialState = {
  taskDetail: {},
};

export const fetchTaskDetail = createAsyncThunk(
  "task/get-task-detail",
  async (id) => {
    try {
      const { content } = await getTaskDetail(id);
      console.log(content);
      return content;
    } catch (error) {
      console.log(error);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskDetail: (state, action) => {
      state.taskDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTaskDetail.fulfilled, (state, { payload }) => {
      return { ...state, taskDetail: payload };
    });
  },
});

export const { setTaskDetail } = taskSlice.actions;

export default taskSlice.reducer;
