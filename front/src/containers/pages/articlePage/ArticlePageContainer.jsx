import React, {useContext} from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import PropTypes from "prop-types";
import ErrorBoundary from "../../../components/ErrorBoundary";
import ArticleCardContainer from "../../layouts/articleCard/ArticleCardContainer";
import {getArticle} from "../../../api/articlesCrud";
import authContext from "../../../context/authContext";
import {articlesPropTypes} from "../../../propTypes/articlePropTypes";
import ArticlePageComponent from "../../../components/pages/articlePage/ArticlePageComponent";
import {refetchOff} from "../../../config/refetchOff";


const ArticlePageContainer = ({setArticleContext, articles, setArticles}) => {

    let {id} = useParams();
    const {user: {user_id}} = useContext(authContext);

    const {isFetching} = useQuery(
        `article ${id}-${user_id}`,
        () => getArticle(id),
        {
            onSuccess: (data) => setArticles(data?.data),
            ...refetchOff
        }
    );

    return (
        <>
            <ArticlePageComponent
                articleComponent={
                    articles?.map((article) =>
                        <ErrorBoundary key={article.article_id}>
                            <ArticleCardContainer
                                setArticleContext={setArticleContext}
                                article={article}
                                articles={articles}
                                setArticles={setArticles}
                                isTruncate={false}
                            />
                        </ErrorBoundary>
                    )
                }
                isLoading={isFetching}
            />
        </>
    );
};

ArticlePageContainer.propTypes = {
    setArticleContext: PropTypes.func.isRequired,
    articles: articlesPropTypes,
    setArticles: PropTypes.func.isRequired,
};

export default ArticlePageContainer;
