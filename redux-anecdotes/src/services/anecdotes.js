import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
   const response = await axios.get(baseUrl)
   return response.data
}

const newAnecdote = async (anecdote) => {
   const response = await axios.post(baseUrl, anecdote)
   return response.data
}

const voteAnecdote = async (anecdote) => {
   const { id, votes } = anecdote
   const response = await axios.put(baseUrl + `/${id}`, {
      ...anecdote,
      votes: votes + 1,
   })
   return response
}

const anecdoteService = { getAll, newAnecdote, voteAnecdote }
export default anecdoteService