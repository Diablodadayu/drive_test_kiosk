const express = require("express");
const bodyParser = require('body-parser');
const formData = require("express-form-data");
const os = require("os");
const expressSession = require('express-session');
const flash = require('connect-flash');
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5600;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true}))
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
app.use(formData.parse(options));

app.use(expressSession({
    secret: 'express session secret',
    resave:true,
    saveUninitialized:true
}))

app.use('*',(req,res,next)=>{
    res.locals.loggedIn = req.session.userId;
    res.locals.loggedInType = req.session.userType;
    next()
});

app.use(flash());


app.use("/", require("./router/commonRoute.js"));
app.use("/g", require("./router/gRoute.js"));
app.use("/g2", require("./router/g2Route.js"));
app.use("/appointment", require("./router/appointmentRoute.js"));

const connString = "mongodb+srv://tyu3786:19871002mn@cluster0terence.65rjbtd.mongodb.net/";

async function connect() {
    try {
        await mongoose.connect(connString);
        console.log("connect successfully");
    } catch(e) {
        console.log("connect fail: " + e);
    }
}

connect();

app.listen(port, ()=>{
    console.log(`Application is listening on ${port}`);
});