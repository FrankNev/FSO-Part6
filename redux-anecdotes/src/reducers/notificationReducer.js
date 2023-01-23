import { createSlice } from "@reduxjs/toolkit"

let initialState = []

const notificationSlice = createSlice({
   name: "notifications",
   initialState,
   reducers: {
      newNotification: (state, action) => {
         return state.concat(action.payload)
      },
      removeNotification: (state, action) => {
         return state = initialState
      }
   }
})

export const { newNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer