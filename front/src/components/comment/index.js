import {Link} from "react-router-dom";
import React, {useState} from "react";
import moment from "moment";
import {Avatar, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import PropTypes from "prop-types";
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import './comment.css';
import SNMenu from "../menu/SNMenu";
import MenuItemBody from "../menu/MenuItemBody";


const Comment = ({
    comment,
    handleEdit,
    handleDelete,
    isAdmin,
    isCurrentUser,
    handleReply
}) => {
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
    }

    const deleteOnClick = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        handleDelete();
    }

    const menuItems = [
        {
            body: <MenuItemBody text={"Edit"} icon={<EditIcon/>}/>,
            onClick: editOnClick
        },
        {
            body: <MenuItemBody text={"Delete"} icon={<DeleteIcon/>}/>,
            onClick: deleteOnClick
        }
    ]

    return (
        <div style={{paddingLeft: (comment.level - 1) * 30}}>
            <CardHeader
                avatar={
                    <Link to={`/profile/${comment.user_id}`}>
                        <Avatar
                            alt={comment.name}
                            src={comment.avatar}
                            sx={{width: 30, height: 30}}
                        />
                    </Link>
                }
                action={
                    <div>
                        <IconButton>
                            <ReplyIcon onClick={handleReply}/>
                        </IconButton>
                        {
                            (isCurrentUser || isAdmin) &&
                            <IconButton aria-label="settings">
                                <MoreVertIcon onClick={handleMenu}/>
                            </IconButton>
                        }
                    </div>
                }
                title={
                    <div>
                        <div className="name inline">
                            <Link to={`/profile/${comment.user_id}`} style={{textDecoration: "none"}}>
                                {comment.name}
                            </Link>
                        </div>
                        {
                            comment.level !== 1 &&
                            <div className={"inline"} style={{marginLeft: "5px"}}>
                                to:
                                <Link
                                    to={`/profile/${comment.p_user_id}`}
                                    style={{marginLeft: "5px"}}
                                >
                                    {comment.to}
                                </Link>
                            </div>
                        }
                    </div>
                }
                subheader={
                    <Typography sx={{fontSize: "10px", color: "gray"}}>
                            {moment(comment.commented_at).fromNow()}
                    </Typography>
                }
                sx={{padding: "10px", paddingBottom: "5px"}}
            />
            <SNMenu id={"menu-comment"} menuItems={menuItems} anchorEl={anchorEl} onClose={handleClose}/>
            <CardContent sx={{padding: "10px", paddingTop: "5px"}}>
                <Typography variant="body2">
                    {comment.text}
                </Typography>
            </CardContent>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        level: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        to: PropTypes.string,
        commented_at: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }),
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool,
    handleReply: PropTypes.func.isRequired
}

export default Comment;
