import React, {useContext, useState} from "react";
import { useQuery} from "react-query";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

import Article from "../../containers/article";
import ErrorBoundary from "../../components/ErrorBoundary";
import authContext from "../../context/authContext";
import {getAllNews, getNews} from "../../api/articlesCrud";
import LoadMoreBtn from "../../components/loadMoreBtn/loadMoreBtn";


const ArticlesContainer = ({setArticleContext, param, handleError, articles, setArticles}) => {
    const { user:{user_id} } = useContext(authContext);
    const [limit, setLimit] = useState(10);
    let getFunc;
    if (param === 'news') {
        getFunc = getNews();
    } else if (param === 'all') {
        getFunc = getAllNews();
    }
    const {isFetching} = useQuery(`articles ${param} ${user_id}`, () => getFunc, {
        onSuccess: (data) => setArticles(data?.data)
    });

    const handleLoadMore = () => {
        setLimit(limit + 10);
    }

    return (
        <div>
            {isFetching &&
                <div align={"center"}>
                    <ReactLoading type={'balls'} color='#001a4d'/>
                </div>
            }
            {articles?.slice(0, limit).map((article) =>
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
            {
                articles?.length > limit &&
                <LoadMoreBtn handleLoadMore={handleLoadMore}/>
            }
        </div>
    );
}

ArticlesContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    param: PropTypes.string.isRequired,
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

export default ArticlesContainer;
