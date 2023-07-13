const UserModel = require('../../api/users/users-model');
const bcrypt = require("bcryptjs");
const tokenHelper = require('../../helper/token-helper.js')
const jwt = require("jsonwebtoken");

const checkRegisterPayload = async (req, res, next) => {
    const { name, nick, email, password } = req.body;
    if (
        !name || !nick || !email || !password ||
        name.trim().length > 128 || nick.trim().length > 128 || email.trim().length > 128 || password.trim().length > 128 ||
        name.trim().length < 3 || nick.trim().length < 3 || email.trim().length < 3 || password.trim().length < 3
    ) {
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
    const { nick, email, password } = req.body;
    if (nick || email && password || nick.length > 128 || email.length > 128 || password.length > 128) {
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
        const { email, nick } = req.body;
        let userMail;
        let userNick;
        if (email) { userMail = await UserModel.getUserByMail(email) };
        if (nick) { userNick = await UserModel.getUserByNick(nick) };
        const user = userMail || userNick;
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

const protected = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).json({ message: "Token gereklidir" });
        } else {
            jwt.verify(token, tokenHelper.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    // await tokenHelper.deleteFromBlackListToken(token)
                    res.status(401).json({ message: "Token geçersiz" });
                } else {
                    req.decodedToken = decodedToken;
                    next();
                };
            });
        };
    } catch (error) {
        next(error);
    };
};

const checkRole = (existrole) => (req, res, next) => {
    if (req.decodedToken.role == existrole || req.decodedToken.role == "admin") {
        next()
    } else {
        next({ status: 403, message: "Buraya giriş izniniz yok!.." })
    };
};

module.exports = {
    checkRegisterPayload,
    checkLoginPayload,
    userNickAndMailExist,
    loginValidate,
    protected,
    checkRole
}