import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllComment } from "../../apis/comment.management.apis";

const initialState = {
  commentList: [],
};

export const getAllCommentAPI = createAsyncThunk(
  "comment/get-all-comment",
  async (taskId) => {
    try {
      const { content } = await getAllComment(taskId);
      return content;
    } catch (error) {
      console.log(error);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllCommentAPI.fulfilled, (state, { payload }) => {
      return { ...state, commentList: payload };
    });
  },
});

export default commentSlice.reducer;
