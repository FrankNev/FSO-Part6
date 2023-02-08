import { useMutation, useQueryClient } from 'react-query'
import { useNotificationDispatch } from '../reducers/notificationReducer'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
   const queryClient = useQueryClient()
   const dispatch = useNotificationDispatch()
   const resetNotification = () => {
      setTimeout(() => {
         dispatch({ type: 'RESET' })
      }, 5000)
   }

   const newAnecdoteMutation = useMutation(createAnecdote, {
      onSuccess: (newAnecdote) => {
         dispatch({ type: 'ADDED', data: newAnecdote })
         resetNotification()

         const anecdotes = queryClient.getQueryData('anecdotes')
         queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      },
      onError: () => {
         dispatch({ type: 'ERROR' })
         resetNotification()
      }
   })

   const onCreate = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''

      newAnecdoteMutation.mutate({ content, votes: 0 })
   }

   return (
      <div>
         <h3>Create new anecdote</h3>
         <form onSubmit={onCreate}>
            <input name="anecdote" />
            <button type="submit">create</button>
         </form>
      </div >
   )

}

export default AnecdoteForm
