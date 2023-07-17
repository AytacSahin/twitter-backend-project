const server = require('../../api/server');
const request = require('supertest');
const db = require('../../data/db-config');

const CommentModel = require('./comments-model');

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
    test('[2] ADMIN / can get all comments', async () => {
        const res = await request(server).get('/api/comments/admin').set('Authorization', token);
        expect(res.body.length).toBe(8);
        expect(res.body[0]).toHaveProperty("content", "Kesinlikle katılıyorum...");
    });
});

describe('USER methods', () => {
    let token;
    beforeEach(async () => {
        const res = await request(server).post('/api/auth/login').send({ email: "ali@ali.com.tr", password: "1234" });
        token = res.body.token;
    })
    test('[3] USER / can get comments by another user ID', async () => {
        const res = await request(server).get('/api/comments/2').set('Authorization', token);
        expect(res.body.length).toBe(2);
        expect(res.body[0]).toHaveProperty("content", "Paylaştıklarına katılmıyorum.");
    });

    test("[4] USER / can update his/her own comment", async () => {
        await request(server).put('/api/comments/3').send({ content: "updated comment" }).set('Authorization', token);
        const newComment = await CommentModel.getCommentByCommentId(3);
        expect(newComment.content).toMatch(/updated comment/i);
    });
    test("[5] USER / can't update another users' comments", async () => {
        const res = await request(server).put('/api/comments/5').send({ content: "updated comment" }).set('Authorization', token);
        expect(res.body.message).toMatch(/you are not authorized/i);
    });
    test("[6] USER / can't update a comment that does not exist", async () => {
        const res = await request(server).put('/api/comments/888').send({ content: "updated comment" }).set('Authorization', token);
        expect(res.body.message).toMatch(/comment is not exist/i);
    });
    test("[7] USER / user creates a new comment", async () => {
        const res = await request(server).post('/api/comments/6').send({ content: "new new new" }).set('Authorization', token);
        expect(res.body).toHaveProperty("content", "new new new");
    });
    test("[8] USER / user can delete his/her own comment", async () => {
        const res = await request(server).delete('/api/comments/3').set('Authorization', token);
        expect(res.body.message).toMatch(/comment id 3, deleted/i);
    });
});

