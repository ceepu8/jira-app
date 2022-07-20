import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser, loginUser } from "../../apis/user.management.apis";
import { userLocalService } from "../../local-services/local-service";

const initialState = {
  user: {},
  isLoading: false,
  userList: [],
};

export const userLoginActionService = createAsyncThunk(
  "user/login",
  async (data) => {
    try {
      let result = await loginUser(data);
      userLocalService.setUserInfor(result.content);
      return result;
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [userLoginActionService.pending]: (state, action) => {
      state.isLoading = true;
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

export const {} = userSlice.actions;

export default userSlice.reducer;
