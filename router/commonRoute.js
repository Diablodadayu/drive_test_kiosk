const express = require("express");
const route = express.Router();
const commonController = require("../controller/common.js");
const userLoginController = require("../controller/userLogin.js");
const userRegisterController = require("../controller/userRegister.js");
const redirectIfAuthenticatedMiddleware = require('../middleware/redirectIfAuthenticatedMiddleware')

route.get(["/", "/dashboard"], commonController.index);
route.get("/login", redirectIfAuthenticatedMiddleware, commonController.login);
route.get("/logout", commonController.logout);
route.get("/register", redirectIfAuthenticatedMiddleware, commonController.register);

route.post("/user/register", userRegisterController);
route.post("/user/login", userLoginController);

module.exports = route;