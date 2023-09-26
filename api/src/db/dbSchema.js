const tables = {
    articles: "articles",
    users: "users",
    articleVisibilities: "article_visibilities",
    friends: "friends",
    status: "status",
    comments: "comments",
    articleLikes: "article_likes",
    resetPasswordTokens: "reset_password_tokens",
    session: "session",
    userSettings: "user_settings",
    universities: "universities",
    fieldVisibilities: "field_visibilities"
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
    },
    friends: {
        requestId: "request_id",
        fromUserId: "from_user_id",
        toUserId: "to_user_id",
        statusId: "status_id"
    },
    articleLikes: {
        userId: "user_id",
        articleId: "article_id"
    },
    resetPasswordTokens: {
        token: "token"
    },
    session: {
        token: "token"
    },
    userSettings: {
        userId: "user_id"
    },
    universities: {
        universityId: "university_id",
        name: "name"
    },
    fieldVisibilities: {
        visibilityId: "visibility_id",
        visibility: "visibility"
    },
    articleVisibilities: {
        visibilityId: "visibility_id",
        visibility: "visibility"
    }
};

const fullColumns = {
    articles: {
        articleId: `${tables.articles}.${shortColumns.articles.articleId}`,
        text: `${tables.articles}.text`,
        image: `${tables.articles}.image`,
        createdAt: `${tables.articles}.${shortColumns.articles.createdAt}`,
        userId: `${tables.articles}.user_id`,
        visibilityId: `${tables.articles}.visibility_id`
    },
    users: {
        userId: `${tables.users}.${shortColumns.users.userId}`,
        name: `${tables.users}.${shortColumns.users.name}`,
        avatar: `${tables.users}.${shortColumns.users.avatar}`,
    },
    articleVisibilities: {
        visibilityId: `${tables.articleVisibilities}.${shortColumns.articleVisibilities.visibilityId}`,
        visibility: `${tables.articleVisibilities}.${shortColumns.articleVisibilities.visibility}`
    },
    friends: {
        requestId: `${tables.friends}.${shortColumns.friends.requestId}`,
        fromUserId: `${tables.friends}.${shortColumns.friends.fromUserId}`,
        toUserId: `${tables.friends}.${shortColumns.friends.toUserId}`,
        statusId: `${tables.friends}.${shortColumns.friends.statusId}`
    },
    status: {
        statusId: `${tables.status}.status_id`,
        status: `${tables.status}.status`
    },
    articleLikes: {
        userId: `${tables.articleLikes}.${shortColumns.articleLikes.userId}`,
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
