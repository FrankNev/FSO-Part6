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

export const timedNotification = (content, timeout) => {
   return async (dispatch) => {
      await dispatch(newNotification(content))
      setTimeout(() => {
         dispatch(removeNotification(content))
      }, timeout)
   }
}

export default notificationSlice.reducer