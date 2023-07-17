const server = require('../../api/server');
const request = require('supertest');
const db = require('../../data/db-config');

const UserModel = require('./users-model');

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
    test('[2] ADMIN / can get all users with their passwords', async () => {
        const res = await request(server).get('/api/users/admin').set('Authorization', token);
        expect(res.body.length).toBe(5);
        expect(res.body[0]).toHaveProperty("nick", "aytac");
        expect(res.body[1]).toHaveProperty("nick", "ali_2000");
        expect(res.body[2]).toHaveProperty("password");
    });
    test('[3] ADMIN / can get one user by ID', async () => {
        const res = await request(server).get('/api/users/admin/5').set('Authorization', token);
        expect(res.body).toHaveProperty("password", "$2a$08$q.6NHXYsRLaGvwEdK3g.y./XTYZI9zMZr4iguW5.s9i.HbDjjDfhi");
    });
    test('[4] ADMIN / can delete one user by ID', async () => {
        const initialCount = await request(server).get('/api/users/admin').set('Authorization', token);
        expect(initialCount.body.length).toBe(5);
        await request(server).delete('/api/users/5').set('Authorization', token);
        const deletedCount = await request(server).get('/api/users/admin').set('Authorization', token);
        expect(deletedCount.body.length).toBe(4);
    });
    test('[5] ADMIN / can update one user by ID', async () => {
        await request(server).put('/api/users/2').send({ name: "cinali" }).set('Authorization', token);
        const res = await request(server).get('/api/users/admin/2').set('Authorization', token);
        console.log("1234", res.body);
        expect(res.body).toHaveProperty("name", "cinali");
    });
    test('[6] ADMIN / cannot delete a user that does not exist', async () => {
        const res = await request(server).delete('/api/users/55').set('Authorization', token);
        expect(res.body.message).toMatch(/user is not defined/i);
    });
});

describe('USER methods', () => {
    let token;
    beforeEach(async () => {
        const res = await request(server).post('/api/auth/login').send({ email: "ali@ali.com.tr", password: "1234" });
        token = res.body.token;
    })
    test('[7] USER / can get all users without their passwords', async () => {
        const res = await request(server).get('/api/users').set('Authorization', token);
        expect(res.body.length).toBe(5);
        expect(res.body[0]).toHaveProperty("nick", "aytac");
        expect(res.body[1]).toHaveProperty("nick", "ali_2000");
        expect(res.body[2]).not.toHaveProperty("password");
    });
    test('[8] USER / can get one user by ID (without password)', async () => {
        const res = await request(server).get('/api/users/3').set('Authorization', token);
        expect(res.body).not.toHaveProperty("password");
        expect(res.body).toHaveProperty("nick", "veli4950");
    });
    test("[9] USER / can't delete other users", async () => {
        const res = await request(server).delete('/api/users/5').set('Authorization', token);
        expect(res.body.message).toMatch(/you are not authorized!/i);
    });
    test("[10] USER / can delete only him-herself", async () => {
        const res = await request(server).delete('/api/users/2').set('Authorization', token);
        expect(res.body.message).toMatch(/User id 2, deleted/i);
    });
    test('[11] USER / cannot delete a user that does not exist', async () => {
        const res = await request(server).delete('/api/users/55').set('Authorization', token);
        expect(res.body.message).toMatch(/user is not defined/i);
    });
    test('[12] USER / cannot update other users', async () => {
        const res = await request(server).put('/api/users/5').send({ name: "cinali" }).set('Authorization', token);
        expect(res.body.message).toMatch(/you are not authorized!/i);
    });
    test('[13] USER / can delete only him-herself', async () => {
        const res = await request(server).put('/api/users/2').send({ name: "cinali" }).set('Authorization', token);
        expect(res.body.message).toMatch(/user id 2 is updated/i);
        const user = await UserModel.getUserById(2);
        expect(user.name).toMatch(/cinali/i);
    });
});