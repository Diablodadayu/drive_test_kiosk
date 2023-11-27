const User = require("../models/user");

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userId);

        if (user?.user_type == "driver") {
            return next();
        }

        return res.redirect("/");
    } catch (error) {
        console.log("[authDriverMiddleware.js] Erro in Mid-Ware ::" + error.message);
        return res.redirect("/");
    }
};
