import React, {useContext} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import PropTypes from "prop-types";
import ErrorBoundary from "../../components/ErrorBoundary";
import Article from "../article";
import {getArticle} from "../../api/articlesCrud";
import authContext from "../../context/authContext";
import {articlesPropTypes} from "../../propTypes/articlePropTypes";
import CentredLoading from "../../components/atoms/loading/CentredLoading";


const ArticleOuterContainer = ({setArticleContext, handleError, articles, setArticles}) => {
    let {id} = useParams();
    const {user: {user_id}} = useContext(authContext);

    const {isFetching} = useQuery(
        `article ${id}-${user_id}`,
        () => getArticle(id),
        {
            onSuccess: (data) => setArticles(data?.data),
            refetchInterval: false,
            refetchOnWindowFocus: false
        }
    );

    return (
        <>
            <CentredLoading isLoading={isFetching}/>
            {
                articles?.map((article) =>
                    <ErrorBoundary key={article.article_id}>
                        <Article
                            setArticleContext={setArticleContext}
                            article={article}
                            handleError={handleError}
                            articles={articles}
                            setArticles={setArticles}
                        />
                    </ErrorBoundary>
                )
            }
        </>
    );
};

ArticleOuterContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    articles: articlesPropTypes,
    setArticles: PropTypes.func.isRequired,
};

export default ArticleOuterContainer;
