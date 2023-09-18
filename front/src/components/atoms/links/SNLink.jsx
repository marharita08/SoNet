import React from "react";
import {Link} from "react-router-dom";
import {useStyles} from "../../style";
import PropTypes from "prop-types";

const SNLink = ({to, content, className, ...props}) => {

    const classes = useStyles();

    return (
        <Link to={to} className={`${classes.link} ${className}`} {...props}>
            {content}
        </Link>
    )
}

SNLink.propTypes = {
    to: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
    className: PropTypes.string
}

export default SNLink;
