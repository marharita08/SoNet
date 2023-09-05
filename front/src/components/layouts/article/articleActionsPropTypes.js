import PropTypes from "prop-types";
import {usersPopoverPropTypes} from "../../../propTypes/userPropTypes";

export const articleActionsPropTypes = {
    commentsExpanded: PropTypes.bool.isRequired,
    addCommentExpanded: PropTypes.bool.isRequired,
    handleExpandClick: PropTypes.func.isRequired,
    handleAddCommentClick: PropTypes.func.isRequired,
    handleLikeClick: PropTypes.func.isRequired,
    isLiked: PropTypes.bool,
    likes: PropTypes.number,
    comments: PropTypes.number,
    users: usersPopoverPropTypes,
    likesFetching: PropTypes.bool,
    commentsFetching: PropTypes.bool
};

export const articleActionsDefaultProps = {
    isLiked: false,
    likes: 0,
    comments: 0,
    users: [],
    likesFetching: false,
    commentsFetching: false
};
