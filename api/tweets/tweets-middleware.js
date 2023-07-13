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
            req.tweet = tweet;
            next();
        };
    } catch (error) {
        next(error);
    };
};

// to do: yeni tweet oluştururken validasyon yapıcam: 
// async function checkTweetCreatePayload(req, res, next) {
//     try {
//         const {tweetContent, user_id} = req.body; // user_id tokendan alınacak
//         if(tweetContent){
//             const newTweet = {
//                 tweetContent: req.body.tweetContent
//             };
//             req.newTweet = newTweet;
//             next()
//         } else {
//             res.status(400).json({message: "Güncellemek istediğiniz bilgileri giriniz!"});
//         }
//     } catch (error) {
//         next(error)
//     }
// }

const onlyForExistingUserTw = async (req, res, next) => {
    try {
        2 !== 2 || "user" !== "admin"
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
    onlyForExistingUserTw
}