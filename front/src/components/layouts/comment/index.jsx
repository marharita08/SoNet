import React, {useState} from "react";
import moment from "moment";
import {CardContent, CardHeader, Divider, Typography} from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SNMenu from "../../atoms/menu/SNMenu";
import MenuItemBody from "../../atoms/menu/MenuItemBody";
import {commentPropTypes} from "../../../propTypes/commentPropTypes";
import CommentHeaderTitle from "./CommentHeaderTitle";
import {useStyles} from "./style";
import CommentHeaderAvatar from "./CommentHeaderAvatar";
import CommentHeaderActions from "./CommentHeaderActions";

const Comment = ({
    comment,
    handleEdit,
    handleDelete,
    isAdmin,
    isCurrentUser,
    handleReply
}) => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const editOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        handleEdit();
    };

    const deleteOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        handleDelete();
    };

    const menuItems = [
        {
            body: <MenuItemBody text={"Edit"} icon={<EditIcon/>}/>,
            onClick: editOnClick
        },
        {
            body: <MenuItemBody text={"Delete"} icon={<DeleteIcon/>}/>,
            onClick: deleteOnClick
        }
    ];

    return (
        <>
            <Divider/>
            <div style={{paddingLeft: (comment.level - 1) * 30}}>
                <CardHeader
                    avatar={
                        <CommentHeaderAvatar comment={comment}/>
                    }
                    action={
                        <CommentHeaderActions
                            handleMenu={handleMenu}
                            handleReply={handleReply}
                            isMenu={isCurrentUser || isAdmin}
                        />
                    }
                    title={
                        <CommentHeaderTitle comment={comment}/>
                    }
                    subheader={moment(comment.commented_at).fromNow()}
                    className={classes.cardHeader}
                />
                <SNMenu
                    id={"menu-comment"}
                    menuItems={menuItems}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="body2">
                        {comment.text}
                    </Typography>
                </CardContent>
            </div>
        </>
    );
};

Comment.propTypes = {
    comment: commentPropTypes.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    handleReply: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired
};

export default Comment;
