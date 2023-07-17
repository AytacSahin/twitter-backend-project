const server = require('../server');
const request = require('supertest');
const db = require('../../data/db-config');

const UserModel = require('../users/users-model');

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

const userRegisterModel = {
    name: "test",
    email: "test@test.com.tr",
    nick: "test",
    password: "1234"
};

const failedRegisterModel = {
    name: "test",
    email: "test@test.com.tr",
    nick: "aytac", // existing username
    password: "1234"
};

const shortRegisterModel = {
    name: "test",
    email: "aa", // invalid email
    nick: "test",
    password: "1234"
};

const longRegisterModel = {
    name: "test",
    email: "test@test.com.tr",
    nick: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    password: "1234"
};

describe('REGISTER', () => {
    test('[2] in register, there is a welcome message returning the username', async () => {
        const res = await request(server).post('/api/auth/register').send(userRegisterModel);
        expect(res.status).toBe(201);
        expect(res.body.message).toMatch(`Welcome to twitter, dear ${userRegisterModel.name}...`);
    });
    test('[3] in register, user id is sorted correctly', async () => {
        const res = await request(server).post('/api/auth/register').send(userRegisterModel);
        const newUser = await UserModel.getUserByNick("test");
        expect(newUser.user_id).toBe(6);
    });
    test('[4] in register, the role is given as "user" by default', async () => {
        const res = await request(server).post('/api/auth/register').send(userRegisterModel);
        const newUser = await UserModel.getUserByNick("test");
        expect(newUser).toHaveProperty("role", "user");
    });
    test('[5] gives an error when trying to register with an existing name', async () => {
        const res = await request(server).post('/api/auth/register').send(failedRegisterModel);
        expect(res.body.message).toMatch(/please change your nick and try again/i);
    });
    test('[6] gives an error when trying to register with invalid email', async () => {
        const res = await request(server).post('/api/auth/register').send(shortRegisterModel);
        expect(res.body.message).toMatch(/please enter a valid e-mail/i);
    });
    test('[7] gives an error when trying to register with long nick', async () => {
        const res = await request(server).post('/api/auth/register').send(longRegisterModel);
        expect(res.body.message).toMatch(/nick, cannot exceed 128 characters/i);
    });
});

const loginModel = {
    email: "aytac@aytac.com.tr",
    password: "1234"
};

const failedModel = {
    nick: "xxxx",
    password: "xxxx"
};

const passwordIncorrect = {
    nick: "aytac",
    password: "xxxx"
};

describe('LOGIN', () => {
    test('[8] there is a welcome message that greets you when you log in', async () => {
        const res = await request(server).post('/api/auth/login').send(loginModel);
        expect(res.body.message).toMatch(`Welcome back, dear aytac...`);
    });
    test('[9] Error message appears when a non-existent user tries to log in', async () => {
        const res = await request(server).post('/api/auth/login').send(failedModel);
        expect(res.body.message).toMatch(/no user found/i);
    });
    test('[10] Error message appears when nick is correct but password is incorrect', async () => {
        const res = await request(server).post('/api/auth/login').send(passwordIncorrect);
        expect(res.body.message).toMatch(/password is incorrect.../i);
    });
});


