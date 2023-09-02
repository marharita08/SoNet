import React from "react";
import PropTypes from "prop-types";
import {Divider} from "@mui/material";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleActions from "./ArticleActions";

const Article = ({
    article,
    commentsExpanded,
    addCommentExpanded,
    handleEdit,
    handleExpandClick,
    handleDelete,
    isCurrentUser,
    isAdmin,
    isLiked,
    handleAddCommentClick,
    handleLikeClick,
    likes,
    comments,
    users,
    likesFetching,
    commentsFetching
}) => {

    return (
        <>
            <ArticleHeader
                article={article}
                isMenu={isCurrentUser || isAdmin}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <ArticleContent article={article}/>
            <Divider/>
            <ArticleActions
                commentsFetching={commentsFetching}
                likesFetching={likesFetching}
                handleExpandClick={handleExpandClick}
                addCommentExpanded={addCommentExpanded}
                commentsExpanded={commentsExpanded}
                handleAddCommentClick={handleAddCommentClick}
                handleLikeClick={handleLikeClick}
                likes={likes}
                comments={comments}
                isLiked={isLiked}
                users={users}
            />
        </>
    );
};

Article.propTypes = {
    article: PropTypes.shape({
        article_id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        image: PropTypes.string,
    }),
    commentsExpanded: PropTypes.bool.isRequired,
    addCommentExpanded: PropTypes.bool.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleExpandClick: PropTypes.func.isRequired,
    handleLikeClick: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isLiked: PropTypes.bool,
    likes: PropTypes.number,
    comments: PropTypes.number,
    handleAddCommentClick: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            user_id: PropTypes.number.isRequired,
            avatar: PropTypes.string
        })
    ),
    likesFetching: PropTypes.bool,
    commentsFetching: PropTypes.bool
};

export default Article;
