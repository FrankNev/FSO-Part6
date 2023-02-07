import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"


const initialState = []

const anecdoteSlice = createSlice({
   name: "anecdotes",
   initialState,
   reducers: {
      anecdoteToVote(state, action) {
         return state.map((anecdote) =>
            anecdote.id !== action.payload.id ? anecdote : action.payload
         )
      },
      appendAnecdote(state, action) {
         state.push(action.payload)
      },
      setAnecdotes(state, action) {
         return action.payload
      }
   }
})

export const { anecdoteToVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
   return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
   }
}

export const createAnecdote = (content) => {
   return async (dispatch) => {
      const anecdote = await anecdoteService.newAnecdote({
         content,
         votes: 0,
      })
      dispatch(appendAnecdote(anecdote))
   }
}

export const voteAnecdote = (anecdote) => {
   return async (dispatch) => {
      const response = await anecdoteService.voteAnecdote(anecdote)
      dispatch(anecdoteToVote(response.data))
   }
}

export default anecdoteSlice.reducer