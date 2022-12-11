const { dashboard } = require('./dashboardController.js');
const { g2Test, submitG2 } = require('./g2Controller.js');
const { gTest, submitG } = require('./gController.js');
const { signUp, signUpUser } = require('./signupController.js');
const { login, loginUser } = require('./loginController.js');
const { logout } = require('./logoutController.js');
const { appointment, saveAppointment, viewCandidates } = require('./adminController.js');
const { examiner, fetchUserDetail, submitExaminerReview } = require('./examinerController.js');
const { viewResult } = require('./driverResultController.js');

module.exports = {
    dashboard,
    g2Test,
    gTest,
    submitG2,
    submitG,
    signUp,
    signUpUser,
    login,
    loginUser,
    logout,
    appointment,
    saveAppointment,
    examiner,
    fetchUserDetail,
    submitExaminerReview,
    viewCandidates,
    viewResult
};
