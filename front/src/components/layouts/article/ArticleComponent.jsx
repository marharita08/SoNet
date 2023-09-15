import React from "react";
import {Divider} from "@mui/material";
import ArticleHeader from "./ArticleHeader";
import ArticleContent from "./ArticleContent";
import ArticleActions from "./ArticleActions";
import {articleActionsPropTypes, articleActionsDefaultProps} from "./articleActionsPropTypes";
import {articleHeaderPropTypes} from "./articleHeaderPropTypes";

const ArticleComponent = ({
    article,
    isCommentsExpanded,
    isAddOrEditCommentExpanded,
    handleEdit,
    handleCommentsExpand,
    handleDelete,
    isCurrentUser,
    isAdmin,
    isLiked,
    handleAddComment,
    handleLike,
    likesAmount,
    commentsAmount,
    likedUsers,
    isLikesFetching,
    isCommentsFetching
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
                isCommentsFetching={isCommentsFetching}
                isLikesFetching={isLikesFetching}
                handleCommentsExpand={handleCommentsExpand}
                isAddOrEditCommentExpanded={isAddOrEditCommentExpanded}
                isCommentsExpanded={isCommentsExpanded}
                handleAddComment={handleAddComment}
                handleLike={handleLike}
                likesAmount={likesAmount}
                commentsAmount={commentsAmount}
                isLiked={isLiked}
                likedUsers={likedUsers}
            />
        </>
    );
};

ArticleComponent.propTypes = {
    ...articleHeaderPropTypes,
    ...articleActionsPropTypes
};

ArticleComponent.defaultProps = articleActionsDefaultProps;

export default ArticleComponent;
