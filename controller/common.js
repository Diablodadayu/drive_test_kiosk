module.exports = {
    index: (req, res) => {
        console.log("Welcome to Dashboard page");
        res.render("index");
    },
    login: (req, res) => {
        console.log("Welcome to Login page");
        res.render("login", {
            register: null, 
            errors: req.flash('validationErrors'),
            login: req.flash('loginInfo')[0]
        });
    },
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    },
    register: (req, res)=>{
        const registerInfo = req.flash('registerInfo')[0] 
        res.render("login", {
            register: registerInfo || true,
            errors: req.flash('validationErrors'),
            login: null
        });
    },
};
