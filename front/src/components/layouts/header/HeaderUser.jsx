import React, {useState} from "react";
import {Avatar} from "@mui/material";
import SNMenu from "../../atoms/menu/SNMenu";
import {useTheme} from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import {userCardPropTypes} from "../../../propTypes/userPropTypes";
import {useStyles} from "./style";
import LinkToProfile from "../../atoms/links/LinkToProfile";
import MenuItemBody from "../../atoms/menu/MenuItemBody";
import LinkToRoot from "../../atoms/links/LinkToRoot";

const HeaderUser = ({authenticated, user, handleLogout}) => {

    const classes = useStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const logoutOnClick = () => {
        handleMenuClose();
        handleLogout();
    };

    const menuItems = [
        {
            body:
                <LinkToProfile
                    user_id={user?.user_id}
                    content={
                        <MenuItemBody text={"Profile"} icon={<PersonIcon/>}/>
                    }
                />,
            onClick: handleMenuClose
        },
        {
            body:
                <LinkToRoot
                    content={
                        <MenuItemBody text={"Logout"} icon={<LogoutIcon/>}/>
                    }
                />,
            onClick: logoutOnClick
        }
    ];

    return (
        <>
            {
                authenticated &&
                <div className={classes.currentUser}>
                    <button onClick={handleMenu} className={`${classes.button} ${classes.userButton}`}>
                        <Avatar
                            src={user.avatar}
                            className={classes.avatar}
                            sx={theme.avatarSizes.md}
                        />
                        <span className={classes.username}>
                            {user.name}
                        </span>
                    </button>
                    <SNMenu
                        id={"menu-header"}
                        menuItems={menuItems}
                        anchorEl={anchorEl}
                        onClose={handleMenuClose}
                    />
                </div>
            }
        </>
    );
};

HeaderUser.propTypes = {
    authenticated: PropTypes.bool,
    user: userCardPropTypes,
    handleLogout: PropTypes.func
};

export default HeaderUser;
