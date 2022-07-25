import React, {useContext} from "react";
import { useQuery} from "react-query";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

import Article from "../../containers/article";
import ErrorBoundary from "../../components/ErrorBoundary";
import authContext from "../../context/authContext";
import {getAllNews, getNews} from "../../api/usersCrud";


const ArticlesContainer = ({setArticleContext, param, handleError}) => {
    const { user:{user_id} } = useContext(authContext);
    let getFunc;
    if (param === 'news') {
        getFunc = getNews(user_id);
    } else if (param === 'all') {
        getFunc = getAllNews(user_id);
    }
    const {isFetching, data} = useQuery(`articles ${param}`, () => getFunc);
    const articles = data?.data;

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
                        setArticleContext={setArticleContext}
                        article={article}
                        handleError={handleError}
                    />
                </ErrorBoundary>
            )}
        </div>
    );
}

ArticlesContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    param: PropTypes.string.isRequired,
    handleError: PropTypes.func.isRequired,
}

export default ArticlesContainer;
