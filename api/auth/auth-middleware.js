const UserModel = require('../../api/users/users-model');
const bcrypt = require("bcryptjs");
const tokenHelper = require('../../helper/token-helper.js')
const jwt = require("jsonwebtoken");

const checkRegisterPayload = async (req, res, next) => {
    try {
        const { name, nick, email, password } = req.body;
        if (!name || !name.trim() || name.trim().length <= 3) {
            next({ status: 400, message: "name, must be greater than 3 characters!..." });
        } else if (name.trim().length > 128) {
            next({ status: 400, message: "name, cannot exceed 128 characters!..." });
        } else if (!nick || !nick.trim() || nick.length <= 3) {
            next({ status: 400, message: "nick, must be greater than 3 characters!..." });
        } else if (nick.trim().length > 128) {
            next({ status: 400, message: "nick, cannot exceed 128 characters!..." });
        } else if (!email || !isValidEmail(email)) {
            next({ status: 400, message: "please enter a valid e-mail!..." });
        } else if (!password || !password.trim() || password.length <= 3) {
            next({ status: 400, message: "password, must be greater than 3 characters!..." });
        } else if (password.trim().length > 128) {
            next({ status: 400, message: "password, cannot exceed 128 characters!..." });
        } else {
            next();
        };
    } catch (err) {
        next(err);
    };
};

const checkLoginPayload = async (req, res, next) => {
    const { nick, email, password } = req.body;
    if (nick || email && password) {
        next();
    } else {
        res.status(404).json({ message: "Please check your informations." })
    };
    try {
    } catch (err) {
        next(err);
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
    } catch (err) {
        next(err);
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
    } catch (err) {
        next(err);
    };
};

const restricted = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            res.status(401).json({ message: "Token is required..." });
        } else {
            const tokenCash = await tokenHelper.verifyCashToken(token);
            // const tokenCash = tokenHelper.verifyCashToken(token); await ekledim............................................................
            if (tokenCash) {
                jwt.verify(token, tokenHelper.JWT_SECRET, async (err, decodedToken) => {
                    if (err) {
                        res.status(401).json({ message: "Token is invalid..." });
                    } else {
                        req.decodedToken = decodedToken;
                        next();
                    }
                });
            } else {
                res.status(401).json({ message: "Token is expired..." });
            };
        };
    } catch (err) {
        next(err);
    };
};

const checkRole = (existrole) => (req, res, next) => {
    try {
        if (req.decodedToken.role == existrole || req.decodedToken.role == "admin") {
            next()
        } else {
            next({ status: 403, message: "You are not authorized!.." });
        };
    } catch (err) {
        next(err);
    };
};

const onlyForExistingUser = (req, res, next) => {
    try {
        const { id } = req.params
        if (req.decodedToken.user_id == id || req.decodedToken.role == "admin") {
            next()
        } else {
            next({ status: 403, message: "You are not authorized!.." })
        };
    } catch (err) {
        next(err);
    };
};

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

module.exports = {
    checkRegisterPayload,
    checkLoginPayload,
    userNickAndMailExist,
    loginValidate,
    restricted,
    checkRole,
    onlyForExistingUser,
    isValidEmail
};