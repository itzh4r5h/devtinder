import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { getUser, updateProfilePic } from "../thunks/userThunk";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    uploading: false,
    uploaded: false
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
    buildCases(builder, updateProfilePic, {
      pending: (state) => {
        state.uploading = true
        state.uploaded = false
      },
      fulfilled: (state) => {
        state.uploaded = true
        state.uploading = false
      },
      rejected: (state) => {
        state.uploaded = false
        state.uploading = false
      }
    })
  }
})

export const { setUser, clearUser } = userSlice.actions
export const userReducer = userSlice.reducer
