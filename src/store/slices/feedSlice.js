import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { getUsers } from "../thunks/feedThunk";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    userLoading: false,
    users: [],
    currentPage: 1,
    totalUsers: 0
  },
  extraReducers: (builder) => {
    buildCases(builder, getUsers, {
      pending: (state) => {
        state.userLoading = true
        state.users = []
        state.currentPage = 1
        state.totalUsers = 0
      },
      fulfilled: (state, action) => {
        const { users, currentPage, totalUsers } = action.payload
        state.userLoading = false
        state.users = users
        state.currentPage = currentPage
        state.totalUsers = totalUsers
      },
      reject: (state) => {
        state.userLoading = false
        state.users = []
        state.currentPage = 1
        state.totalUsers = 0
      }
    })
  }
})

export const { setFeed } = feedSlice.actions

export const feedReducer = feedSlice.reducer
