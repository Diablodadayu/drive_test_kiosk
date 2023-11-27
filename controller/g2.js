const mongoose = require("mongoose");
const User = require("../models/user.js");
const Appointment = require("../models/appointment.js")

const g2 = (req, res)=>{
    console.log("Welcome to G2_Test page");
    console.log("[g2.js] begin to find user by id: ", req.session.userId);

    User.findById(req.session.userId).populate("appointment").then((userInfo)=>{
        if (!userInfo) {
            console.log("[g2.js] g2::user.findById return empty");
            res.redirect("/");
            return;
        }
        console.log("[g2.js] g2::user.findById return: ", userInfo);

        res.render("g2", {userInfo, errors: req.flash('validationErrors')});
    }).catch(error=>{
        console.log("[g2.js] g2::user.findById return error: ", error.message);
        res.redirect("/");
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
        },
        appointment: new mongoose.Types.ObjectId(req.body.appointmentId)
    }
    
    User.findByIdAndUpdate(userId, update)
    .then(data=>{
        console.log("[g2.js] register::user.findByIdAndUpdate succeed: ", data);
        Appointment.findByIdAndUpdate(req.body.appointmentId, {isTimeSlotUnavailable: true})
        .then(result=>{
            console.log("[g2.js] register::appointment.findByIdAndUpdate succeed: ", result);
            res.send({code: 0});
        })
    })
    .catch(error=>{
        console.log("[g2.js] register fail: ", error.message);
        res.send({code: 1});
    })
    
}

module.exports = {
    g2,
    register
}