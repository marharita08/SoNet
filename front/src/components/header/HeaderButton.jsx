import React from "react";
import PropTypes from "prop-types";

const HeaderButton = ({icon, text, className, onClick}) => {
    return (
        <button className={className} onClick={onClick}>
            <div>{icon}</div>
            <div className={"header-btn-text"}>{text}</div>
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
