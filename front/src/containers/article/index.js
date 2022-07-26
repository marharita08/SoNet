import React, {useContext, useState} from "react";
import {useMutation, useQuery} from "react-query";
import ReactLoading from "react-loading";
import {Collapse} from "@mui/material";
import PropTypes from 'prop-types';

import ErrorBoundary from "../../components/ErrorBoundary";
import Article from "../../components/article";
import {deleteArticle, getComments, getLikes} from "../../api/articlesCrud";
import authContext from "../../context/authContext";
import CommentContainer from "../comment";
import AddCommentContainer from "../addComment";
import {deleteLike, insertLike} from "../../api/likesCrud";

const ArticleContainer = ({setArticleContext, article, handleError}) => {
    let id = article.article_id;

    const [commentsArray, setCommentsArray] = useState();
    const [likedUsers, setLikedUsers] = useState();

    const { user:{user_id, avatar} , isAdmin } = useContext(authContext);
    const {isFetching:commentsFetching } = useQuery(`comments ${id}`,
        () => getComments(id), { onSuccess: (data) => { setCommentsArray(data?.data) }});
    useQuery(`users ${id}`, () => getLikes(id), {
        onSuccess: (data) => setLikedUsers(data?.data)
    });

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
    const [isLiked, setIsLiked] = useState(article.liked);
    const [likes, setLikes] = useState(parseInt(article.likes, 10));
    const [commentsAmount, setCommentsAmount] = useState(parseInt(article.comments, 10));

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
            addLikeMutate({user_id, article_id: article.article_id});
        } else {
            deleteLikeMutate({user_id, article_id: article.article_id});
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

    const { mutate } = useMutation(deleteArticle);

    const handleDelete = (article_id) => {
        mutate(article_id);
    }

    const handleCancel = () => {
        setCurrentComment(initComment);
        setAddComment(true);
    }

    return (
        <div>
            {commentsFetching &&
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
        avatar: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        comments: PropTypes.number.isRequired,
        liked: PropTypes.bool.isRequired,
    }),
    handleError: PropTypes.func.isRequired,
}

export default ArticleContainer;
