const router = require('express').Router();
const TweetModel = require('./tweets-model');
const { checkTweetIsExist, checkTweetID, onlyForExistingUserTw, checkTweetCreatePayload } = require('./tweets-middleware');
const { checkRole } = require('../auth/auth-middleware');
const { validateUserId } = require('../users/users-middleware');

router.get('/admin', checkRole("admin"), async (req, res, next) => {
    try {
        const allTweets = await TweetModel.getAllTweets();
        res.json(allTweets);
    } catch (error) {
        next({ status: 400, message: "Can not get tweets.." });
    };
});

router.get('/admin/users-tweets', checkRole("admin"), async (req, res, next) => {
    try {
        const userTweetsModel = await TweetModel.getUsersWithTweets();
        res.json(userTweetsModel);
    } catch (error) {
        next({ status: 400, message: "Server error..." });
    };
});

router.get('/user/:id', validateUserId, checkTweetIsExist, async (req, res, next) => {
    try {
        res.json(req.tweets);
    } catch (error) {
        next({ status: 400, message: "Server error..." });
    };
});

router.get('/mypage', checkRole("user"), async (req, res, next) => {
    try {
        const homeModel = await TweetModel.getMyHomePage(req.decodedToken.user_id);
        if (!homeModel || homeModel.length == 0) {
            res.json({ message: "User has not followings and own tweets..." });
        } else {
            res.json(homeModel)
        };
    } catch (error) {
        next({ status: 400, message: "Server error..." });
    };
});

router.put('/:id', checkTweetID, checkRole("user"), async (req, res, next) => {
    try {
        let existingId = await TweetModel.findUserIdByTweetId(req.params.id)
        if (req.decodedToken.user_id == existingId.user_id) {
            const { id } = req.params;
            const updatedTweet = {
                content: req.body.content,
                updated_at: new Date().toISOString().replace("T", " ").slice(0, 19)
            };
            const updated = await TweetModel.update(id, updatedTweet);
            if (updated) {
                res.json({ message: `Tweet id ${id}, updated...` })
            } else {
                res.status(400).json({ message: `Error in updating Tweet id ${id}!..` })
            };
        } else {
            res.json({ message: "You can not update this tweet!..." });
        }
    } catch (err) {
        next({ status: 400, message: "Update error..." });
    };
});

router.post("/", checkTweetCreatePayload, checkRole("user"), async (req, res, next) => {
    try {
        let result = await TweetModel.createNewTweet(req.newTweet);
        res.json(result);
    } catch (error) {
        next(error)
    };
});

router.delete('/:id', checkTweetID, checkRole("user"), onlyForExistingUserTw, async (req, res, next) => {
    try {
        const isDeleted = await TweetModel.removeTweet(req.params.id);
        if (isDeleted) {
            res.json({ message: `Tweet id ${tweet_id}, deleted...` })
        } else {
            res.status(400).json({ message: `Error in deleting tweet id ${tweet_id}!..` })
        };
    } catch (err) {
        next(err);
    };
});

module.exports = router;