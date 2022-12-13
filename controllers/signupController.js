const User = require('../models/User');

const signUp = (req, res) => {
    let username = "";
    let password = "";
    const data = req.flash('data')[0];

    if (typeof data != "undefined") {
        username = data.username;
        password = data.password;
    }

    return res.render('signup', {
        passwordError: false,
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    });
}

const signUpUser = async (req, res) => {
    const { username, password, repassword } = req.body;

    if (password != repassword) {
        return res.render('signup', {
            passwordError: true, errors: req.flash('validationErrors'), username, password
        });
    }

    try {
        await User.create(req.body);
        return res.redirect('/login');
    } catch (error) {
        const validationErrors = Object.keys(error.errors).map(key => {
            return error.errors[key].message
        });
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        return res.render('signup', {
            passwordError: false,
            errors: req.flash('validationErrors'),
            username: username,
            password: password
        });
    }
}

module.exports = { signUp, signUpUser };