const router = require('express').Router();
const TweetModel = require('./tweets-model');
const { validateUserId } = require('../users/users-middleware');
const { checkTweetIsExist, checkTweetID } = require('./tweets-middleware');

router.get('/', async (req, res, next) => {
    try {
        const allTweets = await TweetModel.getAllTweets();
        res.json(allTweets);
    } catch (error) {
        next({ status: 400, message: "Can not get tweets.." });
    };
});

router.get('/user/:id', validateUserId, checkTweetIsExist, async (req, res, next) => {
    try {
        res.json(req.tweets);
    } catch (error) {
        next({ status: 400, message: "Server error..." });
    };
});

router.get('/users-tweets', async (req, res, next) => {
    try {
        const userTweetsModel = await TweetModel.getUsersWithTweets();
        res.json(userTweetsModel);
    } catch (error) {

    };
});

router.put('/:id', checkTweetID, async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
    try {
        let tweet = { content: req.body.content, user_id: Number(req.decodedToken.user_id) };
        let result = await TweetModel.createNewTweet(tweet);
        res.json(result);
    } catch (error) {
        next(error)
    };
});

module.exports = router;