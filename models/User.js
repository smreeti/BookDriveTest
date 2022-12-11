const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
let uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    firstName: {
        type: String,
        default: 'default',
        required: [true, 'Please provide first name']
    },
    lastName: {
        type: String,
        default: 'default',
        required: [true, 'Please provide last name']
    },
    licenseNumber: {
        type: String,
        default: 'default',
        required: [true, 'Please provide license number']
    },
    age: {
        type: Number,
        default: '0',
        required: [true, 'Please provide age']
    },
    dob: {
        type: Date,
        default: new Date(),
        required: [true, 'Please provide date of birth']
    },
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    userType: {
        type: String,
        required: [true, 'Please provide user type']
    },
    carDetails: {
        make: {
            type: String,
            default: 'default',
            required: [true, 'Please provide make']
        },
        model: {
            type: String,
            default: 'default',
            required: [true, 'Please provide model']
        },
        year: {
            type: Number,
            default: '0',
            required: [true, 'Please provide year']
        },
        plateNumber: {
            type: String,
            default: 'default',
            required: [true, 'Please provide plate number']
        }
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    },
    testType: String,
    result: String,
    comments: String
});

UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})

UserSchema.plugin(uniqueValidator);

const User = mongoose.model('User', UserSchema);

module.exports = User;

