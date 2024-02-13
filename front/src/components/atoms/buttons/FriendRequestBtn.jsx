import React from "react";
import {Button, CircularProgress} from "@mui/material";
import PropTypes from "prop-types";

const FriendRequestBtn = ({isVisible, isLoading, onClick, text, icon}) => {
  return (
    <>
      {
        isVisible &&
        <Button
          size={"small"}
          onClick={onClick}
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress color="inherit" size={25}/> : icon
          }
        >
          {text}
        </Button>
      }
    </>
  );
};

FriendRequestBtn.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};

export default FriendRequestBtn;
