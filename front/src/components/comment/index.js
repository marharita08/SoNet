import {Link} from "react-router-dom";
import {useState} from "react";
import moment from "moment";
import {Avatar, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import PropTypes from "prop-types";
import ReplyIcon from '@mui/icons-material/Reply';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import env from "../../config/envConfig";
import './comment.css';


const Comment = ({
    comment,
    handleEdit,
    handleDelete,
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
        handleDelete(comment.comment_id);
    }

    return (
        <Card>
            <div style={{paddingLeft: (comment.level - 1) * 30}}>
                <CardHeader
                    avatar={
                        <Link to={`/profile/${comment.user_id}`}>
                            <Avatar
                                alt={comment.name}
                                src={`${env.apiUrl}${comment.avatar}`}
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
                                isCurrentUser &&
                                <IconButton aria-label="settings">
                                    <MoreVertIcon onClick={handleMenu}/>
                                </IconButton>
                            }
                        </div>
                    }
                    title={
                        <div>
                            <div className="name inline">
                                <Link to={`/profile/${comment.user_id}`} style={{"text-decoration": "none"}}>
                                    {comment.name}
                                </Link>
                            </div>
                            {
                                comment.level !== 1 &&
                                <div className={"inline"} style={{"margin-left": "5px"}}>
                                    to:
                                    <Link
                                        to={`/profile/${comment.p_user_id}`}
                                        style={{"margin-left": "5px"}}
                                    >
                                        {comment.to}
                                    </Link>
                                </div>
                            }
                        </div>
                    }
                        subheader={
                            <Typography
                                sx={{
                                    "font-size": "10px",
                                    "color": "gray"
                                }}
                            >
                                {moment(comment.commented_at).fromNow()}
                            </Typography>
                        }
                        sx={{"padding": "10px", "padding-bottom": "5px"}}
                    />
                    <Menu
                        id="menu-article"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={editOnClick}>
                            <EditIcon fontSize={"small"}/>
                            <div className={"margin"}>
                                Edit
                            </div>
                        </MenuItem>
                        <MenuItem onClick={deleteOnClick}>
                            <DeleteIcon fontSize={"small"}/>
                            <div className={"margin"}>
                                Delete
                            </div>
                        </MenuItem>
                    </Menu>
                    <CardContent sx={{"padding": "10px", "padding-top": "5px"}}>
                        <Typography variant="body2">
                            {comment.text}
                        </Typography>
                    </CardContent>
                </div>

    </Card>
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
    isCurrentUser: PropTypes.bool.isRequired,
    handleReply: PropTypes.func.isRequired
}

export default Comment;
