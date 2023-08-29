import React from "react";
import PropTypes from "prop-types";

const MenuItemBody = ({icon, text}) => {
    return (
        <div className={"menu-item"}>
            <span>{icon}</span>
            <span className={"margin"}>{text}</span>
        </div>
    )
}

MenuItemBody.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
}

export default MenuItemBody;
