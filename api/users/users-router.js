const router = require('express').Router();
const UserModel = require('./users-model');
const { validateUserId, validateUserIdAdmin } = require('./users-middleware');
const { checkRole, onlyForExistingUser } = require('../auth/auth-middleware');
const bcrypt = require("bcryptjs");


router.get('/admin', checkRole("admin"), async (req, res, next) => {
    const allUsersOnlyAdmin = await UserModel.getAllOnlyAdmin();
    res.json(allUsersOnlyAdmin);
});

router.get('/admin/:id', checkRole("admin"), validateUserIdAdmin, async (req, res, next) => {
    res.json(req.user);
});

router.delete('/:id', validateUserId, checkRole("user"), onlyForExistingUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const isDeleted = await UserModel.removeUser(id);
        if (isDeleted) {
            res.json({ message: `User id ${id}, deleted...` })
        } else {
            res.status(400).json({ message: `Error in deleting User id ${id}!..` })
        };
    } catch (err) {
        next(err);
    };
});

router.get('/', checkRole("user"), async (req, res, next) => {
    const allUsers = await UserModel.getAll();
    res.json(allUsers);
});

router.get('/:id', checkRole("user"), validateUserId, async (req, res, next) => {
    res.json(req.user);
});

router.put('/:id', validateUserId, checkRole("user"), onlyForExistingUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = {
            name: req.body.name,
            email: req.body.email,
            nick: req.body.nick,
            password: req.body.password,
        };
        let insertedUser = {};
        for (const key in updatedUser) {
            if (updatedUser[key]) {
                insertedUser[key] = updatedUser[key]
            };
        };
        if (updatedUser.password) {
            insertedUser.password = bcrypt.hashSync(req.body.password, 8);
        };
        try {
            const updated = await UserModel.update(id, insertedUser);
            if (updated) {
                res.json({ message: `User id ${id} is updated... Due to the change of user information, the relevant user must login again...` })
            } else {
                res.status(400).json({ message: `Error in updating User id ${id}!..` })
            };
        } catch (err) {
            res.status(400).json({ message: `Error in updating User id ${id}!..` })
        }
    } catch (err) {
        next(err);
    };
});

module.exports = router;