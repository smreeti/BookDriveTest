const User = require('../models/User');
const Appointment = require('../models/Appointment');
const { filterAppointmentId, isLicenseNoDefault } = require('./common.js');

const gTest = async (req, res) => {
    const userInfo = await User.findById(req.session.userId).populate("appointmentId");
    const isLicenseNumberDefault = isLicenseNoDefault(userInfo);
    const appointmentInfo = await Appointment.find({ isTimeSlotAvailable: true });

    /*
      if the license number is default, then the user has not entered any information so show empty form values 
      so that they can enter their information. Else, pre load their saved information 
      */
    if (isLicenseNumberDefault) {
        return res.redirect('/g2Test');
    } else {
        return res.render('gTest', { userInfo: userInfo, appointmentInfo: appointmentInfo });
    }
};

const submitG = async (req, res) => {
    const { make,
        model,
        year,
        plateNumber,
        allAppointmentInfo,
        appointmentDate,
        appointmentTime
    } = req.body;

    const loggedInId = req.session.userId;

    //newly selected appointment date and time
    const appointmentId = filterAppointmentId(allAppointmentInfo, appointmentDate, appointmentTime);

    try {
        const user = await User.findByIdAndUpdate(loggedInId, {
            carDetails: {
                make, model, year, plateNumber
            },
            appointmentId,
            testType: "G"
        }).populate('appointmentId');


        //make previously selected appointment timeslot available
        await Appointment.findByIdAndUpdate(user.appointmentId, {
            isTimeSlotAvailable: true
        });

        //make newly selected appointment timeslot unavailable
        await Appointment.findByIdAndUpdate(appointmentId, {
            isTimeSlotAvailable: false
        });

        const updatedUserInfo = await User.findById(loggedInId).populate('appointmentId');
        const updatedAppointmentInfo = await Appointment.find({ isTimeSlotAvailable: true });

        res.render('gTest', { userInfo: updatedUserInfo, appointmentInfo: updatedAppointmentInfo });
    } catch (e) {
        console.log(e);
    }
}

module.exports = { gTest, submitG };

