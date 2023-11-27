const appointmentController = require("../controller/appointmentC.js");
const authAdminMiddleware = require("../middleware/authAdminMiddleware.js")
const express = require("express");
const route = express.Router();

route.get("/", authAdminMiddleware, appointmentController.appointment);
route.post("/create", authAdminMiddleware, appointmentController.create);
route.post("/query", appointmentController.query);

module.exports = route;