import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import PropTypes from "prop-types";
import ErrorBoundary from "../../../components/ErrorBoundary";
import ArticleComponent from "../../../components/layouts/article/ArticleComponent";
import {deleteArticle, getComments, getLikes, getCommentsAmount, getLikesAmount} from "../../../api/articlesCrud";
import authContext from "../../../context/authContext";
import CommentContainer from "../comment/CommentContainer";
import AddOrEditCommentContainer from "../addOrEditComment/AddOrEditCommentContainer";
import {deleteLike, getIsLiked, insertLike} from "../../../api/likesCrud";
import {useNavigate, useLocation} from "react-router-dom";
import {articlePropTypes, articlesPropTypes} from "../../../propTypes/articlePropTypes";
import articlesService from "../../../services/articlesService";
import handleErrorContext from "../../../context/handleErrorContext";
import commentsService from "../../../services/commentsService";
import ArticleCardComponent from "../../../components/layouts/articleCard/ArticleCardComponent";

const ArticleCardContainer = ({setArticleContext, article, articles, setArticles}) => {

    let id = article.article_id;

    const {user: {user_id, avatar}, isAdmin} = useContext(authContext);
    const {handleError} = useContext(handleErrorContext);

    const initComment = {
        article_id: id,
        user_id,
        text: "",
        level: 1,
        path: ""
    };

    // for add comment layout
    const [currentComment, setCurrentComment] = useState(initComment);
    const [isCommentAdd, setIsCommentAdd] = useState(true);
    const [isAddOrEditCommentExpanded, setIsAddOrEditCommentExpanded] = useState(false);

    // for comments layout
    const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
    const [comments, setComments] = useState([]);

    // for article layout
    const [likedUsers, setLikedUsers] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [commentsAmount, setCommentsAmount] = useState(0);
    const [likesAmount, setLikesAmount] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const refetchOff = {
        refetchInterval: false,
        refetchOnWindowFocus: false
    };

    // load data from back

    const {isFetching: isCommentsFetching} = useQuery(`comments ${id}`,
        () => getComments(id), {
            onSuccess: (data) => setComments(data?.data),
            ...refetchOff
        });

    const {isFetching: isLikesFetching} = useQuery(`users ${id}`, () => getLikes(id), {
        onSuccess: (data) => setLikedUsers(data?.data),
        ...refetchOff
    });

    const {isFetching: isIsLikedFetching} = useQuery(`is liked ${id}-${user_id}`, () => getIsLiked(id), {
        onSuccess: (data) => setIsLiked(data?.data),
        ...refetchOff
    });

    const {isFetching: isCommentsAmountFetching} = useQuery(`comments amount ${id}`, () => getCommentsAmount(id), {
        onSuccess: (data) => setCommentsAmount(+data?.data.count),
        ...refetchOff
    });

    const {isFetching: isLikesAmountFetching} = useQuery(`likes amount ${id}`, () => getLikesAmount(id), {
        onSuccess: (data) => setLikesAmount(+data?.data.count),
        ...refetchOff
    });


    // update data on back

    const {mutate: addLikeMutate} = useMutation(insertLike, {
        onSuccess: () => {
            setLikedUsers([...likedUsers, {user_id, avatar}]);
            setLikesAmount(likesAmount + 1);
            setIsLiked(true);
        },
        onError: handleError
    });

    const {mutate: deleteLikeMutate} = useMutation(deleteLike, {
        onSuccess: () => {
            let newLikedUsers = [...likedUsers];
            const index = newLikedUsers.findIndex(((obj) => obj.user_id === user_id));
            newLikedUsers.splice(index, 1);
            setLikedUsers(newLikedUsers);
            setLikesAmount(likesAmount - 1);
            setIsLiked(false);
        },
        onError: handleError
    });

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

    const onCommentAdd = (comment) => {
        setComments(commentsService.addComment(comments, comment));
        setCommentsAmount(commentsAmount + 1);
    };

    const onCommentUpdate = (comment) => {
        setComments(commentsService.updateComment(comments, comment));
    };

    const setCurrentInitComment = () => {
        setCurrentComment(initComment);
    };

    const onCommentDelete = (id) => {
        setComments(commentsService.deleteComment(comments, id));
        setCommentsAmount(commentsAmount - 1);
    };


    // handle click events

    const handleLike = (event) => {
        event.preventDefault();
        if (!isLiked) {
            addLikeMutate({article_id: article.article_id});
        } else {
            deleteLikeMutate(article.article_id);
        }
    };

    const handleCommentsExpand = (event) => {
        event.preventDefault();
        setIsCommentsExpanded(!isCommentsExpanded);
    };

    const handleAddComment = (event) => {
        event.preventDefault();
        setIsAddOrEditCommentExpanded(!isAddOrEditCommentExpanded);
    };

    const handleArticleEdit = (article) => {
        setArticleContext({
            openModal: true,
            addArticle: false,
            article
        });
    };

    const handleArticleDelete = () => {
        mutate(id);
    };

    const handleCommentCancel = () => {
        setCurrentComment(initComment);
        setIsCommentAdd(true);
    };

    return (
        <ArticleCardComponent
            isCommentsExpanded={isCommentsExpanded}
            isAddOrEditCommentExpanded={isAddOrEditCommentExpanded}
            articleComponent={
                <ArticleComponent
                    article={article}
                    isCommentsExpanded={isCommentsExpanded}
                    isAddOrEditCommentExpanded={isAddOrEditCommentExpanded}
                    handleEdit={handleArticleEdit}
                    handleCommentsExpand={handleCommentsExpand}
                    isCurrentUser={article.user_id === user_id}
                    isAdmin={isAdmin}
                    handleDelete={handleArticleDelete}
                    handleAddComment={handleAddComment}
                    isLiked={isLiked}
                    likesAmount={likesAmount}
                    commentsAmount={commentsAmount}
                    handleLike={handleLike}
                    users={likedUsers}
                    isLikesFetching={isLikesFetching || isLikesAmountFetching || isIsLikedFetching}
                    isCommentsFetching={isCommentsFetching || isCommentsAmountFetching}
                />
            }
            addOrEditCommentComponent={
                <AddOrEditCommentContainer
                    comment={currentComment}
                    isCommentAdd={isCommentAdd}
                    handleCancel={handleCommentCancel}
                    onCommentAdd={onCommentAdd}
                    onCommentUpdate={onCommentUpdate}
                    setCurrentInitComment={setCurrentInitComment}
                    handleError={handleError}
                    setCommentsExpanded={setIsCommentsExpanded}
                />
            }
            commentsComponent={
                comments?.map((comment) =>
                    <ErrorBoundary key={comment.comment_id}>
                        <CommentContainer
                            comment={comment}
                            setComment={setCurrentComment}
                            setIsCommentAdd={setIsCommentAdd}
                            setIsExpanded={setIsAddOrEditCommentExpanded}
                            onCommentDelete={onCommentDelete}
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
};

export default ArticleCardContainer;
