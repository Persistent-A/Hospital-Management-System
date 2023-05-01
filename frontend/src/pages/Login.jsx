import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


function Login() {

    const[formData, setFormData] = useState({
        employee_id: '',
        password: '',
    })

    const { employee_id, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { doctor, isLoading, isError, isSuccess, message } = useSelector(
      (state) => state.auth
    )

    useEffect(() => {
      if (isError) {
        toast.error(message)
      }

      if (isSuccess && doctor ) {
        // dispatch(doctorsAppointments())
        navigate('/select_appointment_date/')
      }
    }, [doctor, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

      const doctorData = {
        employee_id,
        password,
      }
      
      dispatch(login(doctorData))
    }
      
    if (isLoading) {
      return <Spinner />
    }

    const theme = createTheme();

  return (
    <div style={{minHeight:"70vh"}}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Sign in
          </Typography>
          
          <Box onSubmit={onSubmit} component='form' noValidate sx={{ mt: 1 }}>    
            <TextField autoFocus variant="standard" margin="normal" fullWidth required type='employee_id' id='employee_id' name='employee_id' value={employee_id} placeholder='Enter you employee_id' onChange={onChange}/>
          
            <TextField variant="standard" margin="normal" fullWidth required type='password' id='password' name='password' value={password} placeholder='Enter you password' onChange={onChange}/>
          
            <Button variant="outlined" color="secondary" sx={{mt: 2, mb: 5}} fullWidth  type='submit'>Login</Button> 
          </Box>  
        </Box>
        </Container>
    </ThemeProvider>
    </div>
  )
}

export default Login

