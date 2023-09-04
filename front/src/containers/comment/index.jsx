import React, {useContext} from "react";
import Comment from "../../components/layouts/comment";
import authContext from "../../context/authContext";
import {useMutation} from "react-query";
import {deleteComment} from "../../api/commentCrud";
import PropTypes from "prop-types";
import {commentPropTypes} from "../../propTypes/commentPropTypes";

const CommentContainer = ({
    comment,
    setComment,
    setAddComment,
    setCommentFieldExpanded,
    deleteCommentFromArray,
    handleError
}) => {

    const {user: {user_id}, isAdmin} = useContext(authContext);

    const {mutate} = useMutation(deleteComment, {
        onSuccess: () => {
            deleteCommentFromArray(comment.comment_id);
        },
        onError: handleError
    });

    const handleDelete = () => {
        mutate(comment.comment_id);
    };

    const handleEdit = () => {
        setComment(comment);
        setAddComment(false);
        setCommentFieldExpanded(true);
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
        setCommentFieldExpanded(true);
        setAddComment(true);
    };

    return (
        <Comment
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
    setAddComment: PropTypes.func.isRequired,
    setCommentFieldExpanded: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    deleteCommentFromArray: PropTypes.func.isRequired
};

export default CommentContainer;
