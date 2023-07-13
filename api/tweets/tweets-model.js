const db = require('../../data/db-config');

function getAllTweets() {
    // SELECT * FROM tweets 
    return db('tweets');
};

function getTweetsByUserId(user_id) {
    // SELECT * FROM tweets t
    // WHERE t.user_id = 1
    return db('tweets').where({ user_id });
};
// to do : s takısını kaldır:
function getTweetsByTweetId(tweet_id) {
    // SELECT * FROM tweets t
    // WHERE t.tweet_id = 1
    return db('tweets').where({ tweet_id }).first();
};

function findUserIdByTweetId(tweet_id) {
    // SELECT user_id FROM tweets t
    // WHERE t.tweet_id = 1
    return db('tweets').where({ tweet_id }).select("user_id").first();
};

async function getUsersWithTweets() {

    // SELECT user_id, nick, tweet_id, content, likes, created_at
    // FROM users u
    // LEFT JOIN tweets t ON u.user_id = t.user_id
    // ORDER BY u.user_id

    const model = await db("users as u")
        .leftJoin("tweets as t", "u.user_id", "t.user_id")
        .select("u.user_id", "u.nick", "t.tweet_id", "t.content", "t.likes", "t.created_at")
        .orderBy('u.user_id')

    let totalTable = [];

    for (let i = 0; i < model.length; i++) {

        let userModel = {
            user_id: model[i].user_id,
            nick: model[i].nick,
            tweets: []
        };

        let tweetModel = {
            tweet_id: model[i].tweet_id,
            content: model[i].content,
            likes: model[i].likes,
            created_at: model[i].created_at
        };

        let isExist = totalTable.filter(item => item.user_id == model[i].user_id);

        if (isExist.length == 0 && model[i].tweet_id) {
            userModel.tweets.push(tweetModel);
            totalTable.push(userModel);
        }
        else {
            totalTable.some((item) => {
                if (item.user_id == model[i].user_id && model[i].tweet_id) {
                    item["tweets"].push(tweetModel);
                    return true;
                };
                return false;
            });
        };
    };

    return totalTable;
};

async function update(tweet_id, payload) {
    return await db('tweets').where("tweet_id", tweet_id).update(payload);
};

async function createNewTweet(tweet) {
    const [tweet_id] = await db('tweets').insert(tweet);
    return getTweetsByTweetId(tweet_id);
};

module.exports = {
    getAllTweets,
    getTweetsByUserId,
    getUsersWithTweets,
    update,
    getTweetsByTweetId,
    findUserIdByTweetId,
    createNewTweet
};