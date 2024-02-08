import React, {useContext} from "react";
import {useMutation} from "react-query";
import PropTypes from "prop-types";

import AddOrEditCommentComponent from "../../../components/layouts/addOrEditComment/AddOrEditCommentComponent";
import authContext from "../../../context/authContext";
import {insertComment, updateComment} from "../../../api/commentCrud";
import {commentAddPropTypes} from "../../../propTypes/commentPropTypes";
import handleResponseContext from "../../../context/handleResponseContext";

const AddOrEditCommentContainer = ({comment, isCommentAdd, actions}) => {

  const {handleCancel, onCommentAdd, onCommentUpdate, setCurrentInitComment, setCommentsExpanded} = actions;
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
      actions={{onSubmit, handleCancel}}
      flags={{
        isCommentAdd,
        isLoading: insertLoading || updateLoading
      }}
    />
  );
};

AddOrEditCommentContainer.propTypes = {
  comment: commentAddPropTypes.isRequired,
  isCommentAdd: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    handleCancel: PropTypes.func.isRequired,
    onCommentAdd: PropTypes.func.isRequired,
    onCommentUpdate: PropTypes.func.isRequired,
    setCurrentInitComment: PropTypes.func.isRequired,
    setCommentsExpanded: PropTypes.func.isRequired
  })
};

export default AddOrEditCommentContainer;
