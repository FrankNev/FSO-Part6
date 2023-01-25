import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { newNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
   const dispatch = useDispatch()

   const addNewAnecdote = (e) => {
      e.preventDefault()
      const newAnecdote = e.target.anecdote.value
      dispatch(createAnecdote(newAnecdote))

      dispatch(newNotification(`New anecdote added: ${newAnecdote}`))
      e.target.reset()

      setTimeout(() => {
         dispatch(removeNotification())
      }, 5000)
   }

   return (
      <div>
         <h2>Create new</h2>
         <form onSubmit={addNewAnecdote}>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
         </form>
      </div>
   )
}

export default AnecdoteForm