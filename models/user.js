const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true,
        default: "",
    },
    last_name: {
        type: String,
        require: true,
        default: "",
    },
    license_no: {
        type: String,
        require: true,
        default: "",
    },
    age: {
        type: Number,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    user_type: {
        type: String,
        require: true,
        enum: ["driver", "examiner", "admin"]
    },
    car_details: {
        make: String,
        model: String,
        year: String,
        platno: String
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