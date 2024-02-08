import PropTypes from "prop-types";
import {usersPopoverPropTypes} from "../../../propTypes/userPropTypes";

export const articleActionsPropTypes = {
  likesAmount: PropTypes.number,
  commentsAmount: PropTypes.number,
  likedUsers: usersPopoverPropTypes,
  flags: PropTypes.shape({
    isCommentsExpanded: PropTypes.bool.isRequired,
    isAddOrEditCommentExpanded: PropTypes.bool.isRequired,
    isLiked: PropTypes.bool,
    isLikesFetching: PropTypes.bool,
    isCommentsFetching: PropTypes.bool,
  }),
  actions: PropTypes.shape({
    handleCommentsExpand: PropTypes.func.isRequired,
    handleAddComment: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
  })
};

export const articleActionsDefaultProps = {
  likesAmount: 0,
  commentsAmount: 0,
  likedUsers: [],
  flags: {
    isLiked: false,
    isLikesFetching: false,
    isCommentsFetching: false
  }
};
