import { useSelector } from 'react-redux'

const Notification = () => {
   const notificationsState = useSelector((state) => state.notification)

   const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
   }

   return (
      <div style={style}>{notificationsState}</div>
   )
}

export default Notification