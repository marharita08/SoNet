import React, {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Avatar} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DescriptionIcon from "@mui/icons-material/Description";
import HeaderButton from "../buttons/HeaderButton";
import HeaderMenuItemBody from "../menu/HeaderMenuItemBody";
import SNMenu from "../menu/SNMenu";
import {useTheme} from "@mui/material/styles";

const Header = ({handleClickOpen, user, authenticated, logout, isAdmin}) => {

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
        <header>
            <div className={"header-logo"}>
                <Link to={"/"}>
                    <img src={"/logo.png"} alt={"Social Network"} className={"logo"}/>
                </Link>
            </div>
            {
                authenticated &&
                <div className={"header-btns"}>
                    <Link to={"/"}>
                        <HeaderButton text={"Home"} icon={<HomeIcon fontSize={"small"}/>} className={"home-btn"}/>
                    </Link>
                    {
                        isAdmin &&
                        <Link to={"/all-articles"}>
                            <HeaderButton text={"All articles"} icon={<DescriptionIcon fontSize={"small"}/>}/>
                        </Link>
                    }
                    <HeaderButton
                        text={"Add article"}
                        icon={<NoteAddIcon fontSize={"small"}/>}
                        onClick={handleClickOpen}/>
                </div>
            }
            {
                authenticated &&
                <div className={"curr-user"}>
                    <button onClick={handleMenu}>
                        <span className={"inline"}>
                            <Avatar
                                src={user.avatar}
                                className={"header-avatar"}
                                sx={theme.avatarSizes.md}
                            />
                        </span>
                        <span className={"username"}>{user.name}</span>
                    </button>
                    <SNMenu id={"menu-header"} menuItems={menuItems} anchorEl={anchorEl} onClose={handleMenuClose}/>
                </div>
            }
        </header>
    );
};

Header.propTypes = {
    handleClickOpen: PropTypes.func,
    user: PropTypes.object,
    authenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func,
    isAdmin: PropTypes.bool,
};

export default Header;
