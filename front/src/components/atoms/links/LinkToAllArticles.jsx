import React from "react";
import PropTypes from "prop-types";
import SNLink from "./SNLink";

const LinkToAllArticles = ({content, className}) => {

    return (
        <SNLink
            to={"/all-articles"}
            className={className}
            content={content}
        />
    )
}

LinkToAllArticles.propTypes = {
    content: PropTypes.any.isRequired,
    className: PropTypes.string
}

export default LinkToAllArticles;