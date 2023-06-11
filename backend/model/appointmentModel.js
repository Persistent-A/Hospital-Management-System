const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please fill this field"],
    },
    age: {
      type: Number,
      required: [true, "Please fill this field"],
    },
    phone: {
      type: Number,
      required: [true, "Please fill this field"],
    },
    email: {
      type: String,
      required: [true, "Please fill this field"],
    },
    address: {
      type: String,
      required: [true, "Please fill this field"],
    },
    date: {
      type: String,
      required: [true, "Please fill this field"],
    },
    department: {
      type: String,
      required: [true, "Please fill this field"],
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
