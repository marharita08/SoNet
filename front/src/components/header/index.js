import React, {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Avatar, Menu, MenuItem} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DescriptionIcon from '@mui/icons-material/Description';

const Header = ({handleClickOpen, user, authenticated, logout, isAdmin}) => {
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
    }

    return (
        <>
            <header>
                <div className={"header-logo"}>
                    <Link to={"/"}>
                        <img src={'/logo.png'} alt={"Social Network"} className={"logo"} onClick={'update'}/>
                        <img src={'/minilogo.png'} alt={"Social Network"} className={"minilogo"} onClick={'update'}/>
                    </Link>
                </div>
                <div className={"header-btns"}>
                    <Link to={"/"}>
                        <button onClick={'update'} className={"home-btn"}>
                            <div><HomeIcon fontSize={"small"}/></div>
                            <div className={"btn-text"}>Home</div>
                        </button>
                    </Link>
                    {
                        authenticated && isAdmin &&
                        <Link to={"/all-articles"}>
                            <button onClick={'update'}>
                                <div><DescriptionIcon fontSize={"small"}/></div>
                                <div className={"btn-text"}>All articles</div>
                            </button>
                        </Link>
                    }
                    {
                        authenticated &&
                        <button onClick={handleClickOpen}>
                            <div><NoteAddIcon fontSize={"small"}/></div>
                            <div className={"btn-text"}>Add article</div>
                        </button>
                    }
                </div>
                {
                    authenticated &&
                    <div className={"curr-user"}>
                        <button
                            onClick={handleMenu}
                        >
                            <span className={"inline"}>
                                <Avatar
                                    src={user.avatar}
                                    sx={{ width: 40,
                                        height: 40,
                                        margin: '0 5px'
                                    }}
                                />
                            </span>
                            <span className={'username'}>{user.name}</span>
                        </button>
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
                            onClose={handleMenuClose}
                        >
                            <Link to={`/profile/${user.user_id}`}
                                  onClick={'update'}
                                  style={{'textDecoration': 'none'}}
                            >
                                <MenuItem>
                                    <PersonIcon/>
                                    <div className={"margin"}>
                                        Profile
                                    </div>
                                </MenuItem>
                            </Link>
                            <Link to={"/"} style={{'textDecoration': 'none'}}>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon/>
                                    <div className={"margin"}>
                                        Logout
                                    </div>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </div>
                }
            </header>
        </>
    );
}

Header.propTypes = {
    handleClickOpen: PropTypes.func,
    user: PropTypes.object,
    authenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func,
    isAdmin: PropTypes.bool,
}

export default Header;
