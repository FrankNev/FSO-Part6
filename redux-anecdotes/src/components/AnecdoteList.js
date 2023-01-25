import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
   const dispatch = useDispatch()
   const anecdotes = useSelector(state => state.anecdotes)
   const filter = useSelector((state) => state.filter)

   const voteHandler = async ({ id, content }) => {
      dispatch(voteAnecdote(id))
      const votedAnecdote = anecdotes.find(a => a.id === id)

      dispatch(
         newNotification(`You voted for: ${votedAnecdote.content}`)
      )
      setTimeout(() => {
         dispatch(removeNotification())
      }, 5000)
   }

   return (
      <div>
         {anecdotes
            .slice()
            .filter((anecdote) => {
               return filter !== null ? anecdote.content.includes(filter) : null
            })
            .sort((a, b) => (b.votes - a.votes))
            .map((anecdote) => (
               <div key={anecdote.id}>
                  <div>{anecdote.content}</div>
                  <div>
                     Votes: {anecdote.votes}
                     <button onClick={() => voteHandler(anecdote)}>vote</button>
                  </div>
               </div>
            ))
         }
      </div>
   )
}

export default AnecdoteList