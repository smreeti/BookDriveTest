const User = require('../models/User');

const viewResult = async (req, res) => {
    const userInfo = await User.findById(req.session.userId);
    let userResult;

    if (userInfo?.appointmentId) {
        userResult = userInfo?.result || "unpublished";
    } else {
        userResult = "Appointment not booked yet!";
    }

    const examinerComment = userInfo?.comments || null;
    return res.render('result', { userResult, examinerComment });
}

module.exports = { viewResult };
