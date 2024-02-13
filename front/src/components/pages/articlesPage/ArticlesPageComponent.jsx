import React from "react";
import PropTypes from "prop-types";

import CentredLoading from "../../atoms/loading/CentredLoading";
import LoadMoreBtn from "../../atoms/buttons/LoadMoreBtn";

const ArticlesPageComponent = ({articlesComponent, handleLoadMore, flags}) => {

  const {isArticlesFetching, isLoading, isCountFetching, isLoadMoreVisible} = flags;

  return (
    <>
      <CentredLoading isLoading={isArticlesFetching}/>
      {articlesComponent}
      {
        isLoadMoreVisible &&
        <LoadMoreBtn
          handleLoadMore={handleLoadMore}
          isLoading={isLoading || isCountFetching}
        />
      }
    </>
  );
};

ArticlesPageComponent.propTypes = {
  articlesComponent: PropTypes.node.isRequired,
  flags: PropTypes.shape({
    isArticlesFetching: PropTypes.bool,
    isLoadMoreVisible: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    isCountFetching: PropTypes.bool,
  }),
  handleLoadMore: PropTypes.func.isRequired
};

export default ArticlesPageComponent;
