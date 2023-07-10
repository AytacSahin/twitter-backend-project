const router = require("express").Router();

router.post('/register', (req, res, next) => {
    try {
        res.json({ message: "register" });
    } catch (error) {
        next(error);
    };
});

router.post('/login', (req, res, next) => {
    try {
        res.json({ message: "login" });
    } catch (error) {
        next(error);
    };
});

router.post('/password/reset', (req, res, next) => {
    try {
        res.json({ message: "password/reset" });
    } catch (error) {
        next(error);
    };
});

router.get('/logout', (req, res, next) => {
    try {
        res.json({ message: "logout" });
    } catch (error) {
        next(error);
    };
});

module.exports = router;
