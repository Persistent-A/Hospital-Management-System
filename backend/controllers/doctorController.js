const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Doctor = require('../model/doctorModel')

//@desc Register a new user
//@route  POST/api/users
//@access Public

const registerDoctor = asyncHandler (async (req, res) => {
    const {name, employee_id, password, department} = req.body

    console.log(req.body)

    if(!name || !employee_id || !password ||!department){
        res.status(400)
        throw new Error('Please add all fields ')
    }

    //Check if user exists
    const doctorExists = await Doctor.findOne({employee_id})

    if(doctorExists){
        res.status(400)
        throw new Error('doctor already exists.')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user
    const doctor = await Doctor.create({
        name,
        employee_id,
        password: hashedPassword,
        department
    })

    if(doctor) {
        res.status(201).json({
            _id: doctor.id,
            name: doctor.name,
            employee_id: doctor.employee_id,
            department: doctor.department,
            token: generateToken(doctor._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid doctor data')
    }
})

//@desc Authenticate a user
//@route  POST/api/users/login
//@access Public

const loginDoctor = asyncHandler (async (req, res) => {
    const {employee_id, password} = req.body

    const doctor = await Doctor.findOne({employee_id})

    if(doctor && (await bcrypt.compare(password, doctor.password))){
        res.json({
            _id: doctor.id,
            name: doctor.name,
            employee_id: doctor.employee_id,
            token: generateToken(doctor._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

//@desc Get new user
//@route  GET/api/users/me
//@access Private

const getMe = asyncHandler (async (req, res) => {

    res.status(200).json(req.doctor)
})

//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {registerDoctor, loginDoctor, getMe}