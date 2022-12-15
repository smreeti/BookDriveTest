const User = require('../models/User.js');

module.exports = async (req, res, next) => {
    const userId = req.session.userId;
    const userType = req.session.userType;

    if (!userId && !userType) {
        console.log("User not present in session");
        return res.redirect('/');
    } else {

        if (userType != 'Admin') {
            console.log("User is not Admin type");
            return res.redirect('/');
        } else {
            const user = await User.findById(userId);
            if (!user) {
                console.log("User not present in the database")
                return res.redirect('/');
            }
        }
    }

    next();
}
