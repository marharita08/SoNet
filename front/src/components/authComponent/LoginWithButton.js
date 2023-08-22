import React from "react";
import PropTypes from "prop-types";

const LoginWithButton = ({icon, text, onclick, className}) => {
    return (
        <button onClick={onclick} className={`login-btns ${className}`}>
            <span className={"icon"}>{icon}</span>
            <span>{text}</span>
        </button>
    )
}

LoginWithButton.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    onclick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default LoginWithButton;
