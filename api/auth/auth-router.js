const router = require("express").Router();
const { checkRegisterPayload, userNickAndMailExist, checkLoginPayload, loginValidate } = require("./auth-middleware");
const UserModel = require("../../api/users/users-model");
const bcrypt = require("bcryptjs");
const tokenHelper = require("../../helper/token-helper");

router.post('/register', checkRegisterPayload, userNickAndMailExist, async (req, res, next) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let newUser = {
            name: req.body.name.trim(),
            nick: req.body.nick.trim(),
            email: req.body.email.trim(),
            password: hashedPassword
        };
        await UserModel.insert(newUser);
        res.status(201).json({ message: `Welcome to twitter, dear ${newUser.name}...` });
    } catch (error) {
        next(error);
    };
});

router.post('/login', checkLoginPayload, loginValidate, (req, res, next) => { // to do check login payload
    try {
        let tokenPayload = {
            user_id: req.currentUser.user_id,
            nick: req.currentUser.nick,
            role: req.currentUser.role
        }
        const token = tokenHelper.generateToken(tokenPayload);
        res.json({ message: `Welcome back, dear ${req.currentUser.name}...`, token: token });
    } catch (error) {
        next(error);
    };
});

// router.post('/password/reset', (req, res, next) => {
//     try {
//         res.json({ message: "password/reset" });
//     } catch (error) {
//         next(error);
//     };
// });

// router.get('/logout', (req, res, next) => {
//     try {
//         res.json({ message: "logout" });
//     } catch (error) {
//         next(error);
//     };
// });

module.exports = router;
