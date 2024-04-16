import React, {useContext, useEffect} from "react";
import PropTypes from "prop-types";

import ArticleCardContainer from "../../layouts/articleCard/ArticleCardContainer";
import ErrorBoundary from "../../../components/ErrorBoundary";
import authContext from "../../../context/authContext";
import {getAllNews, getNews} from "../../../api/articlesCrud";
import {articlesPropTypes} from "../../../propTypes/articlePropTypes";
import ArticlesPageComponent from "../../../components/pages/articlesPage/ArticlesPageComponent";
import NavigateFabContainer from "../../layouts/navigateFab/NavigateFabContainer";
import {useQueryWrapper} from "../../../hooks/useQueryWrapper";
import {useLoadMoreVisibility} from "./useLoadMoreVisibility";
import {useIncrement} from "./useIncrement";


const ArticlesPageContainer = ({setArticleContext, param, articles, setArticles}) => {

  const {user: {user_id}} = useContext(authContext);

  const {number: page, increment: handleLoadMore} = useIncrement();
  const {isCountFetching, isLoadMoreVisible} = useLoadMoreVisibility(param, user_id, articles.length);

  const limit = 10;
  let getFunc;

  if (param === "news") {
    getFunc = getNews;
  } else if (param === "all") {
    getFunc = getAllNews;
  }

  useEffect(() => {
    setArticles([]);
  }, [param]);

  const {isFetching: isArticlesFetching, isLoading} = useQueryWrapper(
    `articles ${param} ${user_id} ${page}`,
    () => getFunc(page, limit),
    {
      onSuccess: (data) => {
        setArticles([...articles, ...data?.data])
      }
    }
  );

  return (
    <>
      <ArticlesPageComponent
        articlesComponent={
          <>
            {
              articles?.map((article) =>
                <ErrorBoundary key={article.article_id}>
                  <ArticleCardContainer
                    setArticleContext={setArticleContext}
                    article={article}
                    articles={articles}
                    setArticles={setArticles}
                  />
                </ErrorBoundary>
              )
            }
            <NavigateFabContainer/>
          </>
        }
        flags={{isArticlesFetching, isCountFetching, isLoading, isLoadMoreVisible}}
        handleLoadMore={handleLoadMore}
      />
    </>
  );
};

ArticlesPageContainer.propTypes = {
  setArticleContext: PropTypes.func.isRequired,
  param: PropTypes.string.isRequired,
  articles: articlesPropTypes,
  setArticles: PropTypes.func.isRequired,
};

export default ArticlesPageContainer;
