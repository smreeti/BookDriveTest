require("dotenv").config();
const express = require('express');
const app = express();

const route = require('./routes/routes.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const flash = require('connect-flash');

/* Declaring global variables that will be accessible from all EJS files */
global.userId = '';
global.userType = '';
global.isLoggedIn = false;

/* middleware for serving static files to Express app */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

/*Use express session to store the information in the browser*/
app.use(expressSession({
    secret: process.env.SESSION_SECRET
}))

app.use("*", (req, res, next) => {
    userId = req.session.userId;
    userType = req.session.userType;
    isLoggedIn = req.session.isLoggedIn;
    next();
})

/*To Flush error messages from session*/
app.use(flash());
app.use(route);
app.use((req, res) => res.render('notfound')); //creating a 404 page for non-existing route

mongoose.connect(process.env.MONGO_URL,
    { useUnifiedTopology: true, useNewUrlParser: true }, (error) => {
        if (error) {
            console.log(error);
            console.log("Connection failed");
        } else {
            console.log("Connected to the database");
        }
    });

app.listen(5600, () => {
    console.log("App is listening to port 5600");
})
