const router = require('express').Router();
const UserModel = require('./users-model');
const { validateUserId } = require('./users-middleware');

router.get('/', async (req, res, next) => {
    const allUsers = await UserModel.getAll();
    res.json(allUsers);
});

router.get('/:id', validateUserId, async (req, res, next) => {
    res.json(req.user);
});

// to do : router.delete('/:id') kullanıcı silme

// to do: router.put('/:id') kullanıcı güncelleme

module.exports = router;