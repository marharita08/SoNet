import React, {useContext, useEffect, useState} from "react";
import {useQuery} from "react-query";
import PropTypes from "prop-types";

import ArticleCardContainer from "../../layouts/articleCard/ArticleCardContainer";
import ErrorBoundary from "../../../components/ErrorBoundary";
import authContext from "../../../context/authContext";
import {getAllNews, getNews, getCountOfNews, getCountOfAllNews} from "../../../api/articlesCrud";
import {articlesPropTypes} from "../../../propTypes/articlePropTypes";
import ArticlesPageComponent from "../../../components/pages/articlesPage/ArticlesPageComponent";
import {refetchOff} from "../../../config/refetchOff";
import NavigateFabContainer from "../../layouts/navigateFab/NavigateFabContainer";


const ArticlesPageContainer = ({setArticleContext, param, articles, setArticles}) => {
  const {user: {user_id}} = useContext(authContext);

  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState();

  const limit = 10;
  let getFunc;
  let getCountFunc;

  if (param === "news") {
    getFunc = getNews(page, limit);
    getCountFunc = getCountOfNews();
  } else if (param === "all") {
    getFunc = getAllNews(page, limit);
    getCountFunc = getCountOfAllNews();
  }

  useEffect(() => {
    setArticles([]);
  }, [param]);

  const {isFetching: isArticlesFetching, isLoading} = useQuery(
    `articles ${param} ${user_id} ${page}`,
    () => getFunc,
    {
      onSuccess: (data) => setArticles([...articles, ...data?.data]),
      ...refetchOff
    }
  );

  const {isFetching: isCountFetching} = useQuery(
    `articles amount ${param} ${user_id}`,
    () => getCountFunc,
    {
      onSuccess: (data) => setAmount(data?.data.count),
      ...refetchOff
    }
  );

  const handleLoadMore = () => {
    setPage(page + 1);
  };

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
        flags={{isArticlesFetching, isCountFetching, isLoading, isLoadMoreVisible: amount > articles.length}}
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
