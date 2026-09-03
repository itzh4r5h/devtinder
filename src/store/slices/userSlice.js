import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { getUser } from "../thunks/userThunk";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    buildCases(builder, getUser, {
      pending: (state) => {
        state.user = null
      },
      fulfilled: (state, action) => {
        state.user = action.payload
      },
      rejected: (state) => {
        state.user = null
      }
    })
  }
})

export const { setUser, clearUser } = userSlice.actions
export const userReducer = userSlice.reducer
