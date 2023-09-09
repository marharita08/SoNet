import PropTypes from "prop-types";
import {Avatar, Card, CardHeader} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import React, {useState} from "react";
import MenuItemBody from "../../atoms/menu/MenuItemBody";
import SNMenu from "../../atoms/menu/SNMenu";
import {useTheme} from "@mui/material/styles";
import MoreVertIconBtn from "../../atoms/iconButtons/MoreVertIconBtn";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import CardUsername from "../../atoms/cardUsername/CardUsername";
import {userCardPropTypes} from "../../../propTypes/userPropTypes";
import LinkToProfile from "../../atoms/links/LinkToProfile";
import {useStyles} from "./style";

const UserCard = ({user, deleteRequest, isMenu, accept, decline}) => {

    const theme = useTheme();
    const classes = useStyles();

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
        <LinkToProfile
            user_id={user.user_id}
            content={
                <Card className={classes.card}>
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
                        title={
                            <CardUsername username={user.name}/>
                        }
                    />
                    {
                        isMenu &&
                        <SNMenu
                            menuItems={menuItems}
                            id={"request-menu"}
                            anchorEl={anchorEl}
                            onClose={handleMenuClose}
                        />
                    }
                </Card>
            }
        />
    );
};

UserCard.propTypes = {
    user: userCardPropTypes,
    deleteRequest: PropTypes.func,
    isMenu: PropTypes.bool,
    accept: PropTypes.func,
    decline: PropTypes.func,
};

UserCard.defaultProps = {
    isMenu: false,
};

export default UserCard;
