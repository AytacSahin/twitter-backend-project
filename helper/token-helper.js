const { JWT_SECRET } = require('../config/index');
const jwt = require("jsonwebtoken");
const db = require('../data/db-config');

require("dotenv").config();

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}
// async function logout(token) {
//     await db("tokenBlackList").insert({ token: token });
// }
// function deleteFromBlackListToken(token) {
//     return db("tokenBlackList").where("token", token).del();
// }
// function checkIsInsertBlackList(token) {
//     return db("tokenBlackList").where("token", token).first();
// }

module.exports = {
    JWT_SECRET: JWT_SECRET,
    generateToken,
    // logout,
    // deleteFromBlackListToken,
    // checkIsInsertBlackList
}