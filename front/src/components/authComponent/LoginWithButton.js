import React from "react";
import PropTypes from "prop-types";

const LoginWithButton = ({icon, text, onClick, className}) => {
    return (
        <button onClick={onClick} className={`login-btns ${className}`}>
            <span className={"icon"}>{icon}</span>
            <span>{text}</span>
        </button>
    )
}

LoginWithButton.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default LoginWithButton;
