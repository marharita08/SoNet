import React, {useContext} from "react";
import AddComment from "../../components/layouts/addComment";
import authContext from "../../context/authContext";
import {useMutation} from "react-query";
import {insertComment, updateComment} from "../../api/commentCrud";
import PropTypes from "prop-types";

const AddCommentContainer = ({
    comment,
    addComment,
    handleCancel,
    addCommentToArray,
    updateCommentInArray,
    handleError,
    setCurrentInitComment,
    setCommentsExpanded
}) => {

    const {user} = useContext(authContext);


    const {mutate: insertMutate, isLoading: insertLoading} = useMutation(insertComment, {
        onSuccess: (data) => {
            const {data: {comment: addedComment}} = data;
            addCommentToArray(addedComment);
            setCurrentInitComment();
            setCommentsExpanded(true);
        },
        onError: handleError
    });

    const {mutate: updateMutate, isLoading: updateLoading} = useMutation(updateComment, {
        onSuccess: (data) => {
            const {data: {comment: updatedComment}} = data;
            updateCommentInArray(updatedComment);
            setCurrentInitComment();
            setCommentsExpanded(true);
        },
        onError: handleError
    });

    const onSubmit = (data) => {
        if (addComment) {
            insertMutate(data);
        } else {
            updateMutate(data);
        }
    };

    return (
        <AddComment
            user={user}
            comment={comment}
            onSubmit={onSubmit}
            isLoading={insertLoading || updateLoading}
            addComment={addComment}
            handleCancel={handleCancel}
        />
    );
};

AddCommentContainer.propTypes = {
    comment: PropTypes.shape({
        level: PropTypes.number.isRequired,
        to: PropTypes.string,
        text: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        parent_id: PropTypes.number,
    }),
    addComment: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    addCommentToArray: PropTypes.func.isRequired,
    updateCommentInArray: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    setCurrentInitComment: PropTypes.func.isRequired,
    setCommentsExpanded: PropTypes.func.isRequired
};

export default AddCommentContainer;
