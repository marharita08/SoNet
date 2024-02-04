const usersStorage = require("../db/users/storage");
const ForbiddenException = require("../errors/ForbiddenException");
const articlesStorage = require("../db/articles/storage");
const NotFoundException = require("../errors/NotFoundException");
const fileHelper = require("../utils/fileHelper");
const Messages = require("../constants/messages");
const {Roles} = require("../middleware/aclRules");
const {parseArticles, parseArticle} = require("../utils/articlesParser");
const BaseService = require("./base");

class ArticlesService extends BaseService {

  constructor() {
    super(articlesStorage);
  }

  getAllNews = async (userId, page, limit) => {
    const user = await usersStorage.getById(userId);
    if (user.role !== Roles.ADMIN) {
      throw new ForbiddenException();
    }
    return parseArticles(await this.storage.getAllNews(page, limit));
  };

  getAllNewsAmount = async (userId) => {
    const user = await usersStorage.getById(userId);
    if (user.role !== Roles.ADMIN) {
      throw new ForbiddenException();
    }
    return await this.storage.getCountOfAllNews();
  };

  getNewsByUserId = async (userId, page, limit) => {
    return parseArticles(await this.storage.getNewsByUserId(userId, page, limit));
  };

  getNewsAmountByUserId = async (userId) => {
    return await this.storage.getCountOfNewsByUserId(userId);
  };

  getWholeArticleById = async (articleId, userId) => {
    const user = await usersStorage.getById(userId);
    let dbResponse;
    if (user.role === Roles.ADMIN) {
      dbResponse = await this.storage.getWholeArticleById(articleId);
    } else {
      dbResponse = await this.storage.getByIdAndUserId(articleId, userId);
    }
    if (dbResponse) {
      return [parseArticle(dbResponse)];
    }
    throw new NotFoundException(Messages.ARTICLE_NOT_FOUND);
  };

  add = async (article, fileData) => {
    let path = null;
    if (fileData) {
      path = fileHelper.getUrlPath(fileData);
    }
    const id = await super.add({
      ...article,
      image: path,
    });
    return parseArticle(await this.storage.getWholeArticleById(id));
  };

  update = async (articleId, text, visibilityId, fileData, errorHandler) => {
    let path = null;
    if (fileData) {
      const {image: oldFile} = await this.storage.getImageByArticleId(articleId);
      path = fileHelper.getUrlPath(fileData);
      fileHelper.deleteFile(oldFile, errorHandler);
    }
    await super.update(articleId, {
      text,
      visibility_id: visibilityId,
      image: path,
    });
    return parseArticle(await this.storage.getWholeArticleById(articleId));
  };

  delete = async (articleId, errorHandler) => {
    const {image} = await this.storage.getImageByArticleId(articleId);
    fileHelper.deleteFile(image, errorHandler);
    return await super.delete(articleId);
  };
}

module.exports = new ArticlesService();
