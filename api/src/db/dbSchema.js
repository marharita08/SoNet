const tables = {
    articles: "articles",
    users: "users",
    articleVisibilities: "article_visibilities",
    friends: "friends",
    status: "status"
};
const columns = {
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
    },
    articleId: "article_id",
    createdAt: "created_at"
};

const articleVisibilities = {
    all: "All",
    friends: "Friends",
    onlyMe: "Only Me"
}

const status = {
    accepted: "Accepted",
}
module.exports = {
    tables,
    columns,
    articleVisibilities,
    status
}
