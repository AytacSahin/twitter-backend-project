const CommentModel = require('./comments-model');
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
});

describe('GET COMMENTS', () => {
    test('[2] can get all comments', async () => {
        const comments = await CommentModel.getAllComments();
        expect(comments).toHaveLength(8);
    });
    test('[3] can get comment by Tweet ID', async () => {
        const comments = await CommentModel.getCommentsByTwId(3);
        expect(comments).toHaveLength(3);
    });
    test('[4] can get comment by comment ID', async () => {
        const comment = await CommentModel.getCommentByCommentId(1);
        expect(comment).toHaveProperty("content", "Kesinlikle katılıyorum...");
    });
    test('[5] can find the user with comment ID', async () => {
        const comment = await CommentModel.findUserIdByCommentId(6);
        expect(comment.user_id).toBe(4);
    });
});

describe('DELETE COMMENT WITH ID', () => {
    test('[6] can delete comment with ID', async () => {
        const deletedComment = await CommentModel.removeComment(8);
        expect(deletedComment).toBe(1);
        const comments = await CommentModel.getAllComments();
        expect(comments).toHaveLength(7);
    });
    test('[7] can not delete comment with a nonexist ID', async () => {
        const deletedComment = await CommentModel.removeComment(55);
        expect(deletedComment).toBe(0);
    });
});

describe('UPDATE COMMENT WITH ID & PAYLOAD', () => {
    test('[8] can update comment', async () => {
        await CommentModel.updateComment(1, { content: "new content" });
        const newComment = await CommentModel.getCommentByCommentId(1)
        expect(newComment).toHaveProperty("content", "new content");
    });
    test('[9] can not update comment with a nonexist ID', async () => {
        try {
            await CommentModel.updateComment(55);
        } catch (err) {
            expect(err.message).toMatch(/cannot.../i);
        }
    });
});

describe('CREATE COMMENT WITH PAYLOAD', () => {
    test('[10] can create a new comment', async () => {
        const newComment = await CommentModel.createNewComment({ content: "new comment" });
        expect(newComment).toHaveProperty("content", "new comment");
    });
});
