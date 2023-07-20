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

client.on('connect', () => {
    console.log('Redis client connected...');
});

client.on('error', (err) => {
    console.log('Error in Redis client...' + err);
});

async function generateToken(payload) {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" })
    await client.connect();
    await client.set(token, 1, { EX: 60 * 60 * 24 })
    await client.disconnect();
    return token;
};

async function verifyCashToken(token) {
    await client.connect();
    const tokenCash = await client.get(token);
    await client.disconnect();
    return tokenCash;
};

async function deleteTokenInCash(token) {
    await client.connect();
    await client.del(token);
    await client.disconnect();
};

module.exports = {
    JWT_SECRET: JWT_SECRET,
    generateToken,
    verifyCashToken,
    deleteTokenInCash,
    client
};