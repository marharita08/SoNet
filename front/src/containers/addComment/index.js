import React, {useContext} from "react";
import AddComment from "../../components/addComment";
import authContext from "../../context/authContext";
import {useMutation} from "react-query";
import {insertComment, updateComment} from "../../api/commentCrud";
import PropTypes from "prop-types";

const AddCommentContainer = ({comment, addComment, handleCancel}) => {
    const { user } = useContext(authContext);

    const { mutate: insertMutate, isLoading: insertLoading } = useMutation(insertComment);

    const {mutate: updateMutate, isLoading: updateLoading } = useMutation(updateComment);

    const onSubmit = (data) => {
        if (addComment) {
            insertMutate(data);
        } else {
            updateMutate(data);
        }
    }

    return (
        <AddComment
            user={user}
            comment={comment}
            onSubmit={onSubmit}
            loading={insertLoading||updateLoading}
            addComment={addComment}
            handleCancel={handleCancel}
        />
    )
}

AddCommentContainer.propTypes = {
    comment: PropTypes.shape({
        level: PropTypes.number.isRequired,
        to: PropTypes.string,
        text: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        parent_id: PropTypes.number,
    }),
    addComment: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired
}

export default AddCommentContainer;
