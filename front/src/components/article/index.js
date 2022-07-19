import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar, AvatarGroup,
    Card,
    CardActions,
    CardContent,
    CardHeader, CardMedia, Divider,
    IconButton,
    Menu,
    MenuItem, Popover,
    styled,
    Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCommentIcon from '@mui/icons-material/AddComment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import {useState} from "react";

import env from "../../config/envConfig";
import './article.css';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <div {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Article = ({
    article,
    commentsExpanded,
    handleEdit,
    handleExpandClick,
    handleDelete,
    isCurrentUser,
    isAdmin,
    isLiked,
    handleAddCommentClick,
    handleLikeClick,
    likes,
    users
}) => {
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setPopoverAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setPopoverAnchorEl(null);
    };

    const open = Boolean(popoverAnchorEl);


    const handleMenu = (event) => {
        event.preventDefault();
        setMenuAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuAnchorEl(null);
    };

    const editOnClick = (event) => {
        event.preventDefault();
        setMenuAnchorEl(null);
        handleEdit(article);
    }

    const deleteOnClick = (event) => {
        event.preventDefault();
        setMenuAnchorEl(null);
        handleDelete(article.article_id);
    }

    return (
        <Card sx={{ maxWidth: 1000}}>
            <CardHeader
                avatar={
                    <Link to={`/profile/${article.user_id}`} style={{textDecoration:"none"}}>
                        <Avatar
                            src={article.avatar}
                            sx={{ width: 60, height: 60 }}
                        />
                    </Link>
                }
                action={
                    (isCurrentUser || isAdmin) &&
                    <IconButton aria-label="settings">
                        <MoreVertIcon onClick={handleMenu} />
                    </IconButton>
                }
                title={
                    <Typography sx={{"font-weight": "bold"}}>
                        <Link to={`/profile/${article.user_id}`} style={{textDecoration:"none"}}>
                            {article.name}
                        </Link>
                    </Typography>
                }
                subheader={article.created_at}
            />
            <Menu
                id="menu-article"
                anchorEl={menuAnchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={Boolean(menuAnchorEl)}
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
            <Link to={`/article/${article.article_id}`} style={{textDecoration:"none"}}>
                {
                    article.image!==undefined && article.image &&
                    <CardMedia
                        component={"img"}
                        image={`${env.apiUrl}${article.image}`}
                    />
                }
                <CardContent>
                    <Typography>
                        {article.text}
                    </Typography>
                </CardContent>
                <Divider/>
                <CardActions disableSpacing>
                    <IconButton
                        onClick={handleExpandClick}
                        aria-expanded={commentsExpanded}
                        aria-label="show more"
                    >
                        {article.comments}
                        <CommentIcon/>
                        <ExpandMore expand={commentsExpanded}>
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </IconButton>
                    <IconButton onClick={handleAddCommentClick}>
                        <AddCommentIcon/>
                    </IconButton>
                    <IconButton
                        onClick={handleLikeClick}
                        aria-owns={open ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={handlePopoverOpen}
                        onMouseLeave={handlePopoverClose}
                    >
                        {
                            isLiked ?
                                <FavoriteIcon color={"error"}/> :
                                <FavoriteBorderIcon/>
                        }
                        {likes}
                    </IconButton>
                    {
                        users?.length !== 0 &&
                        <Popover
                            id="mouse-over-popover"
                            sx={{
                                pointerEvents: 'none',
                            }}
                            open={open}
                            anchorEl={popoverAnchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                        >
                            <AvatarGroup max={5} className={'margin'}>
                                {users?.map((user) =>
                                    <Avatar
                                        src={user.avatar}
                                        sx={{width: 30, height: 30}}
                                    />
                                )}
                            </AvatarGroup>
                        </Popover>
                    }
                </CardActions>
            </Link>
        </Card>
    );
}

Article.propTypes = {
    article: PropTypes.shape({
        article_id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        comments: PropTypes.number.isRequired,
    }),
    commentsExpanded: PropTypes.bool.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleExpandClick: PropTypes.func.isRequired,
    handleLikeClick: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    handleAddCommentClick: PropTypes.func.isRequired
};

export default Article;
