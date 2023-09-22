export const initArticle = (user_id) => {
    return {
        isModalOpen: true,
        isAdd: true,
        article: {
            text: "",
            user_id,
            visibility: {
                value: 1,
                label: "All",
            }
        }
    }
}

export const initComment = (article_id, user_id) => {
    return {
        article_id,
        user_id,
        text: "",
        level: 1,
        path: ""
    }
}

export const initCommentForReply = (parentComment, user_id) => {
    return {
        parent_id: parentComment.comment_id,
        level: parentComment.level + 1,
        to: parentComment.name,
        parent_text: parentComment.text,
        user_id,
        article_id: parentComment.article_id,
        path: parentComment.path,
        text: "",
    }
}

export const initialUser = {
    email: "",
    password: ""
};

export const getAuthContext = (user, accessToken, refreshToken) => {
    return {
        authenticated: true,
        user,
        isAdmin: user.role === "admin",
        accessToken,
        refreshToken
    }
}

export const initAlertState = {
    message: "",
    severity: ""
}
