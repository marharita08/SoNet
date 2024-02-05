import React from "react";
import ReplyIconButton from "../../atoms/iconButtons/ReplyIconButton";
import MoreVertIconBtn from "../../atoms/iconButtons/MoreVertIconBtn";
import PropTypes from "prop-types";

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
