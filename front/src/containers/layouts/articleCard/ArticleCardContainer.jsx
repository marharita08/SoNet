import React, {useContext, useState} from "react";
import {useMutation} from "react-query";
import PropTypes from "prop-types";
import {useNavigate, useLocation} from "react-router-dom";
import {Divider} from "@mui/material";

import ErrorBoundary from "../../../components/ErrorBoundary";
import {deleteArticle} from "../../../api/articlesCrud";
import authContext from "../../../context/authContext";
import CommentContainer from "../comment/CommentContainer";
import AddOrEditCommentContainer from "../addOrEditComment/AddOrEditCommentContainer";
import {articlePropTypes, articlesPropTypes} from "../../../propTypes/articlePropTypes";
import articlesService from "../../../services/articlesService";
import handleResponseContext from "../../../context/handleResponseContext";
import ArticleCardComponent from "../../../components/layouts/articleCard/ArticleCardComponent";
import {initComment as initCommentFn} from "../../../config/initValues";
import ArticleHeader from "../../../components/layouts/article/ArticleHeader";
import ArticleContent from "../../../components/layouts/article/ArticleContent";
import ArticleActions from "../../../components/layouts/article/ArticleActions";
import {useComments} from "./useComments";
import {useLikes} from "./useLikes";

const ArticleCardContainer = ({setArticleContext, article, articles, setArticles, isTruncate}) => {

  let id = article.article_id;

  const {user, isAdmin} = useContext(authContext);
  const {user_id} = user;
  const {handleError} = useContext(handleResponseContext);

  const initComment = initCommentFn(id, user_id);

  const {isCommentsExpanded, comments, commentsAmount, toggleComments, addComment,
    updateComment, deleteComment, isCommentsFetching} = useComments(id);

  const {likedUsers, likesAmount, isLiked, like, isLikesFetching} = useLikes(id, user, handleError);

  // for add comment layout
  const [currentComment, setCurrentComment] = useState(initComment);
  const [isCommentAdd, setIsCommentAdd] = useState(true);
  const [isAddOrEditCommentExpanded, setIsAddOrEditCommentExpanded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // update data on back

  const {mutate} = useMutation(deleteArticle, {
    onSuccess: () => {
      if (location.pathname === "/articles") {
        setArticles(articlesService.deleteArticle(articles, id));
      } else {
        navigate("/articles");
      }
    }
  });


  // update state of current component

  const refreshCurrentComment = () => {
    setIsCommentAdd(true);
    setCurrentComment(initComment);
  };

  const onCommentAddOrUpdate = () => {
    setIsAddOrEditCommentExpanded(false);
    refreshCurrentComment();
  }

  const onCommentAdd = (comment) => {
    onCommentAddOrUpdate();
    addComment(comment);
  };

  const onCommentUpdate = (comment) => {
    onCommentAddOrUpdate();
    updateComment(comment)
  };

  const onCommentDelete = (id) => {
    deleteComment(id);
  };

  // handle click events

  const handleLike = (event) => {
    event.preventDefault();
    like();
  };

  const handleCommentsExpand = (event) => {
    event.preventDefault();
    toggleComments();
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    setIsAddOrEditCommentExpanded(!isAddOrEditCommentExpanded);
  };

  const handleArticleEdit = (article) => {
    setArticleContext({
      isModalOpen: true,
      addArticle: false,
      article
    });
  };

  const handleArticleDelete = () => {
    mutate(id);
  };

  const handleCommentCancel = () => {
    refreshCurrentComment();
  };

  return (
    <ArticleCardComponent
      flags={{isCommentsExpanded, isAddOrEditCommentExpanded}}
      articleComponent={
        <>
          <ArticleHeader
            article={article}
            actions={{
              handleEdit: handleArticleEdit,
              handleDelete: handleArticleDelete
            }}
            flags={{isAdmin, isCurrentUser: article.user_id === user_id}}
          />
          <ArticleContent article={article} isTruncate={isTruncate}/>
          <Divider/>
          <ArticleActions
            likesAmount={likesAmount}
            commentsAmount={commentsAmount}
            likedUsers={likedUsers}
            actions={{handleCommentsExpand, handleAddComment, handleLike}}
            flags={{isAddOrEditCommentExpanded, isCommentsExpanded, isLiked, isCommentsFetching, isLikesFetching}}
          />
        </>
      }
      addOrEditCommentComponent={
        <AddOrEditCommentContainer
          comment={currentComment}
          isCommentAdd={isCommentAdd}
          actions={{onCommentAdd, onCommentUpdate, handleCancel: handleCommentCancel}}
        />
      }
      commentsComponent={
        comments?.map((comment) =>
          <ErrorBoundary key={comment.comment_id}>
            <CommentContainer
              comment={comment}
              actions={{
                setIsCommentAdd, onCommentDelete,
                setIsExpanded: setIsAddOrEditCommentExpanded,
                setComment: setCurrentComment
              }}
            />
          </ErrorBoundary>
        )
      }
    />
  );
};

ArticleCardContainer.propTypes = {
  setArticleContext: PropTypes.func.isRequired,
  article: articlePropTypes.isRequired,
  articles: articlesPropTypes.isRequired,
  setArticles: PropTypes.func.isRequired,
  isTruncate: PropTypes.bool
};

ArticleCardContainer.defaultProps = {
  isTruncate: true
};

export default ArticleCardContainer;
