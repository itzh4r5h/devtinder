import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { checkIsUserLoggedIn, resendVerification, signin, signout, signup, verifyEmail } from "../thunks/authThunk";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isAuthChecked: false,
    // timestamp (ms) after which another verification email can be requested
    resendAvailableAt: 0,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setResendAvailableAt: (state, action) => {
      state.resendAvailableAt = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.resendAvailableAt = action.payload.resendAvailableAt
    })
    builder.addCase(resendVerification.fulfilled, (state, action) => {
      state.resendAvailableAt = action.payload.resendAvailableAt
    })
    // verifying the email logs the user in (backend sets the cookie)
    builder.addCase(verifyEmail.fulfilled, (state) => {
      state.isLoggedIn = true
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

export const { setIsLoggedIn, setResendAvailableAt } = authSlice.actions
export const authReducer = authSlice.reducer
