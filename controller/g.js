const User = require("../models/user.js");

const g = (req, res) => {
    console.log("Welcome to G_Test page");
    console.log("[g.js] begin to find user by id: ", req.session.userId);

    User.findById(req.session.userId).then((userInfo)=>{
        if (!userInfo) {
            console.log("[g.js] g::user.findById return empty");
            res.redirect("/");
            return;
        }
        if (!userInfo.license_no) {
            req.flash("validationErrors", ["Please register G2 firstly"]);
            res.redirect("/g2");
            return
        }
        
        res.render("g", {userInfo});
    }).catch(error=>{
        console.log("[g.js] g::user.findById return error: ", error.message);
        res.redirect("/");
    }) 
};

const updateUser = async (req, res) => {
    try {
        let result = await User.updateOne(
            { _id: req.session.userId },
            { $set: req.body }
        );
        console.log("[g.js] updateUser::user.updateOne result: ", result);
        if (result.matchedCount == 1) {
            res.send({ code: 0 });
        } else {
            res.send({ code: 1 });
        }
    } catch(error) {
        console.log("[g.js] updateUser::user.updateOne error: ", error.message);
        return res.send({ code: 1000 });
    };
    
};

module.exports = {
    g,
    updateUser,
};
