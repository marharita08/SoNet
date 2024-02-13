import React from "react";
import {CardActions} from "@mui/material";

import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import CommentsIconBtn from "../../atoms/iconButtons/CommentsIconBtn";
import AddCommentIconBtn from "../../atoms/iconButtons/AddCommentIconBtn";
import LikeIconBtn from "../../atoms/iconButtons/LikeIconBtn";
import AvatarPopover from "./AvatarPopover";
import {articleActionsPropTypes, articleActionsDefaultProps} from "./articleActionsPropTypes";

const ArticleActions = ({commentsAmount, likesAmount, likedUsers, actions, flags}) => {

  const {handleCommentsExpand, handleAddComment, handleLike} = actions;
  const {isCommentsFetching, isLikesFetching, isCommentsExpanded, isAddOrEditCommentExpanded, isLiked} = flags;
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  return (
    <CardActions disableSpacing>
      <ProgressOrComponent
        isProgress={isCommentsFetching}
        component={
          <CommentsIconBtn
            onClick={handleCommentsExpand}
            commentsExpanded={isCommentsExpanded}
            comments={commentsAmount}
          />
        }
      />
      <AddCommentIconBtn onClick={handleAddComment} expand={isAddOrEditCommentExpanded}/>
      <ProgressOrComponent
        isProgress={isLikesFetching}
        component={
          <LikeIconBtn
            onClick={handleLike}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            isLiked={isLiked}
            likes={likesAmount}
          />
        }
      />
      {
        likedUsers?.length !== 0 &&
        <AvatarPopover anchorEl={popoverAnchorEl} onClose={handlePopoverClose} users={likedUsers}/>
      }
    </CardActions>
  );
};

ArticleActions.propTypes = articleActionsPropTypes;
ArticleActions.defaultProps = articleActionsDefaultProps;

export default ArticleActions;
