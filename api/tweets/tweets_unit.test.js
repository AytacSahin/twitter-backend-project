const TweetModel = require('./tweets-model');
const db = require('../../data/db-config');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db.seed.run();
});

describe('Sanity Test', () => {
    test('[1] Sanity Test', () => {
        expect(true).toEqual(true);
        expect(process.env.NODE_ENV).toBe('testing');
    });
});

describe('GET Tweets', () => {
    test('[2] can get all tweets', async () => {
        const tweets = await TweetModel.getAllTweets();
        expect(tweets).toHaveLength(7);
    });
    test('[3] can get tweet by User ID', async () => {
        const tweets = await TweetModel.getTweetsByUserId(1);
        expect(tweets).toHaveLength(2);
    });
    test('[4] can get tweet by tweet ID', async () => {
        const tweet = await TweetModel.getTweetByTweetId(7);
        expect(tweet).toHaveProperty("content", "Bugün hava parçalı bulutlu.");
    });
    test('[5] can find the user with tweet ID', async () => {
        const tweet = await TweetModel.findUserIdByTweetId(7);
        expect(tweet.user_id).toBe(4);
    });
    test('[6] can i get my homepage with my following\'s tweets', async () => {
        const tweets2 = await TweetModel.getMyHomePage(2);
        expect(tweets2).toHaveLength(3);
        const tweets5 = await TweetModel.getMyHomePage(5);
        expect(tweets5).toHaveLength(0);
    });
});

describe('DELETE TWEET WITH ID', () => {
    test('[7] can delete tweet with ID', async () => {
        const deletedTweet = await TweetModel.removeTweet(3);
        expect(deletedTweet).toBe(1);
    });
    test('[8] can not delete tweet with a nonexist ID', async () => {
        const deletedTweet = await TweetModel.removeTweet(55);
        expect(deletedTweet).toBe(0);
    });
});

describe('UPDATE TWEET WITH ID & PAYLOAD', () => {
    test('[9] can update tweet', async () => {
        await TweetModel.update(1, { content: "new content" });
        const newTweet = await TweetModel.getTweetByTweetId(1)
        expect(newTweet).toHaveProperty("content", "new content");
    });
    test('[10] can not update tweet with a nonexist ID', async () => {
        try {
            await TweetModel.update(55);
        } catch (err) {
            expect(err.message).toMatch(/cannot.../i);
        }
    });
});

describe('CREATE TWEET WITH PAYLOAD', () => {
    test('[11] can create a new tweet', async () => {
        await TweetModel.createNewTweet({ content: "new tweet" });
        const newTweet = await TweetModel.getTweetByTweetId(8)
        expect(newTweet).toHaveProperty("content", "new tweet");
    });
});

