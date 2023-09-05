import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {Avatar, Card, CardHeader, Typography} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import React, {useState} from "react";
import "./user.css";
import MenuItemBody from "../../atoms/menu/MenuItemBody";
import SNMenu from "../../atoms/menu/SNMenu";
import {useTheme} from "@mui/material/styles";
import MoreVertIconBtn from "../../atoms/iconButtons/MoreVertIconBtn";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import CardUsername from "../../atoms/cardUsername/CardUsername";

const User = ({user, deleteRequest, isMenu, accept, decline}) => {

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
                            isMenu ?
                                <MoreVertIconBtn onClick={handleMenu}/> :
                                <CloseIconBtn onClick={handleClose}/>
                        }
                        title={<CardUsername username={user.name}/>}
                    />
                    <SNMenu
                        menuItems={menuItems}
                        id={"request-menu"}
                        anchorEl={anchorEl}
                        onClose={handleMenuClose}
                    />
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
    isMenu: PropTypes.bool,
    accept: PropTypes.func,
    decline: PropTypes.func,
};

User.defaultProps = {
    isMenu: false,
    accept: () => {},
    decline: () => {}
};

export default User;
