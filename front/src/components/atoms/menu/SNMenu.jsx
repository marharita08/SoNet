import React from "react";
import {MenuItem, Menu} from "@mui/material";
import PropTypes from "prop-types";

const SNMenu = ({id, menuItems, anchorEl, onClose}) => {
    return (
        <Menu
            id={id}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={!!anchorEl}
            onClose={onClose}
        >
            {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                    {item.body}
                </MenuItem>
            ))}
        </Menu>
    );
};

SNMenu.propTypes = {
    id: PropTypes.string,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            body: PropTypes.node.isRequired,
            onClick: PropTypes.func.isRequired
        })
    ),
    anchorEl: PropTypes.object,
    onClose: PropTypes.func
};

export default SNMenu;
