import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../apis/user.management.apis";
import { userLocalService } from "../../local-services/local-service";

const initialState = {
  user: {},
  isLoading: false,
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
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
