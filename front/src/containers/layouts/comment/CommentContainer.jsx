import React, {useContext} from "react";
import CommentComponent from "../../../components/layouts/comment/CommentComponent";
import authContext from "../../../context/authContext";
import {useMutation} from "react-query";
import {deleteComment} from "../../../api/commentCrud";
import PropTypes from "prop-types";
import {commentPropTypes} from "../../../propTypes/commentPropTypes";
import handleErrorContext from "../../../context/handleErrorContext";

const CommentContainer = ({
    comment,
    setComment,
    setIsCommentAdd,
    setIsExpanded,
    onCommentDelete,
}) => {

    const {user: {user_id}, isAdmin} = useContext(authContext);
    const {handleError} = useContext(handleErrorContext);

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
        setComment({
            parent_id: comment.comment_id,
            level: comment.level + 1,
            to: comment.name,
            parent_text: comment.text,
            user_id,
            article_id: comment.article_id,
            path: comment.path,
            text: "",
        });
        setIsExpanded(true);
        setIsCommentAdd(true);
    };

    return (
        <CommentComponent
            comment={comment}
            isCurrentUser={comment.user_id === user_id}
            isAdmin={isAdmin}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleReply={handleReply}
        />
    );
};

CommentContainer.propTypes = {
    comment: commentPropTypes,
    setComment: PropTypes.func.isRequired,
    setIsCommentAdd: PropTypes.func.isRequired,
    setIsExpanded: PropTypes.func.isRequired,
    onCommentDelete: PropTypes.func.isRequired
};

export default CommentContainer;
