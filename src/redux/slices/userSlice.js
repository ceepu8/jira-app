import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllUser, loginUser } from "../../apis/user.management.apis";
import { userLocalService } from "../../local-services/local-service";

const initialState = {
  user: null,
  isLoading: false,
  userList: [],
  error: null,
};

export const userLoginActionService = createAsyncThunk(
  "user/login",
  async (data) => {
    try {
      let result = await loginUser(data);
      userLocalService.setUserInfor(result.content);
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllUserActionService = createAsyncThunk(
  "user/getAllUser",
  async () => {
    try {
      let result = await getAllUser();
      return result.content;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [userLoginActionService.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [userLoginActionService.rejected]: (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    },
    [userLoginActionService.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.content;
    },
    [getAllUserActionService.fulfilled]: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
