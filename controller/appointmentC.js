const AppointmentModel = require("../models/appointment")

module.exports = {
    appointment: (req, res) => {
        console.log("Welcome to Appointment page");
        res.render("appointment");
    },
    create: async (req, res) =>{
        console.log("begin create");
        try {
            let result = await AppointmentModel.create(req.body);
            console.log("[appointmentC.js] create::AppointmentModel.create result: ", result);
            return res.json({
                code: 0,
            });
        } catch (err) {
            console.log(err.message);
            return res.json({
                code: 1,
                error: err
            });
        }
    },
    query: async (req, res) =>{
        console.log("begin create");
        try {
            let date = req.body.date;
            date = new Date(date);
            let result = await AppointmentModel.find({date});
            console.log("[appointmentC.js] query::AppointmentModel.find result: ", result);
            return res.json({
                code: 0,
                data: result
            });
        } catch (err) {
            console.log(err.message);
            return res.json({
                code: 1,
                error: err
            });
        }
    },
};
