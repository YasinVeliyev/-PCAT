const User = require("../models/userModel");

exports.registerUser = async (req, res, next) => {
    let { firstname, lastname, email, username, password, passwordconfirm } = req.body;
    const user = await User.create({ firstname, lastname, email, username, password, passwordconfirm });
    res.redirect("/");
};

exports.loginUser = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });

    if (user && (await user.checkPassword(req.body.password))) {
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect("/login");
};
