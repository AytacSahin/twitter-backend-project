const { JWT_SECRET } = require('../config/index');
const jwt = require("jsonwebtoken");
const db = require('../data/db-config');
const { createClient } = require('redis');
// const client = redis.createClient();
// import { createClient } from 'redis';

const client = createClient({
    password: 'UKo1ZU1kYk6ioTfHZOYV2zQ3UZcaOjnm',
    socket: {
        host: 'redis-12025.c278.us-east-1-4.ec2.cloud.redislabs.com',
        port: 12025
    }
});

const connection = async () => {
    await client.connect();
};
connection();

client.on('connect', () => {
    console.log('Redis client connected...');
});

client.on('error', (err) => {
    console.log('Error in Redis client...' + err);
});

async function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
    await client.set(token, 1, { EX: 60 * 60 * 24 })
    return token;
};

async function verifyCashToken(token) {
    const tokenCash = await client.get(token)
    return tokenCash;
};

async function deleteTokenInCash(token) {
    await client.del(token);
};

module.exports = {
    JWT_SECRET: JWT_SECRET,
    generateToken,
    verifyCashToken,
    deleteTokenInCash,
    // checkIsInsertBlackList
};





// const { JWT_SECRET } = require('../config/index');
// const jwt = require("jsonwebtoken");
// const db = require('../data/db-config');
// const redis = require('redis');
// const client = redis.createClient();

// const connection = async () => {
//     await client.connect();
// };
// connection();

// client.on('connect', () => {
//     console.log('Redis client connected...')
// });

// client.on('error', (err) => {
//     console.log('Error in Redis client...' + err)
// });

// async function generateToken(payload) {
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
//     // await client.set(token, 1, { EX: 10 }) .... 10 sn için, çalışıyor ....
//     await client.set(token, 1, { EX: 60 * 60 * 24 })
//     return token;
// };

// async function verifyCashToken(token) {
//     const tokenCash = await client.get(token)
//     return tokenCash;
// };

// async function deleteTokenInCash(token) {
//     await client.del(token);
// };

// module.exports = {
//     JWT_SECRET: JWT_SECRET,
//     generateToken,
//     verifyCashToken,
//     deleteTokenInCash,
//     // checkIsInsertBlackList
// };