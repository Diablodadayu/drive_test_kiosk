const express = require("express");
const route = express.Router();
const gController = require("../controller/g.js");

route.get('/', gController.g);
route.post("/update", gController.updateUser);


module.exports = route;