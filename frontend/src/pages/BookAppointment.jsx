import {useState, useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {bookAppointment, reset} from '../features/auth/authSlice'
// import Spinner from '../components/Spinner'
//Material-UI
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

function BookAppointment() {

    const dropdown = useRef()

    const[formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        date: '',
        department: '',
    })

    const { name, age, phone, email, address, date, department } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {appointments, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth 
    )

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess) {
            navigate('/')
            dispatch(reset())
        }
    }, [appointments, isError, isSuccess, message, navigate, dispatch])
    
    

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const appointmentData = {
            name, age, phone, email, address, date, department 
        }
        dispatch(bookAppointment(appointmentData))   
    }

    if(isLoading){
        return <h1>Loading....</h1>
    }

    const theme = createTheme();

  return <div style={{minHeight:"70vh"}}>
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
        {/* <Box sx={{border: "1px solid grey", width: "50%", margin: '50px auto', display: "flex", flexDirection:"column", alignItems:"center"}}>  */}
            <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Book an Appointment
            </Typography>
            <Typography component="h2" variant="h6">
                Please fill the details 
            </Typography>
            <Box onSubmit={onSubmit} component='form' noValidate sx={{ width: '95%', m: 1}}>    
                <TextField variant="standard" margin="normal" fullWidth type = 'name' id='name' name='name' value={name} placeholder='Enter you name' onChange={onChange} required/>
                
                <TextField variant="standard" margin="normal" fullWidth type = 'age' id='age' name='age' value={age} placeholder='Enter you age' onChange={onChange} required/>
                
                <TextField variant="standard" margin="normal" fullWidth type = 'phone' id='phone' name='phone' value={phone} placeholder='Enter you phone' onChange={onChange} required/>
            
                <TextField variant="standard" margin="normal" fullWidth type = 'email' id='email' name='email' value={email} placeholder='Enter you email' onChange={onChange} required/>
        
                <TextField variant="standard" margin="normal" fullWidth type = 'address' id='address' name='address' value={address} placeholder='Enter you address' onChange={onChange} required/>
            
                <div style={{ display:"flex", justifyContent: 'space-between', alignItems:"center", width: '80%'}}>
                    <label>Select Date: </label>
                    <TextField variant="standard" type = 'date' id='date' name='date' value={date} placeholder='Select date' onChange={onChange}/>
                </div>
                <div style={{ display:"flex", justifyContent: 'space-between', width: '80%', marginTop: "10px"}}>
                    {/* <input type = 'department' id='department' name='department' value={department} placeholder='Select department' onChange={onChange}/> */}
                    <label>Select Department: </label>
                    <select type='department' name='department' ref={dropdown} onChange={onChange}>
                        <option value='' defaultChecked>-----</option>
                        <option value='er'>ER</option>
                        <option value='neuro'>Neuro</option>
                    </select>
                </div>
                <Button variant="outlined" color="secondary" sx={{mt: 3, mb: 3}} fullWidth  type='submit'>Book Appointment</Button> 
            </Box>  
            </Box>
        </Container>
    </ThemeProvider>
  </div>
}

export default BookAppointment
