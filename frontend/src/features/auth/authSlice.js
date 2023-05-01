import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get doctor from local storage
const doctor = JSON.parse(localStorage.getItem('doctor'))
const appointments = JSON.parse(localStorage.getItem('appointments'))

const initialState = {
    appointments: appointments ? appointments : [],
    doctor: doctor ? doctor : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Book an Appointment
export const bookAppointment = createAsyncThunk('auth/appointment_booking', async(appointmentData, thunkAPI) => {
    try{
        return await authService.bookAppointment(appointmentData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})  

//Change Appointment Date
export const changeAppointmentDate = createAsyncThunk('auth/change_appointment_date', async(updatedAppointment, thunkAPI) => {
    try{
        const token = await thunkAPI.getState().auth.doctor.token
        return await authService.changeAppointmentDate(updatedAppointment, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get Specific Doctor's Appointments
export const doctorsAppointments = createAsyncThunk('auth/getDoctorsAppointment', async(date, thunkAPI) => {
    try{
        const token = await thunkAPI.getState().auth.doctor.token  
        return await authService.doctorsAppointments(date, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete Appointment
export const deleteAppointment = createAsyncThunk('auth/deleteAppointment', async(appointmentID, thunkAPI) => {
    try{
        const token = await thunkAPI.getState().auth.doctor.token
        return await authService.deleteAppointment(appointmentID, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//login user
export const login = createAsyncThunk('auth/login', async(doctorData, thunkAPI) => {
    try{
        return await authService.login(doctorData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

//Logout Doctor
export const logoutDoctor = createAsyncThunk('auth/logout', async(_, thunkAPI) => {
    try{
        return await authService.logoutDoctor()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(bookAppointment.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(bookAppointment.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.appointments.push(action.payload)
            })
            .addCase(bookAppointment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(logoutDoctor.fulfilled, (state)=>{
                state.doctor = null
                state.appointments = []
            })
            .addCase(login.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.doctor = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.doctor = null
            })
            .addCase(doctorsAppointments.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(doctorsAppointments.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.appointments = action.payload
            })
            .addCase(doctorsAppointments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteAppointment.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(deleteAppointment.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.appointments = state.appointments.filter((appointment) => appointment._id !== action.payload.id ) 
            })
            .addCase(deleteAppointment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(changeAppointmentDate.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(changeAppointmentDate.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                console.log(action.payload)
                state.appointments = state.appointments.map((appointment) => appointment._id === action.payload._id ? {...appointment, date: action.payload.date} : appointment)
            })
            .addCase(changeAppointmentDate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
    },
})

export const {reset} = authSlice.actions

export default authSlice.reducer
