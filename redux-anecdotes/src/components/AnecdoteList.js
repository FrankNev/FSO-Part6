import React from 'react'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = (props) => {
   const dispatch = useDispatch()
   const anecdotes = useSelector(state => state)

   const vote = (id) => {
      dispatch({
        id: id,
        type: 'VOTE'
      })
    }

   const orderedList = anecdotes.sort((a, b) => b.votes - a.votes)

   return (
      <div>
        { orderedList.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div> )}
      </div>
    )
}

export default AnecdoteList