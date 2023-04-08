const path = require('path')

const express = require('express')
const port = process.env.PORT || 5001

const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')
connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/appointments', require('./routes/appointmentRoutes'))
app.use('/api/doctor', require('./routes/doctorRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server is running on port: ${port}`))