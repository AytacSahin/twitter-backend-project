// Libraries
const express = require("express");

const logger = require('morgan');
const helmet = require("helmet");
const cors = require("cors");

const AuthRouter = require('./auth/auth-router');
const UsersRouter = require('./users/users-router');
const TweetsRouter = require('./tweets/tweets-router');
const CommentsRouter = require('./comments/comments-router');

const { restricted } = require('../api/auth/auth-middleware');

// Server
const server = express();

// Global Middlewares
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger('dev'));

// Routers
server.use("/api/auth", AuthRouter);
server.use("/api/users", restricted, UsersRouter);
server.use("/api/tweets", restricted, TweetsRouter);
server.use("/api/comments", restricted, CommentsRouter);

// Global Error Middleware
server.use((err, req, res, next) => {
    // eslint-disable-line
    res.status(err.status || 500).json({ message: err.message || "SERVER ERROR!...." });
});

// Export
module.exports = server;
