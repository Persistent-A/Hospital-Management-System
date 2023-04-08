const asyncHandler = require('express-async-handler')

const Appointment = require('../model/appointmentModel')
const Doctor = require('../model/doctorModel')

const getAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ department: req.doctor.department })
    const filteredAppointments = appointments.filter((appointment) => appointment.date === req.body.date)
    res.status(200).json(filteredAppointments)
})

const setAppointment = asyncHandler(async (req, res) => {
    // console.log(req.body)
    if(!req.body){
        res.status(400)
        throw new Error('Please add all the fields')
    }
    const appointment = await Appointment.create({
        // doctor: req.doctor.id,
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        date: req.body.date,
        department: req.body.department
    })

    res.status(200).json(appointment)
})

const updateAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)

    if(!appointment){
        res.status(400)
        throw new Error('Appointment not found')
    }

    //check for doctor
    if(!req.doctor){
        res.status(401)
        throw new Error('Doctor not found')
    }

    //make sure the loggin doctor matches the appointment doctor
    if(appointment.department !== req.doctor.department){
        res.status(401)
        throw new Error('doctor not authorized')
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedAppointment)
})

const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id)

    
    if(!appointment){
        res.status(400)
        throw new Error('Appointment not found')
    }
      //check for doctor
    if(!req.doctor){
        res.status(401)
        throw new Error('doctor not found')
    }

    //make sure the loggin doctor matches the appointment doctor
    if(appointment.department !== req.doctor.department){
        res.status(401)
        throw new Error('doctor not authorized')
    }
    await appointment.remove()
    
    res.status(200).json({id: req.params.id})
})

module.exports = {getAppointments, setAppointment, updateAppointment, deleteAppointment}