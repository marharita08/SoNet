import React , {useContext} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import PropTypes from 'prop-types';

import ErrorBoundary from "../../components/ErrorBoundary";
import Article from "../../containers/article";
import {getArticle} from "../../api/articlesCrud";
import authContext from "../../context/authContext";
import Loading from "../../components/loading";


const ArticleOuterContainer = ({setArticleContext, handleError, articles, setArticles}) => {
    let {id} = useParams();
    const { user:{user_id} } = useContext(authContext);
    const {isFetching:articleFetching} =
        useQuery(`article ${id}-${user_id}`, () => getArticle(id), {
            onSuccess: (data) => setArticles(data?.data),
            refetchInterval: false,
            refetchOnWindowFocus: false
        });

    return (
        <>
            <Loading isLoading={articleFetching}/>
            {articles?.map((article) =>
                <ErrorBoundary key={article.article_id}>
                    <Article
                        setArticleContext={setArticleContext}
                        article={article}
                        handleError={handleError}
                        articles={articles}
                        setArticles={setArticles}
                    />
                </ErrorBoundary>
            )}
        </>
    );
}

ArticleOuterContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
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

export default ArticleOuterContainer;
