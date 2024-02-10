const commentsStorage = require("../db/comments/storage");
const NotFoundException = require("../errors/NotFoundException");
const db = require("../configs/db");
const Messages = require("../constants/messages");
const BaseService = require("./base");

class CommentsService extends BaseService {

  constructor() {
    super(commentsStorage);
  }

  async getById(commentId) {
    const comment = await super.getById(commentId);
    if (comment) {
      return comment;
    }
    throw new NotFoundException(Messages.COMMENT_NOT_FOUND);
  }

  async add(comment) {
    let id;
    await db.transaction(async () => {
      id = (await super.add(comment)).comment_id;
      const path = !!comment.path ? id : `${comment.path}.${id}`;
      await super.update(id, { path });
    });
    return { comment: await this.storage.getFullDataById(id) };
  }

  async update(commentId, text) {
    await super.update(commentId, { text });
    return { comment: { comment_id: commentId, text } };
  }

  async getByArticleId(articleId) {
    return await this.storage.getFullDataByArticleId(articleId);
  }

  async getAmountByArticleId(articleId) {
    return await this.storage.getAmountByArticleId(articleId);
  }
}

module.exports = new CommentsService();
