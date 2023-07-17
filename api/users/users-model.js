const db = require('../../data/db-config');

function getAllOnlyAdmin() {
    return db('users');
};

function getAll() {
    return db('users').select("user_id", "name", "email", "nick");
};

async function getUserByIdOnlyAdmin(user_id) {
    return await db('users').where({ user_id }).first();
};

async function getUserById(user_id) {
    return await db('users').where({ user_id }).select("user_id", "name", "email", "nick").first();
};

async function getUserByNick(nick) {
    return await db('users').where({ nick }).first();
};

async function getUserByMail(email) {
    return await db('users').where({ email }).first();
};

async function removeUser(id) {
    return await db('users').where("user_id", id).delete();
};

async function update(id, payload) {
    return await db('users').where("user_id", id).update(payload);
};

async function insert(newUser) {
    return await db("users").insert(newUser);
};

module.exports = {
    getAllOnlyAdmin,
    getAll,
    getUserByIdOnlyAdmin,
    getUserById,
    getUserByNick,
    getUserByMail,
    insert,
    removeUser,
    update
};