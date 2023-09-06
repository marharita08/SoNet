import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../layouts/header/style";

const HeaderButton = ({icon, text, className, onClick}) => {

    const classes = useStyles();

    return (
        <button className={`${classes.button} ${className}`} onClick={onClick}>
            <div>{icon}</div>
            <div className={classes.buttonText}>{text}</div>
        </button>
    );
};

HeaderButton.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default HeaderButton;
