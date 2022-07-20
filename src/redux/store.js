import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import taskSlice from "./slices/taskSlice";
import projectSlice from "./slices/projectSlice";
import commentSlice from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    taskSlice,
    projectSlice,
    commentSlice,
  },
});
