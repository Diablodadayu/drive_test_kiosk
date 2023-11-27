const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        default: "",
    },
    last_name: {
        type: String,
        required: true,
        default: "",
    },
    license_no: {
        type: String,
        required: true,
        default: "",
    },
    age: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        required: true,
        enum: ["driver", "examiner", "admin"]
    },
    car_details: {
        make: String,
        model: String,
        year: String,
        platno: String
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Appointment',
        required: true,
    }
});

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function(next) {
    const user = this;

    user.password = bcrypt.hashSync(user.password, 10);
    next();
})

const User = mongoose.model("User", UserSchema);
module.exports = User;