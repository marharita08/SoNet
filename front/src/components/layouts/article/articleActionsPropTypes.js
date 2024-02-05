import PropTypes from "prop-types";
import {usersPopoverPropTypes} from "../../../propTypes/userPropTypes";

export const articleActionsPropTypes = {
  isCommentsExpanded: PropTypes.bool.isRequired,
  isAddOrEditCommentExpanded: PropTypes.bool.isRequired,
  handleCommentsExpand: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
  isLiked: PropTypes.bool,
  likesAmount: PropTypes.number,
  commentsAmount: PropTypes.number,
  likedUsers: usersPopoverPropTypes,
  isLikesFetching: PropTypes.bool,
  isCommentsFetching: PropTypes.bool
};

export const articleActionsDefaultProps = {
  isLiked: false,
  likesAmount: 0,
  commentsAmount: 0,
  likedUsers: [],
  isLikesFetching: false,
  isCommentsFetching: false
};
