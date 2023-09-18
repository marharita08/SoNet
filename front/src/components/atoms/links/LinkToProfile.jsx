import React from "react";
import PropTypes from "prop-types";
import SNLink from "./SNLink";

const LinkToProfile = ({user_id, content, className}) => {

    return (
        <SNLink
            to={`/profile/${user_id}`}
            className={className}
            content={content}
        />
    )
}

LinkToProfile.propTypes = {
    user_id: PropTypes.number.isRequired,
    content: PropTypes.any.isRequired,
    className: PropTypes.string
}

export default LinkToProfile;
