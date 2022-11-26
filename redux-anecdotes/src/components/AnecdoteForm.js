import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
   const dispatch = useDispatch()
   
   const addNewAnecdote = (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''

      dispatch(createAnecdote(content))
   }

   return (
      <div>
         <h2>Create new</h2>
         <form onSubmit={ addNewAnecdote }>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
         </form>
      </div>
   )
}

export default AnecdoteForm