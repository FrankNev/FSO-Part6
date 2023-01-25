import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
   const dispatch = useDispatch()

   const handleFilter = (event) => {
      dispatch(setFilter(event.target.value))
   }
   const style = {
      margin: 20,
      marginLeft: 0
   }

   return (
      <div style={style}>
         Filter: <input onChange={handleFilter} />
      </div>
   )
}

export default Filter