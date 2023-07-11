const UserModel = require('./users-model');

async function validateUserId(req, res, next) {
    try {
        const user = await UserModel.getUserById(req.params.id);
        if (user) {
            req.user = user;
            next()
        } else {
            res.status(404).json({ message: "User is not defined" });
        };
    } catch (error) {
        next(error);
    };
};

module.exports = {
    validateUserId
}