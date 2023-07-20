const server = require('../../api/server');
const request = require('supertest');
const db = require('../../data/db-config');

const TweetModel = require('./tweets-model');

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

describe('ADMIN methods', () => {
    let token;
    beforeEach(async () => {
        const res = await request(server).post('/api/auth/login').send({ email: "aytac@aytac.com.tr", password: "1234" });
        token = res.body.token;
    })
    test('[1] ADMIN / can get all tweets', async () => {
        const res = await request(server).get('/api/tweets/admin').set('Authorization', token);
        expect(res.body.length).toBe(7);
        expect(res.body[0]).toHaveProperty("content", "Bugün hava çok sıcak.");
    });
    test('[2] ADMIN / can get all tweets with user informations', async () => {
        const res = await request(server).get('/api/tweets/admin/users-tweets').set('Authorization', token);
        expect(res.body.length).toBe(4);
    });
});

describe('USER methods', () => {
    let token;
    beforeEach(async () => {
        const res = await request(server).post('/api/auth/login').send({ email: "ali@ali.com.tr", password: "1234" });
        token = res.body.token;
    })
    test('[3] USER / can get tweets by another user ID', async () => {
        const res = await request(server).get('/api/tweets/user/3').set('Authorization', token);
        expect(res.body.length).toBe(1);
        expect(res.body[0]).toHaveProperty("content", "Bugün hava bulutlu");
    });
    test('[4] USER / mypage / When the user opens her own page, sees the tweets of the people she/he follows and her-himself', async () => {
        const res = await request(server).get('/api/tweets/mypage').set('Authorization', token);
        expect(res.body.length).toBe(3);
        expect(res.body[0]).toHaveProperty("user_id", 2);
        expect(res.body[1]).toHaveProperty("user_id", 1);
        expect(res.body[2]).toHaveProperty("user_id", 1);
    });
    test("[5] USER / can update his/her own tweet", async () => {
        await request(server).put('/api/tweets/3').send({ content: "new tweet content" }).set('Authorization', token);
        const newTweet = await TweetModel.getTweetByTweetId(3);
        expect(newTweet.content).toMatch(/new tweet content/i);
    });
    test("[6] USER / can't update another users' tweets", async () => {
        const res = await request(server).put('/api/tweets/5').send({ content: "new tweet content" }).set('Authorization', token);
        expect(res.body.message).toMatch(/you can not update this tweet!/i);
    });
    test("[7] USER / cannot update a tweet that does not exist", async () => {
        const res = await request(server).put('/api/tweets/888').send({ content: "new tweet content" }).set('Authorization', token);
        expect(res.body.message).toMatch(/tweet is not exist/i);
    });
    test("[8] USER / user creates a new tweet", async () => {
        const res = await request(server).post('/api/tweets').send({ content: "new new new" }).set('Authorization', token);
        expect(res.body).toHaveProperty("content", "new new new");
    });
    test("[9] USER / user can delete his/her own tweet", async () => {
        const res = await request(server).delete('/api/tweets/3').set('Authorization', token);
        expect(res.body.message).toMatch(/tweet id 3, deleted/i);
    });
});

