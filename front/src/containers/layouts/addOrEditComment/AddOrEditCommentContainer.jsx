import React, {useContext} from "react";
import AddOrEditCommentComponent from "../../../components/layouts/addOrEditComment/AddOrEditCommentComponent";
import authContext from "../../../context/authContext";
import {useMutation} from "react-query";
import {insertComment, updateComment} from "../../../api/commentCrud";
import PropTypes from "prop-types";
import {commentAddPropTypes} from "../../../propTypes/commentPropTypes";
import handleResponseContext from "../../../context/handleResponseContext";

const AddOrEditCommentContainer = ({
  comment,
  isCommentAdd,
  handleCancel,
  onCommentAdd,
  onCommentUpdate,
  setCurrentInitComment,
  setCommentsExpanded
}) => {

  const {user} = useContext(authContext);
  const {handleError} = useContext(handleResponseContext);


  const {mutate: insertMutate, isLoading: insertLoading} = useMutation(insertComment, {
    onSuccess: (data) => {
      const {data: {comment: addedComment}} = data;
      onCommentAdd(addedComment);
      setCurrentInitComment();
      setCommentsExpanded(true);
    },
    onError: handleError
  });

  const {mutate: updateMutate, isLoading: updateLoading} = useMutation(updateComment, {
    onSuccess: (data) => {
      const {data: {comment: updatedComment}} = data;
      onCommentUpdate(updatedComment);
      setCurrentInitComment();
      setCommentsExpanded(true);
    },
    onError: handleError
  });

  const onSubmit = (data) => {
    if (isCommentAdd) {
      insertMutate(data);
    } else {
      updateMutate(data);
    }
  };

  return (
    <AddOrEditCommentComponent
      user={user}
      comment={comment}
      onSubmit={onSubmit}
      isLoading={insertLoading || updateLoading}
      isCommentAdd={isCommentAdd}
      handleCancel={handleCancel}
    />
  );
};

AddOrEditCommentContainer.propTypes = {
  comment: commentAddPropTypes.isRequired,
  isCommentAdd: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onCommentAdd: PropTypes.func.isRequired,
  onCommentUpdate: PropTypes.func.isRequired,
  setCurrentInitComment: PropTypes.func.isRequired,
  setCommentsExpanded: PropTypes.func.isRequired
};

export default AddOrEditCommentContainer;
