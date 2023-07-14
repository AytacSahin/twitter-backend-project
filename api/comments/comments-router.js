const router = require('express').Router();
const CommentModel = require('./comments-model');
const { checkRole } = require('../auth/auth-middleware');
const { checkCommentIsExist, whoIsComment, checkCommentCreatePayload } = require('./comments-middleware');
const { checkTweetID } = require('../tweets/tweets-middleware');

router.get('/admin', checkRole("admin"), async (req, res, next) => {
    try {
        const allComments = await CommentModel.getAllComments();
        res.json(allComments);
    } catch (error) {
        next({ status: 400, message: "Can not get comments.." });
    };
});

router.get('/:id', checkRole("user"), async (req, res, next) => {
    try {
        const idComments = await CommentModel.getCommentsByTwId(req.params.id);
        res.json(idComments);
    } catch (error) {
        next({ status: 400, message: "Can not get comments.." });
    };
});

router.put('/:id', checkCommentIsExist, checkRole("user"), whoIsComment, async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedContent = {
            content: req.body.content,
            updated_at: new Date().toISOString().replace("T", " ").slice(0, 19)
        };
        const updated = await CommentModel.update(id, updatedContent);

        if (updated) {
            res.json({ message: `Comment id ${id}, updated...` })
        } else {
            res.status(400).json({ message: `Error in updating Comment id ${id}!..` })
        };
    } catch (err) {
        next({ status: 400, message: "Update error..." });
    };
});

router.post("/:id", checkTweetID, checkCommentCreatePayload, checkRole("user"), async (req, res, next) => {
    try {
        let result = await CommentModel.createNewComment(req.newComment);
        res.json(result);
    } catch (error) {
        next(error)
    };
});

router.delete('/:id', checkCommentIsExist, checkRole("user"), whoIsComment, async (req, res, next) => {
    try {
        let { id } = req.params;
        const isDeleted = await CommentModel.removeComment(req.params.id);
        if (isDeleted) {
            res.json({ message: `Comment id ${id}, deleted...` })
        } else {
            res.status(400).json({ message: `Error in deleting comment id ${id}!..` })
        };
    } catch (err) {
        next(err);
    };
});

module.exports = router;