import React, {useContext} from "react";
import {useMutation} from "react-query";
import PropTypes from "prop-types";

import CommentComponent from "../../../components/layouts/comment/CommentComponent";
import authContext from "../../../context/authContext";
import {deleteComment} from "../../../api/commentCrud";
import {commentPropTypes} from "../../../propTypes/commentPropTypes";
import handleResponseContext from "../../../context/handleResponseContext";
import {initCommentForReply} from "../../../config/initValues";

const CommentContainer = ({comment, actions}) => {

  const {setComment, setIsCommentAdd, setIsExpanded, onCommentDelete} = actions;
  const {user: {user_id}, isAdmin} = useContext(authContext);
  const {handleError} = useContext(handleResponseContext);

  const {mutate} = useMutation(deleteComment, {
    onSuccess: () => {
      onCommentDelete(comment.comment_id);
    },
    onError: handleError
  });

  const handleDelete = () => {
    mutate(comment.comment_id);
  };

  const handleEdit = () => {
    setComment(comment);
    setIsCommentAdd(false);
    setIsExpanded(true);
  };

  const handleReply = () => {
    setComment(initCommentForReply(comment, user_id));
    setIsExpanded(true);
    setIsCommentAdd(true);
  };

  return (
    <CommentComponent
      comment={comment}
      actions={{handleDelete, handleEdit, handleReply}}
      flags={{isAdmin, isCurrentUser: comment.user_id === user_id}}
    />
  );
};

CommentContainer.propTypes = {
  comment: commentPropTypes,
  actions: PropTypes.shape({
    setComment: PropTypes.func.isRequired,
    setIsCommentAdd: PropTypes.func.isRequired,
    setIsExpanded: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired
  })
};

export default CommentContainer;
