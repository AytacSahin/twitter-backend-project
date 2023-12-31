const CommentModel = require('./comments-model');

const checkCommentIsExist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const comment = await CommentModel.getCommentByCommentId(id);
        if (!comment || comment.length == 0) {
            res.status(404).json({ message: `Comment is not exist...` })
        } else {
            req.comment = comment;
            next();
        }
    } catch (err) {
        next(err);
    };
};

const whoIsComment = async (req, res, next) => {
    try {
        let UserId = await CommentModel.findUserIdByCommentId(req.params.id)
        if (req.decodedToken.user_id == UserId.user_id || req.decodedToken.role == "admin") {
            next();
        } else {
            res.status(403).json({ message: "You are not authorized!..." })
        }
    } catch (err) {
        next(err);
    };
};

async function checkCommentCreatePayload(req, res, next) {
    try {
        let { id } = req.params;
        const newComment = req.body.content; // user_id tokendan alınacak
        if (newComment) {
            let comment = {
                user_id: Number(req.decodedToken.user_id),
                tweet_id: Number(id),
                content: newComment
            };
            req.newComment = comment;
            next()
        } else {
            res.status(400).json({ message: "Please text a type some content!..." });
        }
    } catch (err) {
        next(err);
    };
};

module.exports = {
    checkCommentIsExist,
    whoIsComment,
    checkCommentCreatePayload
}