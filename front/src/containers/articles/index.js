import React, {useContext} from "react";
import { useQuery} from "react-query";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";

import Article from "../../containers/article";
import ErrorBoundary from "../../components/ErrorBoundary";
import authContext from "../../context/authContext";
import {getNews} from "../../api/usersCrud";


const ArticlesContainer = ({setArticleContext}) => {
    const { user:{user_id} } = useContext(authContext);
    const {isFetching, data} = useQuery('articles', () => getNews(user_id));
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
                    />
                </ErrorBoundary>
            )}
        </div>
    );
}

ArticlesContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
}

export default ArticlesContainer;
