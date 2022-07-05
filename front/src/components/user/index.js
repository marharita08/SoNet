import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Avatar, Card, CardHeader, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {useState} from "react";

import env from "../../config/envConfig";
import './user.css';

const User = ({user, handleClose, menu, accept, decline}) => {

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
        accept(user.user_id);
    }

    const declineOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        decline(user.user_id);
    }

    return (
        <>
            <Link to={`/profile/${user.user_id}`} onClick={'update'}>
                <Card className={'inline margin width_100'}>
                    <CardHeader
                        avatar={
                            <Avatar
                                src={`${env.apiUrl}${user.avatar}`}
                                sx={{ width: 50, height: 50 }}
                            />
                        }
                        action={
                            (!menu &&
                            <IconButton
                                className="closebtn"
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleClose(user.user_id);
                                }}
                            >
                                <span>&times;</span>
                            </IconButton> )||
                            (menu &&
                            <IconButton aria-label="settings">
                                <MoreVertIcon onClick={handleMenu} />
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
        avatar: PropTypes.string.isRequired
    }),
    handleClose: PropTypes.func,
    menu: PropTypes.bool.isRequired,
    accept: PropTypes.func,
    decline: PropTypes.func,
};

export default User;
