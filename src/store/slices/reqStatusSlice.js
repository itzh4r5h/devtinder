import { createSlice } from "@reduxjs/toolkit";

const reqStatusSlice = createSlice({
  name: 'req_status',
  initialState: {
    message: null,
    isError: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null
      state.isError = null
    },
    setSuccessMessage: (state, action) => {
      state.message = action.payload
      state.isError = null
    },
    setErrorMessage: (state, action) => {
      state.message = action.payload
      state.isError = true
    }
  }

})

export const { clearMessage, setSuccessMessage, setErrorMessage } = reqStatusSlice.actions
export const reqStatusReducer = reqStatusSlice.reducer
