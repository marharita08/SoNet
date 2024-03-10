import PropTypes from "prop-types";
import {Avatar, Card, CardHeader} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import React, {useState} from "react";
import {useTheme} from "@mui/material/styles";

import MenuItemBody from "../../atoms/menu/MenuItemBody";
import SNMenu from "../../atoms/menu/SNMenu";
import MoreVertIconBtn from "../../atoms/iconButtons/MoreVertIconBtn";
import CloseIconBtn from "../../atoms/iconButtons/CloseIconBtn";
import CardUsername from "../../atoms/cardUsername/CardUsername";
import {userCardPropTypes} from "../../../propTypes/userPropTypes";
import LinkToProfile from "../../atoms/links/LinkToProfile";
import {useStyles} from "./style";

const UserCard = ({user, isMenu, isRecommendation, actions}) => {

  const {deleteRequest, acceptRequest, declineRequest, addRequest, hideRecommendation} = actions;
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
    acceptRequest(user.request_id);
  };

  const declineOnClick = (event) => {
    event.preventDefault();
    setAnchorEl(null);
    declineRequest(user.request_id);
  };

  const addOnClick = (event) => {
    event.preventDefault();
    setAnchorEl(null);
    addRequest(user.user_id);
  }

  const hideOnClick = (event) => {
    event.preventDefault();
    setAnchorEl(null);
    hideRecommendation(user.user_id)
  }

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

  const recommendationMenuItems = [
    {
      body:<MenuItemBody text={"Add to friends"} icon={<PersonAddIcon/>}/>,
      onClick: addOnClick
    },
    {
      body: <MenuItemBody text={"Hide"} icon={<PersonRemoveIcon/>}/>,
      onClick: hideOnClick
    }
  ]

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
            subheader={user.city_name}
          />
          {
            isMenu &&
            <SNMenu
              menuItems={isRecommendation ? recommendationMenuItems : menuItems}
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
  isMenu: PropTypes.bool,
  isRecommendation: PropTypes.bool,
  actions: PropTypes.shape({
    deleteRequest: PropTypes.func,
    acceptRequest: PropTypes.func,
    declineRequest: PropTypes.func,
    addRequest: PropTypes.func,
    hideRecommendation: PropTypes.func
  })
};

UserCard.defaultProps = {
  isMenu: false,
  isRecommendation: false
};

export default UserCard;
