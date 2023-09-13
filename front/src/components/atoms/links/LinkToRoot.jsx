import React from "react";
import PropTypes from "prop-types";
import SNLink from "./SNLink";

const LinkToRoot = ({content, className}) => {

    return (
        <SNLink
            to={"/"}
            className={className}
            content={content}
        />
    )
}

LinkToRoot.propTypes = {
    content: PropTypes.any.isRequired,
    className: PropTypes.string
}

export default LinkToRoot;
