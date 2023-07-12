const router = require("express").Router();
const { checkRegisterPayload, userNickAndMailExist, checkLoginPayload, loginValidate } = require("./auth-middleware");
const UserModel = require("../../api/users/users-model");
const bcrypt = require("bcryptjs");
const tokenHelper = require("../../helper/token-helper");

router.post('/register', checkRegisterPayload, userNickAndMailExist, async (req, res, next) => {
    try {
        let { name, nick, email, password, role } = req.body
        const hashedPassword = bcrypt.hashSync(password, 8);

        let newUser = {
            name: name,
            nick: nick,
            email: email,
            password: hashedPassword,
            role: role,
        };

        await UserModel.insert(newUser);
        res.status(201).json({ message: `Welcome to twitter, dear ${name}...` });
    } catch (error) {
        next({ status: 400, message: "Create user error..." }); // to do: bu şekilde error middleware'a yolculuk yap. Diğer tüm middleware'larda da err middleware'a obje gönder.
    };
});

router.post('/login', checkLoginPayload, loginValidate, (req, res, next) => { // to do check login payload
    try {
        let tokenPayload = {
            id: req.currentUser.user_id,
            name: req.currentUser.name,
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
