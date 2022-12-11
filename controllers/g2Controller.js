const User = require('../models/User');
const Appointment = require('../models/Appointment');
const { filterAppointmentId, isLicenseNoDefault } = require('./common.js');

const g2Test = async (req, res) => {
    const userInfo = await User.findById(req.session.userId).populate("appointmentId");
    const isLicenseNumberDefault = isLicenseNoDefault(userInfo);
    const appointmentInfo = await Appointment.find({ isTimeSlotAvailable: true });

    /*
    if the license number is default, then the user has not entered any information so show empty form values 
    so that they can enter their information. Else, pre load their saved information 
    */
    if (isLicenseNumberDefault) {
        return res.render('g2Test', { userInfo: null, appointmentInfo: appointmentInfo });
    } else {
        return res.render('g2Test', { userInfo: userInfo, appointmentInfo: appointmentInfo });
    }
};

const submitG2 = async (req, res) => {
    const {
        firstName,
        lastName,
        licenseNumber,
        age,
        dob,
        make,
        model,
        year,
        plateNumber,
        allAppointmentInfo,
        appointmentDate,
        appointmentTime
    } = req.body;

    const appointmentId = filterAppointmentId(allAppointmentInfo, appointmentDate, appointmentTime);

    try {
        const user = await User.findByIdAndUpdate(req.session.userId, {
            firstName,
            lastName,
            licenseNumber,
            age,
            dob,
            carDetails: {
                make,
                model,
                year,
                plateNumber
            },
            appointmentId,
            testType: "G2"
        }).populate('appointmentId');

        //make previously selected appointment timeslot available
        await Appointment.findByIdAndUpdate(user.appointmentId, {
            isTimeSlotAvailable: true
        });

        //make newly selected appointment timeslot unavailable
        await Appointment.findByIdAndUpdate(appointmentId, {
            isTimeSlotAvailable: false
        });

        const updatedUserInfo = await User.findById(user._id).populate('appointmentId');
        const updatedAppointmentInfo = await Appointment.find({ isTimeSlotAvailable: true });

        res.render('g2Test', { userInfo: updatedUserInfo, appointmentInfo: updatedAppointmentInfo });
    } catch (e) {
        console.log(e);
    }
}

module.exports = { g2Test, submitG2 };
