const db = require('../../data/db-config');

function getAllComments() {
    // SELECT * FROM tweets 
    return db('comments');
};

function getCommentsByTwId(tweet_id) {
    // SELECT * FROM comments c
    // WHERE c.tweet_id = 1
    return db('comments').
        where({ tweet_id });
};

function getCommentByCommentId(comment_id) {
    // SELECT * FROM comments c
    // WHERE c.comment_id = 1
    return db('comments').where({ comment_id }).first();
};

function findUserIdByCommentId(comment_id) {
    // SELECT user_id FROM comments c
    // WHERE c.comment_id = 1
    return db('comments')
        .where({ comment_id })
        .select("user_id").first();
};

async function updateComment(comment_id, payload) {
    return await db('comments').where("comment_id", comment_id).update(payload);
};

async function removeComment(comment_id) {
    return await db('comments').where("comment_id", comment_id).delete();
};

async function createNewComment(comment) {
    const [comment_id] = await db('comments').insert(comment);
    return getCommentByCommentId(comment_id);
};

module.exports = {
    getAllComments,
    getCommentsByTwId,
    getCommentByCommentId,
    findUserIdByCommentId,
    updateComment,
    removeComment,
    createNewComment
};