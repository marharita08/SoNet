import React from "react";
import CentredLoading from "../../atoms/loading/CentredLoading";
import PropTypes from "prop-types";

const ArticlePageComponent = ({isLoading, articleComponent}) => {
  return (
    <>
      <CentredLoading isLoading={isLoading}/>
      {articleComponent}
    </>
  );
};

ArticlePageComponent.propTypes = {
  isLoading: PropTypes.bool,
  articleComponent: PropTypes.node.isRequired
};

export default ArticlePageComponent;
