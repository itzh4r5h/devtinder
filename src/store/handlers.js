import { createAsyncThunk } from "@reduxjs/toolkit"
import { setErrorMessage, setSuccessMessage } from "./slices/reqStatusSlice"

export const buildCases = (builder, asyncThunk, handlers) => {
  builder.addCase(asyncThunk.pending, handlers.pending)
  builder.addCase(asyncThunk.fulfilled, handlers.fulfilled)
  builder.addCase(asyncThunk.rejected, handlers.rejected)
}

export const asyncThunkHandler = (actionType, handler) => {
  return createAsyncThunk(actionType, async (params, { dispatch, rejectWithValue }) => {
    try {
      const message = await handler(params, dispatch)
      if (message) {
        dispatch(setSuccessMessage(message))
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something Went Wrong!";
      if (params !== 'auth_check') {
        dispatch(setErrorMessage(errorMessage))
      }
      return rejectWithValue(errorMessage)
    }
  })
}
