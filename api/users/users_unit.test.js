const UserModel = require('./users-model');
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
})

describe('GET ALL', () => {
    test('[2] can get all users', async () => {
        const users = await UserModel.getAll();
        expect(users).toHaveLength(5);
        expect(users[0]).not.toHaveProperty("password");
    });
    test('[3] ADMIN / can get all users with passwords', async () => {
        const users = await UserModel.getAllOnlyAdmin();
        // expect(users).toHaveLength(5);
        expect(users[0]).toHaveProperty("password")
        expect(users[0]).toHaveProperty("role")
    });
});

describe('GET BY ID ', () => {
    test('[4] can get one user by ID', async () => {
        const user = await UserModel.getUserById(1);
        expect(user.email).toMatch(/aytac@aytac.com.tr/i);
        expect(user.nick).toMatch(/aytac/i);
        expect(user).not.toHaveProperty("password");
        expect(user).not.toHaveProperty("role");
    });
    test('[5] ADMIN / can get user by ID with password', async () => {
        const user = await UserModel.getUserByIdOnlyAdmin(1);
        expect(user.email).toMatch(/aytac@aytac.com.tr/i);
        expect(user.nick).toMatch(/aytac/i);
        expect(user).toHaveProperty("password");
        expect(user).toHaveProperty("role", "admin");
    });
});

describe('GET USER WITH FILTER', () => {
    test('[6] can get one user by Nick', async () => {
        const nick = "osmancik";
        const user = await UserModel.getUserByNick(nick);
        expect(user.email).toMatch(/osman@osman.com.tr/i);
    });
    test('[7] can get one user by Mail', async () => {
        const mail = "osman@osman.com.tr";
        const user = await UserModel.getUserByMail(mail);
        expect(user).toHaveProperty("user_id", 4);
    });
});

describe('DELETE USER WITH ID', () => {
    test('[8] can delete user with ID', async () => {
        const deletedUser = await UserModel.removeUser(3);
        expect(deletedUser).toBe(1);
    });
    test('[9] can not delete user with a nonexist ID', async () => {
        const deletedUser = await UserModel.removeUser(55);
        expect(deletedUser).toBe(0);
    });
});

const updateUserInfo = {
    name: "test",
    email: "test@test.com.tr",
    nick: "test",
    password: "$2a$08$q.6NHXYsRLaGvwEdK3g.y./XTYZI9zMZr4iguW5.s9i.HbDjjDfhi"
};

describe('UPDATE USER WITH ID & PAYLOAD', () => {
    test('[10] can update user', async () => {
        await UserModel.update(5, updateUserInfo);
        const updatedUser = await UserModel.getUserById(5)
        expect(updatedUser).toHaveProperty("nick", "test");
    });
    test('[11] can not update user with same nick existing on other users', async () => {
        try {
            await UserModel.update(4, updateUserInfo);
            await UserModel.update(4, { nick: "aytac" });
        } catch (err) {
            expect(err.message).toMatch(/unique constraint failed/i);
        };
    });
});

const newUser = {
    name: "test",
    email: "test@test.com.tr",
    nick: "test",
    password: "1234"
};

describe('INSERT NEW USER WITH PAYLOAD', () => {
    test('[12] can insert a new user', async () => {
        const newUserId = await UserModel.insert(newUser);
        const addedUser = await UserModel.getUserById(newUserId[0])
        expect(addedUser).toHaveProperty("nick", "test");
    });
    test('[13] can not insert a new user with same mail existing on other users', async () => {
        try {
            await UserModel.insert({
                name: "test",
                email: "aytac@aytac.com.tr",
                nick: "test",
                password: "1234"
            });
        } catch (err) {
            expect(err.message).toMatch(/unique constraint failed/i);
        };
    });
});