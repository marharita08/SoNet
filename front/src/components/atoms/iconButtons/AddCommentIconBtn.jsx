import React from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import {ExpandMore} from "../expandMore/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {IconButton} from "@mui/material";
import PropTypes from "prop-types";

const AddCommentIconBtn = ({onClick, expand}) => {
  return (
    <IconButton onClick={onClick}>
      <AddCommentIcon/>
      <ExpandMore expand={expand}>
        <ExpandMoreIcon/>
      </ExpandMore>
    </IconButton>
  );
};

AddCommentIconBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  expand: PropTypes.bool.isRequired
};

export default AddCommentIconBtn;
