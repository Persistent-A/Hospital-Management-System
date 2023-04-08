const mongoose = require('mongoose')

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    employee_id: {
        type: Number,
        required: [true, 'Please add an employee_id']
    },
    password: {
        type: String,
        required: [true, 'Please add the password']
    },
    department: {
        type: String,
        required: [true, 'Please add the department']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Doctor', doctorSchema)
