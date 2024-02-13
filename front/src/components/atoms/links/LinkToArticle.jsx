import React from "react";
import PropTypes from "prop-types";
import SNLink from "./SNLink";

const LinkToArticle = ({article_id, content, className}) => {

  return (
    <SNLink
      to={`/article/${article_id}`}
      className={className}
      content={content}
    />
  );
};

LinkToArticle.propTypes = {
  article_id: PropTypes.number.isRequired,
  content: PropTypes.any.isRequired,
  className: PropTypes.string
};

export default LinkToArticle;
