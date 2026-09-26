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
      const result = await handler(params, dispatch)
      if (result?.message) {
        dispatch(setSuccessMessage(result.message))
      }
      if (result?.data) {
        return result.data
      }
    } catch (error) {
      console.log(error) //it's just for debug purpose in dev mode
      const errorMessage = error.response?.data?.message || "Something Went Wrong!";
      if (params !== 'auth_check') {
        dispatch(setErrorMessage(errorMessage))
      }
      return rejectWithValue(errorMessage)
    }
  })
}
