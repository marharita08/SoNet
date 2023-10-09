const commentsStorage = require("../db/comments/storage");
const NotFoundException = require("../errors/NotFoundException");
const db = require("../configs/db");

const getAll = async () => {
    return await commentsStorage.getAll();
};

const getById = async (commentId) => {
    const comment = await commentsStorage.getById(commentId);
    if (comment) {
        return comment;
    }
    throw new NotFoundException("Comment not found");
};

const add = async (comment) => {
    let id;
    await db.transaction(async () => {
        id = await commentsStorage.create(comment);
        let path;
        if (comment.path === "") {
            path = id[0];
        } else {
            path = `${comment.path}.${id[0]}`;
        }
        await commentsStorage.update(id[0], {
            path,
        });
    });
    return {comment: await commentsStorage.getFullDataById(id[0])};
};

const update = async (commentId, text) => {
    await commentsStorage.update(commentId, {
        text,
    });
    return {comment: {comment_id: commentId, text}};
};

const _delete = async (commentId) => {
    return await commentsStorage.delete(commentId);
};

const getByArticleId = async (articleId) => {
    return await commentsStorage.getFullDataByArticleId(articleId);
};

const getAmountByArticleId = async (articleId) => {
    return await commentsStorage.getAmountByArticleId(articleId);
};

module.exports = {
    getAll,
    getById,
    add,
    update,
    delete: _delete,
    getByArticleId,
    getAmountByArticleId
};
