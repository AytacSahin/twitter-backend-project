const db = require('../../data/db-config');

function getAllOnlyAdmin() {
    // SELECT * FROM users 
    return db('users');
};

function getAll() {
    // SELECT * FROM users 
    return db('users').select("user_id", "name", "email", "nick");
};

async function getUserByIdOnlyAdmin(user_id) {
    // SELECT * FROM users u
    // WHERE u.user_id = 2
    return await db('users').where({ user_id }).first();
};

async function getUserById(user_id) {
    // SELECT * FROM users u
    // WHERE u.user_id = 2
    return await db('users').where({ user_id }).select("user_id", "name", "email", "nick").first();
};

async function getUserByNick(nick) {
    // SELECT * FROM users u
    // WHERE u.nick = aytac
    return await db('users').where({ nick }).first();
};

async function getUserByName(name) {
    // SELECT * FROM users u
    // WHERE u.name = aytac
    return await db('users').where({ name }).first();
};

async function getUserByMail(email) {
    // SELECT * FROM users u
    // WHERE u.mail = aytac@aytac.com.tr
    return await db('users').where({ email }).first();
};

async function removeUser(id) {
    return await db('users').where("user_id", id).delete();
};

async function update(id, payload) {
    return await db('users').where("user_id", id).update(payload);
};

async function insert(newUser) {
    await db("users").insert(newUser);
};

module.exports = {
    getAllOnlyAdmin,
    getAll,
    getUserByIdOnlyAdmin,
    getUserById,
    getUserByName,
    getUserByNick,
    getUserByMail,
    insert,
    removeUser,
    update
};