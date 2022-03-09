import React, {useContext} from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery} from "react-query";
import ReactLoading from "react-loading";
import {Collapse} from "@mui/material";
import PropTypes from 'prop-types';

import ErrorBoundary from "../../components/ErrorBoundary";
import Article from "../../components/article";
import {deleteArticle, getArticle, getComments} from "../../api/articlesCrud";
import Comment from "../../components/comment";
import authContext from "../../context/authContext";

const ArticleContainer = ({commentsExpanded, setCommentsExpanded, setArticleContext}) => {
    let {id} = useParams();
    const {isFetching:articleFetching, data:articleData } = useQuery('article', () => getArticle(id));
    const {isFetching:commentsFetching, data:commentsData } = useQuery('comments', () => getComments(id));
    const articles = articleData?.data;
    const comments = commentsData?.data;
    const { user:{user_id} } = useContext(authContext);

    const handleExpandClick = () => {
        setCommentsExpanded(!commentsExpanded);
    };

    const handleLikeClick = (event) => {
        event.preventDefault();
    };

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

    return (
        <div>
            {(articleFetching || commentsFetching) &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            {articles?.map((article) =>
                <div>
                    <ErrorBoundary>
                        <Article
                            article={article}
                            commentsExpanded={commentsExpanded}
                            handleEdit={handleEdit}
                            handleExpandClick={handleExpandClick}
                            handleLikeClick={handleLikeClick}
                            isCurrentUser={article.user_id === user_id}
                            handleDelete={handleDelete}
                        />
                    </ErrorBoundary>
                    <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
                        {comments?.map((comment) =>
                            <ErrorBoundary key={comment.path + comment.name}>
                                <Comment comment={comment}/>
                            </ErrorBoundary>
                        )}
                    </Collapse>
                </div>
            )}
        </div>
    );
}

ArticleContainer.propTypes = {
    commentsExpanded: PropTypes.bool.isRequired,
    setCommentsExpanded: PropTypes.func.isRequired,
    setArticleContext: PropTypes.func.isRequired,
}

export default ArticleContainer;
