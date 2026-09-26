import { createSlice } from "@reduxjs/toolkit";

const reqStatusSlice = createSlice({
  name: 'req_status',
  initialState: {
    message: null,
    isError: false,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null
      state.isError = false
    },
    setSuccessMessage: (state, action) => {
      state.message = action.payload
      state.isError = false
    },
    setErrorMessage: (state, action) => {
      state.message = action.payload
      state.isError = true
    }
  }

})

export const { clearMessage, setSuccessMessage, setErrorMessage } = reqStatusSlice.actions
export const reqStatusReducer = reqStatusSlice.reducer
