const userStorage = require("../db/users/storage");
const ForbiddenException = require("../errors/ForbiddenException");
const articleStorage = require("../db/articles/storage");
const NotFoundException = require("../errors/NotFoundException");
const storage = require("../db/articles/storage");
const fileHelper = require("../utils/fileHelper");

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
    Object.keys(articles).forEach((article) => {
        result.push(parseArticle(article));
    });
    return result;
};

const getAllNews = async (userId, page, limit) => {
    const user = await userStorage.getById(userId);
    if (user.role !== "admin") {
        throw new ForbiddenException();
    }
    return parseArticles(await articleStorage.getAllNews(page, limit));
};

const getAllNewsAmount = async (userId) => {
    const user = await userStorage.getById(userId);
    if (user.role !== "admin") {
        throw new ForbiddenException();
    }
    return await articleStorage.getCountOfAllNews();
};

const getNewsByUserId = async (userId, page, limit) => {
    return parseArticles(await articleStorage.getNewsByUserId(userId, page, limit));
};

const getNewsAmountByUserId = async (userId) => {
    return await articleStorage.getCountOfNewsByUserId(userId);
};

const getAll = async () => {
    return await articleStorage.getAll();
};

const getById = async (articleId) => {
    return await articleStorage.getById(articleId);
};

const getWholeArticleById = async (articleId, userId) => {
    const user = await userStorage.getById(userId);
    let dbResponse;
    if (user.role === "admin") {
        dbResponse = await articleStorage.getWholeArticleById(articleId);
    } else {
        dbResponse = await articleStorage.getByIdAndUserId(articleId, userId);
    }
    if (dbResponse) {
        return [parseArticle(dbResponse)];
    }
    throw new NotFoundException("Article not found");
};

const add = async (article, fileData) => {
    let path = null;
    if (fileData) {
        path = fileHelper.getUrlPath(fileData);
    }
    const id = await storage.create({
        ...article,
        image: path,
    });
    return parseArticle(await storage.getWholeArticleById(id[0]));
};

const update = async (articleId, text, visibilityId, fileData, errorHandler) => {
    let path = null;
    if (fileData) {
        const {image: oldFile} = await storage.getImageByArticleId(articleId);
        path = fileHelper.getUrlPath(fileData);
        fileHelper.deleteFile(oldFile, errorHandler);
    }
    await storage.update(articleId, {
        text,
        visibility_id: visibilityId,
        image: path,
    });
    return parseArticle(await storage.getWholeArticleById(articleId));
};

const _delete = async (articleId, errorHandler) => {
    const {image} = await storage.getImageByArticleId(articleId);
    fileHelper.deleteFile(image, errorHandler);
    return await storage.delete(articleId);
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
