const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const AppointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    isTimeSlotUnavailable: {
        type: Boolean,
        default: false
    }
});

AppointmentSchema.index({ "date": 1, "time": 1}, { "unique": true });

AppointmentSchema.plugin(uniqueValidator)

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;