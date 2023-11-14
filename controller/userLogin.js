const User = require("../models/user.js");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
    let { username, password } = req.body;

    User.findOne({ username })
    .then((userInfo) => {
        if (userInfo) {
            console.log("[userLogin.js] user find result: ", userInfo);

            const isSame = bcrypt.compareSync(password, userInfo.password);
            if (isSame) {
                req.session.userId = userInfo._id;
                req.session.userType = userInfo.user_type;
                console.log("Session added: ", userInfo._id);
                res.redirect("/");
            } else {
                console.log("Form Password: " + password);
                console.log("Model Password: " + userInfo.password);
                console.log("PASSWORD NOT MATCH");
                req.flash("validationErrors", ["password is wrong"]);
                req.flash("loginInfo", {username, password})
                res.redirect("/login");
            }
        } else {
            console.log("login, user find no result");
            req.flash("validationErrors", ["username is not exsit"]);
            req.flash("loginInfo", {username, password})
            res.redirect("/login");
        }
    }).catch(error => {
        console.log("[userLogin.js] user find error: ", error.message);
        res.redirect("/login");
    })
}