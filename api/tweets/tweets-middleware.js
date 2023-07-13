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
        const tweet = await TweetModel.getTweetsByTweetId(req.params.id);
        if (!tweet || tweet.length == 0) {
            res.status(404).json({ message: "Tweet is not exist..." });
        } else {
            next()
        };
    } catch (error) {
        next(error);
    };
};

module.exports = {
    checkTweetIsExist,
    checkTweetID,
}