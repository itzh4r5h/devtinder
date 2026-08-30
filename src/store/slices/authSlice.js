import { createSlice } from "@reduxjs/toolkit";
import { asyncThunkHandler } from "../handlers";
import { signup } from "../thunks/authThunk";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  extraReducers: (builder) => {
    asyncThunkHandler(builder, signup, {
      pending: (state) => {
        state.isLoggedIn = false
      },
      fulfilled: (state) => {
        state.isLoggedIn = true
      },
      rejected: (state) => {
        state.isLoggedIn = false
      }
    })
  }
})

export const authReducer = authSlice.reducer
