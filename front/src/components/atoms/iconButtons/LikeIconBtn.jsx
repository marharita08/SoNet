import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {IconButton} from "@mui/material";
import PropTypes from "prop-types";

const LikeIconBtn = ({onClick, onMouseEnter, onMouseLeave, isLiked, likes}) => {
  return (
    <IconButton
      onClick={onClick}
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {
        isLiked ? <FavoriteIcon color={"error"}/> : <FavoriteBorderIcon/>
      }
      {likes}
    </IconButton>
  );
};

LikeIconBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  isLiked: PropTypes.bool,
  likes: PropTypes.number
};

LikeIconBtn.defaultProps = {
  likes: 0,
  isLiked: false
};

export default LikeIconBtn;
