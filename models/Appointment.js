const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    appointmentDate: {
        type: Date,
        default: new Date(),
        required: [true, 'Please provide appointment date']
    },

    appointmentTime: {
        type: String,
        default: 'default',
        required: [true, 'Please provide appointment time']
    },
    isTimeSlotAvailable: {
        type: Boolean,
        default: true
    }
})

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;

