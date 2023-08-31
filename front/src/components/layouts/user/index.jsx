import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Avatar, Card, CardHeader, IconButton, Typography} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";
import "./user.css";
import MenuItemBody from "../../atoms/menu/MenuItemBody";
import SNMenu from "../../atoms/menu/SNMenu";
import {useTheme} from "@mui/material/styles";

const User = ({user, deleteRequest, menu, accept, decline}) => {

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = (event) => {
        event.preventDefault();
        setAnchorEl(null);
    };

    const acceptOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        accept(user.request_id);
    };

    const declineOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        decline(user.request_id);
    };

    const handleClose = (event) => {
        event.preventDefault();
        deleteRequest(user.request_id);
    };

    const menuItems = [
        {
            body: <MenuItemBody text={"Accept"} icon={<PersonAddIcon/>}/>,
            onClick: acceptOnClick
        },
        {
            body: <MenuItemBody text={"Decline"} icon={<PersonRemoveIcon/>}/>,
            onClick: declineOnClick
        }
    ];

    return (
        <>
            <Link to={`/profile/${user.user_id}`}>
                <Card className={"inline margin user-card"}>
                    <CardHeader
                        avatar={
                            <Avatar
                                src={user.avatar}
                                sx={theme.avatarSizes.lg}
                            />
                        }
                        action={
                            menu ?
                                <IconButton aria-label="settings" onClick={handleMenu}>
                                    <MoreVertIcon/>
                                </IconButton> :
                                <IconButton className="closebtn" onClick={handleClose}>
                                    <CloseIcon/>
                                </IconButton>
                        }
                        title={
                            <Typography sx={{fontWeight: "bold"}}>
                                {user.name}
                            </Typography>
                        }
                    />
                    <SNMenu menuItems={menuItems} id={"request-menu"} anchorEl={anchorEl} onClose={handleMenuClose}/>
                </Card>
            </Link>
        </>
    );
};

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
