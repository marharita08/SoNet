import React, {useContext, useEffect, useState} from "react";
import { useQuery} from "react-query";
import PropTypes from "prop-types";

import Article from "../../containers/article";
import ErrorBoundary from "../../components/ErrorBoundary";
import authContext from "../../context/authContext";
import {getAllNews, getNews, getCountOfNews, getCountOfAllNews} from "../../api/articlesCrud";
import LoadMoreBtn from "../../components/buttons/LoadMoreBtn";
import Loading from "../../components/loading";


const ArticlesContainer = ({setArticleContext, param, handleError, articles, setArticles}) => {
    const { user:{user_id} } = useContext(authContext);
    const [page, setPage] = useState(1);
    const [amount, setAmount] = useState();
    const limit = 10;
    let getFunc;
    let getCountFunc;
    if (param === 'news') {
        getFunc = getNews(page, limit);
        getCountFunc = getCountOfNews();
    } else if (param === 'all') {
        getFunc = getAllNews(page, limit);
        getCountFunc = getCountOfAllNews();
    }
    useEffect(() => {
        setArticles([]);
    },[param])
    const {isFetching: articlesFetching, isLoading} = useQuery(`articles ${param} ${user_id} ${page}`, () => getFunc, {
        onSuccess: (data) => setArticles([...articles, ...data?.data]),
        refetchInterval: false,
        refetchOnWindowFocus: false
    });

    const {isFetching: countFetching} = useQuery(`articles amount ${param} ${user_id}`, () => getCountFunc, {
        onSuccess: (data) => setAmount(data?.data.count),
        refetchInterval: false,
        refetchOnWindowFocus: false
    });

    const handleLoadMore = () => {
        setPage(page + 1);
    }

    return (
        <div>
            <Loading isLoading={articlesFetching}/>
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
            <Loading isLoading={countFetching}/>
            {
                amount > articles.length &&
                <LoadMoreBtn handleLoadMore={handleLoadMore} loading={isLoading}/>
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
