import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const LinkToProfile = ({user_id, content, className}) => {
    return (
        <Link to={`/profile/${user_id}`} className={className}>
            {content}
        </Link>
    )
}

LinkToProfile.propTypes = {
    user_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired|PropTypes.node.isRequired,
    className: PropTypes.string
}

export default LinkToProfile;
