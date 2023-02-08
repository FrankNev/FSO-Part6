import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
   switch (action.type) {
      case 'VOTED':
         return `You voted for: '${action.data.content}'`
      case 'ADDED':
         return `The anecdote '${action.data.content}' has been added`
      case 'ERROR':
         return 'anecdote too short, must be 5 characters or more'
      case 'RESET':
         return ''
      default:
         return state
   }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
   const [notification, notificationDispatch] = useReducer(
      notificationReducer,
      ''
   )

   return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
         {props.children}
      </NotificationContext.Provider>
   )
}

export const useNotificationValue = () => {
   const notificationAndDispatch = useContext(NotificationContext)
   return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
   const notificationAndDispatch = useContext(NotificationContext)
   return notificationAndDispatch[1]
}