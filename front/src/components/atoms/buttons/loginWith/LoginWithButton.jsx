import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "./loginWithBtnsStyle";

const LoginWithButton = ({icon, text, onClick, className}) => {

    const classes = useStyles();

    return (
        <button onClick={onClick} className={`${classes.loginWithBtn} ${className}`}>
            <span className={classes.icon}>{icon}</span>
            <span>{text}</span>
        </button>
    );
};

LoginWithButton.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default LoginWithButton;
