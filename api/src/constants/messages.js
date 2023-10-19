const notFound = (name) => `${name} not found`;

module.exports = {
    NOT_FOUND: "Not found",
    FORBIDDEN: "Forbidden",
    UNAUTHORIZED: "Unauthorized",
    INTERNAL_SERVER_ERROR: "Something went wrong!",
    ARTICLE_NOT_FOUND: notFound("Article"),
    COMMENT_NOT_FOUND: notFound("Comment"),
    USER_NOT_FOUND: notFound("User"),
    TOKEN_NOT_FOUND: notFound("Token"),
    EXPIRED_TOKEN: "Token has been expired",
    WRONG_PASSWORD: "Wrong password",
    CHECK_MAILBOX: "Check your mailbox",
    PASSWORD_CHANGED: "Password has been changed successfully",
}
