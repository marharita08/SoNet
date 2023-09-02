import React from "react";
import {Divider} from "@mui/material";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleActions from "./ArticleActions";
import {articleActionsPropTypes, articleActionsDefaultProps} from "./articleActionsPropTypes";
import {articleHeaderPropTypes} from "./articleHeaderPropTypes";

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
                isCurrentUser={isCurrentUser}
                isAdmin={isAdmin}
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
    ...articleHeaderPropTypes,
    ...articleActionsPropTypes
};

Article.defaultProps = articleActionsDefaultProps;

export default Article;
