const Appointment = require('../models/Appointment');
const User = require('../models/User');

const appointment = (req, res) => {
    res.render('appointment', { exitsErrors: req.flash('exitsErrors') });
}

const saveAppointment = async (req, res) => {
    const { appointmentDate, appointmentTime } = req.body;

    try {
        const appointmentInfoExists = await Appointment.find({
            appointmentDate, appointmentTime
        });

        if (appointmentInfoExists.length > 0) {
            console.log("appointmentInfoExists", true);
            req.flash('exitsErrors', { exitsErrors: ' The selected appointment date and time already exits. Please try unique values.' });
            res.render('appointment', { exitsErrors: req.flash('exitsErrors') });
        } else {
            await Appointment.create(req.body);
            res.render('appointment', { exitsErrors: req.flash('exitsErrors'), });
        }
    } catch (e) {
        console.log(e);
    }
}

const viewCandidates = async (req, res) => {
    const resultType = req.query.resultType;

    let filteredUsers;
    //show only those users who is a Driver Type and whose result has been released by Examiner  
    if (resultType == "" || resultType == undefined) { //for all
        filteredUsers = await User.find({
            'result': { $ne: null },
            'userType': 'Driver',
            'testType': { $ne: null }
        });
    } else {
        filteredUsers = await User.find({ //for Pass/Fail result type
            'result': { $ne: null },
            'userType': 'Driver',
            'testType': { $ne: null },
            'result': resultType
        });
    }

    return res.render('candidates', { userInfo: filteredUsers });
}

module.exports = {  
    appointment,
    saveAppointment,
    viewCandidates
};
