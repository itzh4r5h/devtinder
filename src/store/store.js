import { configureStore } from "@reduxjs/toolkit";
import { reqStatusReducer } from "./slices/reqStatusSlice";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { feedReducer } from "./slices/feedSlice";

export const store = configureStore({
  reducer: {
    req_status: reqStatusReducer,
    auth: authReducer,
    user: userReducer,
    feed: feedReducer,
  }
})
