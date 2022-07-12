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

const ArticleContainer = ({setArticleContext, article}) => {
    let id = article.article_id;
    const { user:{user_id} , isAdmin } = useContext(authContext);
    const {isFetching:commentsFetching, data:commentsData } = useQuery(`comments ${id}`, () => getComments(id));
    const {data:usersData} = useQuery(`users ${id}`, () => getLikes(id));
    const comments = commentsData?.data;
    const users = usersData?.data;

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


    const { mutate: addLikeMutate } = useMutation(insertLike);
    const { mutate: deleteLikeMutate } = useMutation(deleteLike);

    const handleLikeClick = (event) => {
        event.preventDefault();
        if (!isLiked) {
            setLikes(likes + 1);
            addLikeMutate({user_id, article_id: article.article_id});
        } else {
            setLikes(likes - 1);
            deleteLikeMutate({user_id, article_id: article.article_id});
        }
        setIsLiked(!isLiked);
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
                            handleLikeClick={handleLikeClick}
                            users={users}
                        />
                    </ErrorBoundary>
                    <Collapse in={commentFieldExpanded} timeout="auto" unmountOnExit>
                        <AddCommentContainer
                            comment={currentComment}
                            addComment={addComment}
                            handleCancel={handleCancel}
                        />
                    </Collapse>
                    <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                        {comments?.map((comment) =>
                            <ErrorBoundary key={comment.path + comment.name}>
                                <CommentContainer
                                    comment={comment}
                                    setComment={setCurrentComment}
                                    setAddComment={setAddComment}
                                    setCommentFieldExpanded={setCommentFieldExpanded}
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
}

export default ArticleContainer;
