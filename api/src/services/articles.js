const usersStorage = require("../db/users/storage");
const ForbiddenException = require("../errors/ForbiddenException");
const articlesStorage = require("../db/articles/storage");
const NotFoundException = require("../errors/NotFoundException");
const fileHelper = require("../utils/fileHelper");
const Messages = require("../constants/messages");
const {Roles} = require("../middleware/aclRules");

const parseArticle = (article) => {
    const {visibility, visibility_id: visibilityId, ...rest} = article;
    return {
        ...rest,
        visibility: {
            value: visibilityId,
            label: visibility,
        }
    };
};

const parseArticles = (articles) => {
    const result = [];
    Object.keys(articles).forEach((key) => {
        result.push(parseArticle(articles[key]));
    });
    return result;
};

const getAllNews = async (userId, page, limit) => {
    const user = await usersStorage.getById(userId);
    if (user.role !== Roles.ADMIN) {
        throw new ForbiddenException();
    }
    return parseArticles(await articlesStorage.getAllNews(page, limit));
};

const getAllNewsAmount = async (userId) => {
    const user = await usersStorage.getById(userId);
    if (user.role !== Roles.ADMIN) {
        throw new ForbiddenException();
    }
    return await articlesStorage.getCountOfAllNews();
};

const getNewsByUserId = async (userId, page, limit) => {
    return parseArticles(await articlesStorage.getNewsByUserId(userId, page, limit));
};

const getNewsAmountByUserId = async (userId) => {
    return await articlesStorage.getCountOfNewsByUserId(userId);
};

const getAll = async () => {
    return await articlesStorage.getAll();
};

const getById = async (articleId) => {
    return await articlesStorage.getById(articleId);
};

const getWholeArticleById = async (articleId, userId) => {
    const user = await usersStorage.getById(userId);
    let dbResponse;
    if (user.role === Roles.ADMIN) {
        dbResponse = await articlesStorage.getWholeArticleById(articleId);
    } else {
        dbResponse = await articlesStorage.getByIdAndUserId(articleId, userId);
    }
    if (dbResponse) {
        return [parseArticle(dbResponse)];
    }
    throw new NotFoundException(Messages.ARTICLE_NOT_FOUND);
};

const add = async (article, fileData) => {
    let path = null;
    if (fileData) {
        path = fileHelper.getUrlPath(fileData);
    }
    const id = await articlesStorage.create({
        ...article,
        image: path,
    });
    return parseArticle(await articlesStorage.getWholeArticleById(id[0]));
};

const update = async (articleId, text, visibilityId, fileData, errorHandler) => {
    let path = null;
    if (fileData) {
        const {image: oldFile} = await articlesStorage.getImageByArticleId(articleId);
        path = fileHelper.getUrlPath(fileData);
        fileHelper.deleteFile(oldFile, errorHandler);
    }
    await articlesStorage.update(articleId, {
        text,
        visibility_id: visibilityId,
        image: path,
    });
    return parseArticle(await articlesStorage.getWholeArticleById(articleId));
};

const _delete = async (articleId, errorHandler) => {
    const {image} = await articlesStorage.getImageByArticleId(articleId);
    fileHelper.deleteFile(image, errorHandler);
    return await articlesStorage.delete(articleId);
};

module.exports = {
    getAllNews,
    getAllNewsAmount,
    getNewsByUserId,
    getNewsAmountByUserId,
    getAll,
    getWholeArticleById,
    add,
    update,
    delete: _delete,
    getById
};
