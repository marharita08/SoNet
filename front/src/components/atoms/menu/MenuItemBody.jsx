import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "../../style";

const MenuItemBody = ({icon, text}) => {

    const classes = useStyles();

    return (
        <div className={classes.menuItem}>
            <span>{icon}</span>
            <span className={classes.margin}>{text}</span>
        </div>
    );
};

MenuItemBody.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
};

export default MenuItemBody;
