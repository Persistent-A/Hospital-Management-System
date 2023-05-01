import axios from 'axios'
// import { updateAppointment } from '../../../../backend/controllers/appointmentController'


//bookAppointment
const bookAppointment = async (appointmentData) => {
    const response = await axios.post('/api/appointments/', appointmentData)
    return response.data
}

//Delete Appointment
const deleteAppointment = async(appointmentID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete('/api/appointments/' + appointmentID, config)
    return response.data
}

//Change Appointment Date
const changeAppointmentDate = async(updatedAppointment, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put('/api/appointments/' + updatedAppointment._id, updatedAppointment, config)
    return response.data
}

// login doctor
const login = async (doctorData) => {
    const response = await axios.post('/api/doctor/login/', doctorData)

    if(response.data){
        localStorage.setItem('doctor', JSON.stringify(response.data))
    }
    return response.data
}

// LogOut Doctor
const logoutDoctor = async() => {
    localStorage.removeItem('doctor')
    localStorage.removeItem('appointments')
}

////Get Specific Doctor's Appointments
const doctorsAppointments = async(date, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`/api/appointments/get_appointments/`, date, config)
    if(response.data){
        localStorage.setItem('appointments', JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    bookAppointment, 
    login, 
    logoutDoctor,
    doctorsAppointments,
    deleteAppointment,
    changeAppointmentDate
}

export default authService