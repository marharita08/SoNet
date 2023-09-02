import React from "react";
import ProgressOrComponent from "../../atoms/progressOrComponent/ProgressOrComponent";
import CommentsIconBtn from "../../atoms/iconButtons/CommentsIconBtn";
import AddCommentIconBtn from "../../atoms/iconButtons/AddCommentIconBtn";
import LikeIconBtn from "../../atoms/iconButtons/LikeIconBtn";
import AvatarPopover from "./AvatarPopover";
import {CardActions} from "@mui/material";
import PropTypes from "prop-types";

const ArticleActions = ({
    commentsFetching,
    likesFetching,
    handleExpandClick,
    handleAddCommentClick,
    handleLikeClick,
    commentsExpanded,
    addCommentExpanded,
    isLiked,
    comments,
    likes,
    users
}) => {

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
                isProgress={commentsFetching}
                component={
                    <CommentsIconBtn
                        onClick={handleExpandClick}
                        commentsExpanded={commentsExpanded}
                        comments={comments}
                    />
                }
            />
            <AddCommentIconBtn onClick={handleAddCommentClick} expand={addCommentExpanded}/>
            <ProgressOrComponent
                isProgress={likesFetching}
                component={
                    <LikeIconBtn
                        onClick={handleLikeClick}
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                        isLiked={isLiked}
                        likes={likes}/>
                }
            />
            {
                users?.length !== 0 &&
                <AvatarPopover anchorEl={popoverAnchorEl} onClose={handlePopoverClose} users={users}/>
            }
        </CardActions>
    )
}

ArticleActions.propTypes = {
    commentsExpanded: PropTypes.bool.isRequired,
    addCommentExpanded: PropTypes.bool.isRequired,
    handleExpandClick: PropTypes.func.isRequired,
    handleAddCommentClick: PropTypes.func.isRequired,
    handleLikeClick: PropTypes.func.isRequired,
    isLiked: PropTypes.bool,
    likes: PropTypes.number,
    comments: PropTypes.number,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            user_id: PropTypes.number.isRequired,
            avatar: PropTypes.string
        })
    ),
    likesFetching: PropTypes.bool,
    commentsFetching: PropTypes.bool
}

export default ArticleActions;
