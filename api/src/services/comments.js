const commentStorage = require("../db/comments/storage");
const NotFoundException = require("../errors/NotFoundException");
const db = require("../configs/db");

const getAll = async () => {
    return await commentStorage.getAll();
};

const getById = async (commentId) => {
    const comment = await commentStorage.getById(commentId);
    if (comment[0]) {
        return comment;
    }
    throw new NotFoundException("Comment not found");
};

const add = async (comment) => {
    let id;
    await db.transaction(async () => {
        id = await commentStorage.create(comment);
        let path;
        if (comment.path === "") {
            path = id[0];
        } else {
            path = `${comment.path}.${id[0]}`;
        }
        await commentStorage.update(id[0], {
            path,
        });
    });
    return {comment: await commentStorage.getFullDataById(id[0])};
};

const update = async (commentId, text) => {
    await commentStorage.update(commentId, {
        text,
    });
    return {comment: {comment_id: commentId, text}};
};

const _delete = async (commentId) => {
    return await commentStorage.delete(commentId);
};

const getByArticleId = async (articleId) => {
    return await commentStorage.getFullDataByArticleId(articleId);
};

const getAmountByArticleId = async (articleId) => {
    return await commentStorage.getAmountByArticleId(articleId);
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
