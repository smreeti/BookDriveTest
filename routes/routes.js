const express = require('express');
const router = express.Router();
const { dashboard,
    g2Test,
    gTest,
    signUp,
    signUpUser,
    login,
    loginUser,
    submitG2,
    submitG,
    logout,
    appointment,
    saveAppointment,
    examiner,
    fetchUserDetail,
    submitExaminerReview,
    viewCandidates,
    viewResult
} = require('../controllers/controllers.js');

const authMiddlewareForDriver = require('../middlewares/authMiddlewareForDriver.js');
const authMiddlewareForAdmin = require('../middlewares/authMiddlewareForAdmin.js');
const authMiddlewareForExaminer = require('../middlewares/authMiddlewareForExaminer.js');
const redirectIfAuthenticatedMiddleware = require('../middlewares/redirectIfAuthenticatedMiddleware.js');

//API end points and their corresponding ejs pages to navigate
router.get('/', dashboard);
router.get('/g2Test', authMiddlewareForDriver, g2Test);
router.get('/gTest', authMiddlewareForDriver, gTest);

router.get('/signUp', redirectIfAuthenticatedMiddleware, signUp);
router.post('/signUpUser', redirectIfAuthenticatedMiddleware, signUpUser);

router.get('/login', redirectIfAuthenticatedMiddleware, login);
router.post('/loginUser', redirectIfAuthenticatedMiddleware, loginUser);

router.post('/submitG2', authMiddlewareForDriver, submitG2);
router.post('/submitG', authMiddlewareForDriver, submitG);

router.get('/appointment', authMiddlewareForAdmin, appointment);
router.post('/saveAppointment', authMiddlewareForAdmin, saveAppointment);

router.get('/examiner', authMiddlewareForExaminer, examiner);
router.get('/examiner/detail/:userId', authMiddlewareForExaminer, fetchUserDetail);
router.post('/examiner/submitExaminerReview', authMiddlewareForExaminer, submitExaminerReview);

router.get('/candidates', authMiddlewareForAdmin, viewCandidates);
router.get('/viewResult', viewResult);

router.get('/logout', logout);

module.exports = router;