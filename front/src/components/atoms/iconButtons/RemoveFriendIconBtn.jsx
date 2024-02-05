import React from "react";
import {IconButton} from "@mui/material";
import PropTypes from "prop-types";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const RemoveFriendIconBtn = ({onClick}) => {
  return (
    <IconButton onClick={onClick}>
      <PersonRemoveIcon/>
    </IconButton>
  );
};

RemoveFriendIconBtn.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RemoveFriendIconBtn;
