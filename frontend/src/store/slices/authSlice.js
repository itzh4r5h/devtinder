import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { checkIsUserLoggedIn, resendVerification, resetPassword, sendForgotPasswordOtp, signin, signout, signup, verifyEmail } from "../thunks/authThunk";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isAuthChecked: false,
    // timestamp (ms) after which another verification email can be requested
    resendAvailableAt: 0,
    // timestamp (ms) after which another password reset otp can be requested
    resetOtpAvailableAt: 0,
    // email the reset otp was sent to, used by the "enter otp" step
    resetEmail: "",
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setResendAvailableAt: (state, action) => {
      state.resendAvailableAt = action.payload
    },
    setResetOtpAvailableAt: (state, action) => {
      state.resetOtpAvailableAt = action.payload
    },
    // goes back to the "enter email" step of forgot password
    clearResetEmail: (state) => {
      state.resetEmail = ""
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.resendAvailableAt = action.payload.resendAvailableAt
    })
    builder.addCase(resendVerification.fulfilled, (state, action) => {
      state.resendAvailableAt = action.payload.resendAvailableAt
    })
    builder.addCase(sendForgotPasswordOtp.fulfilled, (state, action) => {
      state.resetEmail = action.payload.email
      state.resetOtpAvailableAt = action.payload.resetOtpAvailableAt
    })
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.resetEmail = ""
      state.resetOtpAvailableAt = 0
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

export const { setIsLoggedIn, setResendAvailableAt, setResetOtpAvailableAt, clearResetEmail } = authSlice.actions
export const authReducer = authSlice.reducer
