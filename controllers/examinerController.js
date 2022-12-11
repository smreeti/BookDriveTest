const User = require('../models/User');

const examiner = async (req, res) => {
    const testType = req.query.testType;

    let filteredUsers = await User.find({ 'appointmentId': { $ne: null }, 'userType': 'Driver' }).populate('appointmentId');

    if (testType == "G2") {
        filteredUsers = filteredUsers.filter(user => user.testType === "G2");
    } else if (testType == "G") {
        filteredUsers = filteredUsers.filter(user => user.testType === "G");
    }

    return res.render('examiner', { userInfo: filteredUsers });
}

const fetchUserDetail = async (req, res) => {
    const userInfo = await User.findById(req.params.userId);
    return res.render('examinerDetail', { userInfo: userInfo });
}

const submitExaminerReview = async (req, res) => {
    const { userId, result, comments } = req.body;
    await User.findByIdAndUpdate(userId,
        { result, comments });
    const updatedUserInfo = await User.findById(userId);
    return res.render('examinerDetail', { userInfo: updatedUserInfo });
}

module.exports = { examiner, fetchUserDetail, submitExaminerReview };