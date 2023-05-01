import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeAppointmentDate } from '../features/auth/authSlice'
import Button from '@mui/material/Button'

const ReSchedule = ({appointment, selectedDate}) => {
    const [reDate, setReDate] = useState()
    
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const reSchedule = (e) => {
      e.preventDefault()
      const updatedAppointment = {
        ...appointment,
        date: reDate
      }
      dispatch(changeAppointmentDate(updatedAppointment))
    }


  return (
    <form onSubmit={reSchedule}>
      <label>Select date to reschedule the appoinment: </label>
      <input type="date" value={reDate} onChange={(e)=>setReDate(e.target.value)}/>
      <Button size='small' variant="contained" color="primary" type='submit'>Reschedule</Button> 
    </form>
  )
}

export default ReSchedule
