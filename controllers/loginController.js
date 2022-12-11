const User = require('../models/User');
const bcrypt = require('bcrypt');

const login = (req, res) => {
    res.render('login', { userValid: null, username: null, password: null });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username: username }, async (error, user) => {
        if (user) {
            let same = await bcrypt.compare(password, user.password);
            if (same) { //if passwords match
                req.session.userId = user._id;
                req.session.userType = user.userType;
                req.session.isLoggedIn = true;
                return res.redirect('/');
            }
        }

        console.log("User not found");
        return res.render('login', { userValid: false, username, password });
    })
}

module.exports = { login, loginUser };