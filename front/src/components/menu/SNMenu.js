import React from "react";
import {MenuItem, Menu} from "@mui/material";
import PropTypes from "prop-types";

const SNMenu = ({menuItems, anchorEl, onClose}) => {
    return (
        <Menu
            id="menu-article"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={onClose}
        >
            {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={item.onClick}>
                    {item.body}
                </MenuItem>
            ))}
        </Menu>
    )
}

SNMenu.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            body: PropTypes.node.isRequired,
            onClick: PropTypes.func.isRequired
        })
    ),
    anchorEl: PropTypes.object,
    onClose: PropTypes.func
}

export default SNMenu;
