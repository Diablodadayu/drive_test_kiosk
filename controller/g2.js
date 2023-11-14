const User = require("../models/user.js");

const g2 = (req, res)=>{
    console.log("Welcome to G2_Test page");
    console.log("[g2.js] begin to find user by id: ", req.session.userId);

    User.findById(req.session.userId).then((userInfo)=>{
        if (!userInfo) {
            console.log("[g2.js] find user by id return empty");
            return;
        }
        
        res.render("g2", {userInfo, errors: req.flash('validationErrors')});
    }).catch(error=>{
        console.log("[g2.js] find user by id return error: ", error.message);
    }) 

}

const register = (req, res)=>{
    let userId = req.session.userId;
    
    let update = {    
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        license_no: req.body.licenseNo,
        age: req.body.age,
        car_details: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            platno: req.body.platno
        }
    }
    
    User.findByIdAndUpdate(userId, update)
    .then(data=>{
        console.log("register succeed: ", data);
        res.send({code: 0});
    })
    .catch(error=>{
        console.log("register fail: ", error.message);
        res.send({code: 1});
    })
    
}

module.exports = {
    g2,
    register
}