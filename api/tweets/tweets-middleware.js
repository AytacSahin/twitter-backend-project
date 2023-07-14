const TweetModel = require('./tweets-model');

const checkTweetIsExist = async (req, res, next) => {
    try {
        const { id } = req.params;
        const allTweets = await TweetModel.getTweetsByUserId(id);
        if (!allTweets || allTweets.length == 0) {
            res.json({ message: `User id ${id}, has not tweet yet...` })
        } else {
            req.tweets = allTweets;
            next();
        }
    } catch (error) {
        next({ status: 400, message: "Can not get tweets.." });
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
    } catch (error) {
        next(error);
    };
};

async function checkTweetCreatePayload(req, res, next) {
    try {
        const newComment = req.body.content; // user_id tokendan alınacak
        if (newComment) {
            let tweet = {
                user_id: Number(req.decodedToken.user_id),
                content: newComment
            };
            req.newComment = tweet;
            next()
        } else {
            res.status(400).json({ message: "Please text a type some content!..." });
        }
    } catch (error) {
        next(error);
    };
};

const onlyForExistingUserTw = async (req, res, next) => {
    try {
        if (req.decodedToken.role == "admin") {
            next();
        } if (req.tweet.user_id !== req.decodedToken.user_id) {
            next({ status: 403, message: "Yetkiniz yok!.." });
        } else {
            next();
        };
    } catch (error) {
        next(error);
    };
};

module.exports = {
    checkTweetIsExist,
    checkTweetID,
    onlyForExistingUserTw,
    checkTweetCreatePayload
}