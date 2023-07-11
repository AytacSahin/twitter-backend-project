const db = require('../../data/db-config');

function getAll() {
    // SELECT * FROM users 
    return db('users');
};

async function getUserById(user_id) {
    // SELECT * FROM users u
    // WHERE u.user_id = 2
    return await db('users').where({ user_id }).first(); // alternatif: ...where({ user_id: user_id })
};

async function getUserByNick(nick) {
    // SELECT * FROM users u
    // WHERE u.nick = aytac
    return await db('users').where({ nick }).first(); // alternatif: ...where({ name: name })
};

async function getUserByName(name) {
    // SELECT * FROM users u
    // WHERE u.name = aytac
    return await db('users').where({ name }).first(); // alternatif: ...where({ name: name })
};

async function getUserByMail(email) {
    // SELECT * FROM users u
    // WHERE u.mail = aytac@aytac.com.tr
    return await db('users').where({ email }).first(); // alternatif: ...where({ mail: mail })
};

// to do: en son filtreleme model'i yaz 11.07.23 ders kaydında var:
// async function getUserByFilter(filter) {
//     return await db('users').where(filter).first(); // alternatif: ...where({ filter: filter })
// };

async function insert(newUser) {
    await db("users").insert(newUser);
};

module.exports = {
    getAll,
    getUserById,
    getUserByName,
    getUserByNick,
    getUserByMail,
    insert
};