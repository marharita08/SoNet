import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import {Collapse, Card} from "@mui/material";
import PropTypes from "prop-types";
import ErrorBoundary from "../../components/ErrorBoundary";
import Article from "../../components/layouts/article";
import {deleteArticle, getComments, getLikes, getCommentsAmount, getLikesAmount} from "../../api/articlesCrud";
import authContext from "../../context/authContext";
import CommentContainer from "../comment";
import AddCommentContainer from "../addComment";
import {deleteLike, getIsLiked, insertLike} from "../../api/likesCrud";
import {useNavigate, useLocation} from "react-router-dom";
import {articlePropTypes, articlesPropTypes} from "../../propTypes/articlePropTypes";

const ArticleContainer = ({setArticleContext, article, handleError, articles, setArticles}) => {

    let id = article.article_id;

    const {user: {user_id, avatar}, isAdmin} = useContext(authContext);

    const initComment = {
        article_id: id,
        user_id,
        text: "",
        level: 1,
        path: ""
    };

    // for add comment layout
    const [currentComment, setCurrentComment] = useState(initComment);
    const [addComment, setAddComment] = useState(true);
    const [addCommentExpanded, setAddCommentExpanded] = useState(false);

    // for comments layout
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [commentsArray, setCommentsArray] = useState([]);

    // for article layout
    const [likedUsers, setLikedUsers] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [commentsAmount, setCommentsAmount] = useState(0);
    const [likes, setLikes] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const refetchOff = {
        refetchInterval: false,
        refetchOnWindowFocus: false
    };

    // load data from back

    const {isFetching: commentsFetching} = useQuery(`comments ${id}`,
        () => getComments(id), {
            onSuccess: (data) => setCommentsArray(data?.data),
            ...refetchOff
        });

    const {isFetching: likesFetching} = useQuery(`users ${id}`, () => getLikes(id), {
        onSuccess: (data) => setLikedUsers(data?.data),
        ...refetchOff
    });

    const {isFetching: isLikedFetching} = useQuery(`is liked ${id}-${user_id}`, () => getIsLiked(id), {
        onSuccess: (data) => setIsLiked(data?.data),
        ...refetchOff
    });

    const {isFetching: commentsAmountFetching} = useQuery(`comments amount ${id}`, () => getCommentsAmount(id), {
        onSuccess: (data) => setCommentsAmount(+data?.data.count),
        ...refetchOff
    });

    const {isFetching: likesAmountFetching} = useQuery(`likes amount ${id}`, () => getLikesAmount(id), {
        onSuccess: (data) => setLikes(+data?.data.count),
        ...refetchOff
    });


    // update data on back

    const {mutate: addLikeMutate} = useMutation(insertLike, {
        onSuccess: () => {
            setLikedUsers([...likedUsers, {user_id, avatar}]);
            setLikes(likes + 1);
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
            setLikes(likes - 1);
            setIsLiked(false);
        },
        onError: handleError
    });

    const {mutate} = useMutation(deleteArticle, {
        onSuccess: () => {
            if (location.pathname === "/articles") {
                const newArticles = [...articles];
                const index = newArticles.findIndex((obj => obj.article_id === id));
                newArticles.splice(index, 1);
                setArticles(newArticles);
            } else {
                navigate("/articles");
            }
        }
    });


    // update state of current component

    const addCommentToArray = (comment) => {
        let newCommentsArray = [...commentsArray, comment];
        newCommentsArray.sort((a, b) => {
            const ap = a.path, bp = b.path;
            if (ap < bp) {
                return -1;
            }
            if (ap > bp) {
                return 1;
            }
            return 0;
        });
        setCommentsArray(newCommentsArray);
        setCommentsAmount(commentsAmount + 1);
    };

    const updateCommentInArray = (comment) => {
        let newCommentsArray = [...commentsArray];
        const index = newCommentsArray.findIndex((obj => obj.comment_id === comment.comment_id));
        newCommentsArray[index].text = comment.text;
        setCommentsArray(newCommentsArray);
    };

    const setCurrentInitComment = () => {
        setCurrentComment(initComment);
    };

    const deleteCommentFromArray = (id) => {
        let newCommentsArray = [...commentsArray];
        const index = newCommentsArray.findIndex((obj => obj.comment_id === id));
        newCommentsArray.splice(index, 1);
        setCommentsArray(newCommentsArray);
        setCommentsAmount(commentsAmount - 1);
    };


    // handle click events

    const handleLikeClick = (event) => {
        event.preventDefault();
        if (!isLiked) {
            addLikeMutate({article_id: article.article_id});
        } else {
            deleteLikeMutate(article.article_id);
        }
    };

    const handleExpandClick = (event) => {
        event.preventDefault();
        setCommentsExpanded(!commentsExpanded);
    };

    const handleAddCommentClick = (event) => {
        event.preventDefault();
        setAddCommentExpanded(!addCommentExpanded);
    };

    const handleEdit = (article) => {
        setArticleContext({
            openModal: true,
            addArticle: false,
            article
        });
    };

    const handleDelete = () => {
        mutate(id);
    };

    const handleCancel = () => {
        setCurrentComment(initComment);
        setAddComment(true);
    };

    return (
        <Card className={"article-card"}>
            <ErrorBoundary>
                <Article
                    article={article}
                    commentsExpanded={commentsExpanded}
                    addCommentExpanded={addCommentExpanded}
                    handleEdit={handleEdit}
                    handleExpandClick={handleExpandClick}
                    isCurrentUser={article.user_id === user_id}
                    isAdmin={isAdmin}
                    handleDelete={handleDelete}
                    handleAddCommentClick={handleAddCommentClick}
                    isLiked={isLiked}
                    likes={likes}
                    comments={commentsAmount}
                    handleLikeClick={handleLikeClick}
                    users={likedUsers}
                    likesFetching={likesFetching || likesAmountFetching || isLikedFetching}
                    commentsFetching={commentsFetching || commentsAmountFetching}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <Collapse in={addCommentExpanded} timeout="auto" unmountOnExit>
                    <AddCommentContainer
                        comment={currentComment}
                        addComment={addComment}
                        handleCancel={handleCancel}
                        addCommentToArray={addCommentToArray}
                        updateCommentInArray={updateCommentInArray}
                        setCurrentInitComment={setCurrentInitComment}
                        handleError={handleError}
                        setCommentsExpanded={setCommentsExpanded}
                    />
                </Collapse>
            </ErrorBoundary>
            <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                {commentsArray?.map((comment) =>
                    <ErrorBoundary key={comment.comment_id}>
                        <CommentContainer
                            comment={comment}
                            setComment={setCurrentComment}
                            setAddComment={setAddComment}
                            setCommentFieldExpanded={setAddCommentExpanded}
                            deleteCommentFromArray={deleteCommentFromArray}
                            handleError={handleError}
                        />
                    </ErrorBoundary>
                )}
            </Collapse>
        </Card>
    );
};

ArticleContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    article: articlePropTypes.isRequired,
    handleError: PropTypes.func.isRequired,
    articles: articlesPropTypes.isRequired,
    setArticles: PropTypes.func.isRequired,
};

export default ArticleContainer;
