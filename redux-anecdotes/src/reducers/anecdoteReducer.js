import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"


const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecdoteSlice = createSlice({
   name: "anecdotes",
   initialState,
   reducers: {
      createAnecdote(state, action) {
         anecdoteService.newAnecdote({ content: action.payload, votes: 0 })
         return state.concat({
            id: getId(),
            content: action.payload,
            votes: 0,
         })
      },
      voteAnecdote(state, action) {
         const id = action.payload
         const votedAnecdote = state.find(a => a.id === id)
         const anecdoteToUpdate = {
            ...votedAnecdote,
            votes: votedAnecdote.votes + 1,
         }

         return state.map((anecdote) =>
            anecdote.id !== anecdoteToUpdate.id ? anecdote : anecdoteToUpdate
         )
      },
      setAnecdotes(state, action) {
         return action.payload
      }
   }
})

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer