import { createSlice } from "@reduxjs/toolkit";
import { buildCases } from "../handlers";
import { getConnections } from "../thunks/connectionThunk";

const connectionSlice = createSlice({
  name: "connections",
  initialState: {
    connectionsData: [],
    isConnectionsReceived: false
  },
  extraReducers: (builder) => {
    buildCases(builder, getConnections, {
      pending: (state) => {
        state.connectionsData = []
        state.isConnectionsReceived = false
      },
      fulfilled: (state, action) => {
        state.connectionsData = action.payload
        state.isConnectionsReceived = true
      },
      reject: (state) => {
        state.connectionsData = []
        state.isConnectionsReceived = false
      }
    })

  }
})

export const connectionReducer = connectionSlice.reducer
