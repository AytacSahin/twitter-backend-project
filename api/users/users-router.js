const router = require('express').Router();
const UserModel = require('./users-model');
const { validateUserId, validateUserIdAdmin } = require('./users-middleware');
const { checkRole } = require('../auth/auth-middleware');
const generateToken = require('../../helper/token-helper.js')

// role: admin
router.get('/admin', checkRole("admin"), async (req, res, next) => {
    const allUsersOnlyAdmin = await UserModel.getAllOnlyAdmin();
    res.json(allUsersOnlyAdmin);
});

router.get('/admin/:id', checkRole("admin"), validateUserIdAdmin, async (req, res, next) => {
    res.json(req.user);
});

router.delete('/admin/:id', checkRole("admin"), validateUserIdAdmin, async (req, res, next) => {
    try {
        const { id } = req.params;
        const isDeleted = await UserModel.removeUserOnlyAdmin(id);
        if (isDeleted) {
            res.json({ message: `User id ${id}, deleted...` })
        } else {
            res.status(400).json({ message: `Error in deleting User id ${id}!..` })
        };
    } catch (err) {
        next(err);
    };
});

// role: user & admin
router.get('/', checkRole("user"), async (req, res, next) => {
    const allUsers = await UserModel.getAll();
    res.json(allUsers);
});

router.get('/:id', checkRole("user"), validateUserId, async (req, res, next) => {
    res.json(req.user);
});

router.put('/:id', validateUserId, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, nick, role, password } = req.body
        const updatedUser = {
            name: name,
            email: email,
            nick: nick,
            role: role,
            password: password,
        };
        let insertedUser = {};
        for (const key in updatedUser) {
            if (updatedUser[key]) {
                insertedUser[key] = updatedUser[key]
            }
        }
        const updated = await UserModel.update(id, insertedUser);
        if (updated) {
            res.json({ message: `User id ${id}, updated... User needs to login again...` })
        } else {
            res.status(400).json({ message: `Error in updating User id ${id}!..` })
        };
    } catch (err) {
        next({ status: 400, message: "Update error..." });
    };
});

module.exports = router;