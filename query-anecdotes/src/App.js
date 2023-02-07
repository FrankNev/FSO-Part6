import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'
import { useQuery, useQueryClient, useMutation } from 'react-query'

const App = () => {
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

   const anecdotes = result.data

   if (result.isError) {
      return (
         <div>anecdote service not available due to problems with the server</div>
      )
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
                     <button onClick={() => voteHandler(anecdote)}>vote</button>
                  </div>
               </div>
            )}
      </div>
   )
}

export default App
