import React, {useContext} from "react";
import {useMutation, useQuery} from "react-query";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

import Article from "../../components/article";
import ErrorBoundary from "../../components/ErrorBoundary";
import authContext from "../../context/authContext";
import {getNews} from "../../api/usersCrud";
import {deleteArticle} from "../../api/articlesCrud";


const ArticlesContainer = ({commentsExpanded, setCommentsExpanded, setArticleContext}) => {
    const { user:{user_id} } = useContext(authContext);
    const {isFetching, data} = useQuery('articles', () => getNews(user_id));
    const articles = data?.data;
    setCommentsExpanded(false);

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
            {isFetching &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            {articles?.map((article) =>
                <ErrorBoundary key={article.article_id}>
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
            )}
        </div>
    );
}

ArticlesContainer.propTypes = {
    commentsExpanded: PropTypes.bool.isRequired,
    setCommentsExpanded: PropTypes.func.isRequired,
    setArticleContext: PropTypes.func.isRequired,
}

export default ArticlesContainer;
