import React from "react";
import PropTypes from "prop-types";

import CentredLoading from "../../atoms/loading/CentredLoading";

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
