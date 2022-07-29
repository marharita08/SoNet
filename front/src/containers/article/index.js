import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import ReactLoading from "react-loading";
import {Collapse} from "@mui/material";
import PropTypes from 'prop-types';

import ErrorBoundary from "../../components/ErrorBoundary";
import Article from "../../components/article";
import {deleteArticle, getComments, getLikes, getCommentsAmount, getLikesAmount} from "../../api/articlesCrud";
import authContext from "../../context/authContext";
import CommentContainer from "../comment";
import AddCommentContainer from "../addComment";
import {deleteLike, getIsLiked, insertLike} from "../../api/likesCrud";
import { useNavigate, useLocation } from "react-router-dom";

const ArticleContainer = ({setArticleContext, article, handleError, articles, setArticles}) => {
    let id = article.article_id;

    const [commentsArray, setCommentsArray] = useState();
    const [likedUsers, setLikedUsers] = useState();
    const [isLiked, setIsLiked] = useState();
    const [commentsAmount, setCommentsAmount] = useState();
    const [likes, setLikes] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    const { user:{user_id, avatar} , isAdmin } = useContext(authContext);
    const {isFetching:commentsFetching } = useQuery(`comments ${id}`,
        () => getComments(id), { onSuccess: (data) => setCommentsArray(data?.data)
    });
    const {isFetching:likesFetching } = useQuery(`users ${id}`, () => getLikes(id), {
        onSuccess: (data) => setLikedUsers(data?.data)
    });
    const {isFetching:isLikedFetching } = useQuery(`is liked ${id}-${user_id}`, () => getIsLiked(id), {
        onSuccess: (data) => setIsLiked(data?.data)
    });
    const {isFetching:commentsAmountFetching } = useQuery(`comments amount ${id}`, () => getCommentsAmount(id), {
        onSuccess: (data) => setCommentsAmount(parseInt(data?.data.count, 10))
    });
    const {isFetching:likesAmountFetching } = useQuery(`likes amount ${id}`, () => getLikesAmount(id), {
        onSuccess: (data) => setLikes(parseInt(data?.data.count, 10))
    })

    const initComment = {
        article_id: id,
        user_id,
        text: '',
        level: 1,
        path: ''
    }
    const [currentComment, setCurrentComment] = useState(initComment);
    const [addComment, setAddComment] = useState(true);
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [commentFieldExpanded, setCommentFieldExpanded] = useState(false);

    const { mutate: addLikeMutate } = useMutation(insertLike, {
        onSuccess: () => {
            setLikedUsers([...likedUsers, {user_id, avatar}]);
            setLikes(likes + 1);
            setIsLiked(true);
        },
        onError: handleError
    });
    const { mutate: deleteLikeMutate } = useMutation(deleteLike, {
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
        })
        setCommentsArray(newCommentsArray);
        setCommentsAmount(commentsAmount + 1);
    }

    const updateCommentInArray = (comment) => {
        let newCommentsArray = [...commentsArray];
        const index = newCommentsArray.findIndex((obj => obj.comment_id === comment.comment_id));
        newCommentsArray[index].text = comment.text;
        setCommentsArray(newCommentsArray);
    }

    const setCurrentInitComment = () => {
        setCurrentComment(initComment);
    }

    const deleteCommentFromArray = (id) => {
        let newCommentsArray = [...commentsArray];
        const index = newCommentsArray.findIndex((obj => obj.comment_id === id));
        newCommentsArray.splice(index, 1);
        setCommentsArray(newCommentsArray);
        setCommentsAmount(commentsAmount - 1);
    }

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
        setCommentFieldExpanded(!commentFieldExpanded);
    }

    const handleEdit = (article) => {
        setArticleContext({
            openModal: true,
            addArticle: false,
            article
        })
    }

    const { mutate } = useMutation(deleteArticle, {
        onSuccess: () => {
            if (location.pathname === '/articles') {
                const newArticles = [...articles];
                const index = newArticles.findIndex((obj => obj.article_id === id));
                newArticles.splice(index, 1);
                setArticles(newArticles);
            } else {
                navigate('/articles');
            }
        }
    });

    const handleDelete = () => {
        mutate(id);
    }

    const handleCancel = () => {
        setCurrentComment(initComment);
        setAddComment(true);
    }

    return (
        <div>
            {(commentsFetching || likesFetching || isLikedFetching || commentsAmountFetching || likesAmountFetching) &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            <div className="outer">
                <div className="inner">
                    <ErrorBoundary>
                        <Article
                            article={article}
                            commentsExpanded={commentsExpanded}
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
                        />
                    </ErrorBoundary>
                    <Collapse in={commentFieldExpanded} timeout="auto" unmountOnExit>
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
                    <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                        {commentsArray?.map((comment) =>
                            <ErrorBoundary key={comment.path + comment.name}>
                                <CommentContainer
                                    comment={comment}
                                    setComment={setCurrentComment}
                                    setAddComment={setAddComment}
                                    setCommentFieldExpanded={setCommentFieldExpanded}
                                    deleteCommentFromArray={deleteCommentFromArray}
                                    handleError={handleError}
                                />
                            </ErrorBoundary>
                        )}
                    </Collapse>
                </div>
            </div>
        </div>
    );
}

ArticleContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    article: PropTypes.shape({
        article_id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        image: PropTypes.string,
    }),
    handleError: PropTypes.func.isRequired,
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            article_id: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            text: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            image: PropTypes.string,
        })
    ),
    setArticles: PropTypes.func.isRequired,
}

export default ArticleContainer;
