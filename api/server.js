// 🟢 Import
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const logger = require('morgan');
const authRouter = require('./auth/auth-router');
require('dotenv').config();

// 🟢 Server
const server = express();

// 🟢 Global Middlewares
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger('dev'));

// 🟢 Routers
server.use("/api/auth", authRouter);

// 🟢 Global Error Middleware
server.use((err, req, res, next) => {
    // eslint-disable-line
    res.status(err.status || 500).json({ message: err.message || "SERVER ERROR!...."});
});

// 🟢 Export
module.exports = server;
