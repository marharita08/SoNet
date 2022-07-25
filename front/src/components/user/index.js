import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Avatar, Card, CardHeader, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";

import './user.css';

const User = ({user, deleteRequest, menu, accept, decline}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const acceptOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        accept(user.request_id);
    }

    const declineOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        decline(user.request_id);
    }

    const handleClose = (event) => {
        event.preventDefault();
        deleteRequest(user.request_id);
    }

    return (
        <>
            <Link to={`/profile/${user.user_id}`} onClick={'update'}>
                <Card className={'inline margin width_100'}>
                    <CardHeader
                        avatar={
                            <Avatar
                                src={user.avatar}
                                sx={{ width: 50, height: 50 }}
                            />
                        }
                        action={
                            (!menu &&
                            <IconButton className="closebtn" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton> )||
                            (menu &&
                            <IconButton aria-label="settings" onClick={handleMenu}>
                                <MoreVertIcon/>
                            </IconButton>)
                        }
                        title={
                            <Typography sx={{"font-weight": "bold"}}>
                                {user.name}
                            </Typography>
                        }
                    />
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
                        <MenuItem onClick={acceptOnClick}>
                            <PersonAddIcon/>
                            <div className={"margin"}>
                                Accept
                            </div>
                        </MenuItem>
                        <MenuItem onClick={declineOnClick}>
                            <PersonRemoveIcon/>
                            <div className={"margin"}>
                                Decline
                            </div>
                        </MenuItem>
                    </Menu>
                </Card>
            </Link>
        </>
    );
}

User.propTypes = {
    user: PropTypes.shape({
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string
    }),
    deleteRequest: PropTypes.func,
    menu: PropTypes.bool.isRequired,
    accept: PropTypes.func,
    decline: PropTypes.func,
};

export default User;
