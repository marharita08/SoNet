import React from "react";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {IconButton} from "@mui/material";
import {ExpandMore} from "../expandMore/ExpandMore";
import PropTypes from "prop-types";

const CommentsIconBtn = ({onClick, commentsExpanded, comments}) => {
  return (
    <IconButton
      onClick={onClick}
      aria-expanded={commentsExpanded}
      aria-label="show more"
    >
      {comments}
      <CommentIcon/>
      <ExpandMore expand={commentsExpanded}>
        <ExpandMoreIcon/>
      </ExpandMore>
    </IconButton>
  );
};

CommentsIconBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  commentsExpanded: PropTypes.bool.isRequired,
  comments: PropTypes.number
};

CommentsIconBtn.defaultProps = {
  comments: 0
};

export default CommentsIconBtn;
