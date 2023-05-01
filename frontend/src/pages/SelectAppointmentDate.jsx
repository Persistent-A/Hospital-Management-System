import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import PatientDetailsCard from "../components/PatientDetailsCard"
import {doctorsAppointments} from '../features/auth/authSlice'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function SelectAppointmentDate() {
    
    const [selectedDate, setSelectedDate] = useState('')
    const [date, setDate] =useState('')
    // const navigate = useNavigate()
    const dispatch = useDispatch()
    const { appointments } = useSelector((state) => state.auth)

    const selectDate = (e) => {
      setSelectedDate(e.target.value)
      setDate('')
    }

    const showPatientDetails = (e) => {
        e.preventDefault()
        dispatch(doctorsAppointments({date: selectedDate}))
        setDate(selectedDate)
    }
    const theme = createTheme();
  return (<div style={{minHeight:"70vh"}}>
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="s">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
        <Box component="form" onSubmit={showPatientDetails} noValidate sx={{ mt:1}}>
                <Typography  sx={{fontSize: {xs: '20px', sm: '45px', md: '45px'}, marginTop: {sm: "45px", md: '45px'}}}>
                    Welcome to your scheduled appointment
                </Typography>
                <Typography sx={{fontSize: {xs: '17px', sm: '25px', md: '25px'}, margin: {sm: 'auto'}, marginTop: {xs: "25px", sm: "25px", md: '45px'}, display:{ sm: "flex"}, justifyContent: {sm: 'space-between'}, alignItems:{sm: "center"}, width:{sm :'60%'}}}>
                    <label>Select date of appointment:</label>
                    <input type='date' value={selectedDate} onChange={selectDate}/>
                </Typography>
                <Button variant="contained" color="primary" sx={{width:{sm: "40%"}, margin: {sm: "0px 250px 30px 250px", xs: "0px 60px 20px 80px"}, marginTop: {xs: "25px", sm: "25px", md: '45px'}}} type='submit'>Click to Check</Button>
        </Box>
        
            <Box sx={{display: 'flex', flexDirection: {xs: 'column', sm:'row'}}}>
                { appointments[0] 
                ?  
                appointments.map((appointment) => 
                    <PatientDetailsCard key={appointment.id} appointment={appointment} selectedDate={selectedDate}/>
                ) 
                :
                date === '' ? '' :  `No Appointments for the date: ${date}`
                }  
            </Box>
        </Box>
        </Container>
    </ThemeProvider>
  </div>
  )
}

export default SelectAppointmentDate
