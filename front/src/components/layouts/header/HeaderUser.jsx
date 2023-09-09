import React, {useState} from "react";
import {Avatar} from "@mui/material";
import SNMenu from "../../atoms/menu/SNMenu";
import {useTheme} from "@mui/material/styles";
import HeaderMenuItemBody from "../../atoms/menu/HeaderMenuItemBody";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import {userCardPropTypes} from "../../../propTypes/userPropTypes";
import {useStyles} from "./style";

const HeaderUser = ({authenticated, user, logout}) => {

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

    const handleLogout = () => {
        handleMenuClose();
        logout();
    };

    const menuItems = [
        {
            body: <HeaderMenuItemBody text={"Profile"} to={`/profile/${user?.user_id}`} icon={<PersonIcon/>}/>,
            onClick: handleMenuClose
        },
        {
            body: <HeaderMenuItemBody text={"Logout"} to={"/"} icon={<LogoutIcon/>}/>,
            onClick: handleLogout
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
    logout: PropTypes.func
};

export default HeaderUser;
