const express = require("express");
const g2Controller = require("../controller/g2.js");
const route = express.Router();

route.get("/", g2Controller.g2);
route.post("/register", g2Controller.register);

module.exports = route;