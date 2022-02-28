import './user.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import env from "../../config/envConfig";
import {Avatar, Card, CardHeader, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useState} from "react";

const User = ({user, handleClose, menu, approve, decline}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const approveOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        approve(user);
    }

    const declineOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        decline(user);
    }

    return (
        <>
            <Link to={"/profile/" + user.user_id} onClick={'update'}>
                <Card className={'inline margin width_100'}>
                    <CardHeader
                        avatar={
                            <Avatar
                                alt={user?.name}
                                src={`${env.apiUrl}${user.avatar}`}
                                sx={{ width: 50, height: 50 }}
                            />
                        }
                        action={
                            (!menu &&
                            <IconButton className="closebtn" onClick={handleClose}>
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
                        <MenuItem onClick={approveOnClick}>Approve</MenuItem>
                        <MenuItem onClick={declineOnClick}>Decline</MenuItem>
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
    handleClose: PropTypes.func.isRequired,
    menu: PropTypes.bool.isRequired,
    approve: PropTypes.func,
    decline: PropTypes.func,
};

export default User;
