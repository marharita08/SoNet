const tables = {
    articles: "articles",
    users: "users",
    articleVisibilities: "article_visibilities",
    friends: "friends",
    status: "status",
    comments: "comments"
};
const fullColumns = {
    articles: {
        articleId: `${tables.articles}.article_id`,
        text: `${tables.articles}.text`,
        image: `${tables.articles}.image`,
        createdAt: `${tables.articles}.created_at`,
        userId: `${tables.articles}.user_id`,
        visibilityId: `${tables.articles}.visibility_id`
    },
    users: {
        userId: `${tables.users}.user_id`,
        name: `${tables.users}.name`,
        avatar: `${tables.users}.avatar`,
    },
    articleVisibilities: {
        visibilityId: `${tables.articleVisibilities}.visibility_id`,
        visibility: `${tables.articleVisibilities}.visibility`
    },
    friends: {
        requestId: `${tables.friends}.request_id`,
        fromUserId: `${tables.friends}.from_user_id`,
        toUserId: `${tables.friends}.to_user_id`,
        statusId: `${tables.friends}.status_id`
    },
    status: {
        statusId: `${tables.status}.status_id`,
        status: `${tables.status}.status`
    }
};

const shortColumns = {
    articles: {
        articleId: "article_id",
        createdAt: "created_at"
    },
    comments: {
        commentId: "comment_id",
        articleId: "article_id",
        userId: "user_id",
        text: "text",
        parentId: "parent_id",
        path: "path",
        level: "level",
        commentedAt: "commented_at",
    },
    users: {
        userId: "user_id",
        name: "name",
        avatar: "avatar"
    }
};

const articleVisibilities = {
    all: "All",
    friends: "Friends",
    onlyMe: "Only Me"
};

const status = {
    accepted: "Accepted",
};
module.exports = {
    tables,
    fullColumns,
    shortColumns,
    articleVisibilities,
    status
};
