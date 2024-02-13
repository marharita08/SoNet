import React from "react";
import PropTypes from "prop-types";

import ReplyIconButton from "../../atoms/iconButtons/ReplyIconButton";
import MoreVertIconBtn from "../../atoms/iconButtons/MoreVertIconBtn";

const CommentHeaderActions = ({handleReply, handleMenu, isMenu}) => {
  return (
    <>
      <ReplyIconButton onClick={handleReply}/>
      {
        isMenu && <MoreVertIconBtn onClick={handleMenu}/>
      }
    </>
  );
};

CommentHeaderActions.propTypes = {
  handleReply: PropTypes.func.isRequired,
  handleMenu: PropTypes.func.isRequired,
  isMenu: PropTypes.bool.isRequired
};

export default CommentHeaderActions;
