import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { checkIsUserLoggedIn, signin, signout, signup } from "../thunks/authThunk";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isAuthChecked: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    }
  },
  extraReducers: (builder) => {
    buildCases(builder, signup, {
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
    buildCases(builder, checkIsUserLoggedIn, {
      pending: (state) => {
        state.isLoggedIn = false
        state.isAuthChecked = true
      },
      fulfilled: (state) => {
        state.isLoggedIn = true
      },
      rejected: (state) => {
        state.isLoggedIn = false
      }
    })
    buildCases(builder, signin, {
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
    buildCases(builder, signout, {
      pending: (state) => {
        state.isLoggedIn = true
      },
      fulfilled: (state) => {
        state.isLoggedIn = false
      },
      rejected: (state) => {
        state.isLoggedIn = true
      }
    })
  }
})

export const { setIsLoggedIn } = authSlice.actions
export const authReducer = authSlice.reducer
