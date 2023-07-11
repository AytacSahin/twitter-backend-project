const UserModel = require('../../api/users/users-model');
const bcrypt = require("bcryptjs");

const checkRegisterPayload = async (req, res, next) => {
    const { name, nick, email, password } = req.body;
    if (!name || !nick || !email || !password || name.length > 128 || nick.length > 128 || email.length > 128 || password.length > 128) {
        res.status(400).json({ message: "Please check your informations." })
    } else {
        next();
    };
    try {
    } catch (error) {
        next(error);
    };
};

const checkLoginPayload = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (name || email && password) {
        next();
    } else {
        res.status(404).json({ message: "Please check your informations." })
    };
    try {
    } catch (error) {
        next(error);
    };
};

const userNickAndMailExist = async (req, res, next) => {
    try {
        const { nick, email } = req.body;
        const isExistNick = await UserModel.getUserByNick(nick);
        const isExistMail = await UserModel.getUserByMail(email);
        if (!isExistNick && !isExistMail) {
            next()
        } else {
            res.status(404).json({ message: `Please change your ${isExistNick ? "nick" : "" || isExistMail ? "mail" : ""} and try again...` });
        };
    } catch (error) {
        next(error);
    };
};

const loginValidate = async (req, res, next) => {
    try {
        const { email, name } = req.body;
        let userMail;
        let userName;
        if (email) { userMail = await UserModel.getUserByMail(email) };
        if (name) { userName = await UserModel.getUserByName(name) };
        const user = userMail || userName;
        if (!user) {
            res.status(404).json({ message: "No user found with the information you provided... or can try to login :)" });
        } else {
            let passwordCheck = bcrypt.compareSync(req.body.password, user.password)
            if (passwordCheck) {
                req.currentUser = user;
                next();
            } else {
                res.status(400).json({ message: "Password is incorrect... Please try again :)" })
            };
        };
    } catch (error) {
        next({ status: 400, message: "Login error..." });
    };
};

const checkRole = (role) = (req, res, next) => {
    try {
        //  to do: checkRole Middleware eklenecek...
    } catch (error) {
        next(error);
    }
};

module.exports = {
    checkRegisterPayload,
    loginValidate,
    userNickAndMailExist,
    checkRole,
    checkLoginPayload
}