const md5 = require("md5");

const User = require("../models/user.js");

const g = (req, res) => {
    console.log("Welcome to G_Test page");

    User.findById(req.session.userId).then((userInfo)=>{
        if (!userInfo) {
            console.log("[g.js] find user by id return empty");
            return;
        }
        if (!userInfo.license_no) {
            req.flash("validationErrors", ["Please register G2  firstly"]);
            res.redirect("/g2");
            return
        }
        
        res.render("g", {userInfo});
    }).catch(error=>{
        console.log("[g.js] find user by id return error: ", error.message);
    }) 
};

const updateUser = async (req, res) => {
    try {
        let result = await User.updateOne(
            { _id: req.session.userId },
            { $set: req.body }
        );
        console.log("[g.js] updateUser result: ", result);
        if (result.matchedCount == 1) {
            res.send({ code: 0 });
        } else {
            res.send({ code: 1 });
        }
    } catch(error) {
        console.log("[g.js] updateUser error: ", error.message);
        return res.send({ code: 1000 });
    };
    
};

module.exports = {
    g,
    updateUser,
};
