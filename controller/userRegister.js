const User = require("../models/user.js");

module.exports = (req, res) => {
    let { username, password, user_type } = req.body;

    User.create({
        username,
        password,
        user_type,
    })
    .then((data) => {
        console.log("user register success: ", data);
        res.json({
            code: 0,
            data,
        });
    })
    .catch((error) => {
        console.log("user regisetr failed: ", error.message);

        const validationErrors = Object.keys(error.errors).map(
            (key) => error.errors[key].message
        );
        req.flash("validationErrors", validationErrors);
        req.flash("registerInfo", {username, password, user_type})
        res.json({
            code: 1,
            error: error,
        });
    });
}