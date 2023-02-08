import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, voteAnecdote } from './requests'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useNotificationDispatch } from './reducers/notificationReducer'

const App = () => {
   const dispatch = useNotificationDispatch()
   const queryClient = useQueryClient()

   const voteMutation = useMutation(voteAnecdote, {
      onSuccess: () => {
         queryClient.invalidateQueries('anecdotes')
      }
   })

   const voteHandler = (anecdote) => {
      voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
   }

   const result = useQuery('anecdotes', getAnecdotes, {
      refetchOnWindowFocus: false,
   })
   if (result.isLoading) {
      return <div>Loading...</div>
   }

   if (result.isError) {
      return (
         <div>anecdote service not available due to problems with the server</div>
      )
   }

   const anecdotes = result.data

   const voteAction = (anecdote) => {
      dispatch({ type: 'VOTED', data: anecdote })

      voteHandler(anecdote)
      setTimeout(() => {
         dispatch({ type: 'RESET' })
      }, 5000)
   }

   return (
      <div>
         <h3>Anecdote app</h3>

         <Notification />
         <AnecdoteForm />

         {anecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
               <div key={anecdote.id}>
                  <div>
                     {anecdote.content}
                  </div>
                  <div>
                     has {anecdote.votes} votes
                     <button onClick={() => voteAction(anecdote)}>vote</button>
                  </div>
               </div>
            )}
      </div>
   )
}

export default App
