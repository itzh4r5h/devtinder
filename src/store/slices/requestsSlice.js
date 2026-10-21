import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { getReceviedRequests, getSentRequests } from "../thunks/requestsThunk";

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    received: [],
    sent: []
  },
  extraReducers: (builder) => {
    buildCases(builder, getReceviedRequests, {
      pending: (state) => {
        state.received = []
      },
      fulfilled: (state, action) => {
        state.received = action.payload
      },
      reject: (state) => {
        state.received = []
      }
    })

    buildCases(builder, getSentRequests, {
      pending: (state) => {
        state.sent = []
      },
      fulfilled: (state, action) => {
        state.sent = action.payload
      },
      reject: (state) => {
        state.sent = []
      }
    })
  }
})

// export const { setFeed } = feedSlice.actions

export const requestsReducer = requestsSlice.reducer
