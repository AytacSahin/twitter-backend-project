const UserModel = require('./users-model');

async function validateUserIdAdmin(req, res, next) {
    try {
        const user = await UserModel.getUserByIdOnlyAdmin(req.params.id);
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
    validateUserIdAdmin,
    validateUserId
}