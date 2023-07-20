const TweetModel = require('./tweets-model');

const checkTweetIsExist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allTweets = await TweetModel.getTweetsByUserId(id);
        if (!allTweets || allTweets.length == 0) {
            res.status(404).json({ message: `User id ${id}, has not tweet yet...` })
        } else {
            req.tweets = allTweets;
            next();
        }
    } catch (err) {
        next(err);
    };
}

async function checkTweetID(req, res, next) {
    try {
        const tweet = await TweetModel.getTweetByTweetId(req.params.id);
        if (!tweet || tweet.length == 0) {
            res.status(404).json({ message: "Tweet is not exist..." });
        } else {
            req.tweet = tweet;
            next();
        };
    } catch (err) {
        next(err);
    };
};

async function checkTweetCreatePayload(req, res, next) {
    try {
        const newTw = req.body.content;
        if (newTw) {
            let newTweet = {
                user_id: Number(req.decodedToken.user_id),
                content: newTw
            };
            req.newTweet = newTweet;
            next()
        } else {
            next(err);
        }
    } catch (err) {
        next(err);
    };
};

const onlyForExistingUserTw = async (req, res, next) => {
    try {
        if (req.decodedToken.role == "admin") {
            next();
        } if (req.tweet.user_id !== req.decodedToken.user_id) {
            next({ status: 403, message: "You are not authorized!.." });
        } else {
            next();
        };
    } catch (err) {
        next(err);
    };
};

module.exports = {
    checkTweetIsExist,
    checkTweetID,
    onlyForExistingUserTw,
    checkTweetCreatePayload
}