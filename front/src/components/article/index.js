import PropTypes from 'prop-types';

import './article.css';

import env from "../../config/envConfig";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader, CardMedia, Divider,
    IconButton,
    Menu,
    MenuItem,
    styled,
    Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from "react-router-dom";
import {useState} from "react";

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
    handleLikeClick,
    isCurrentUser,
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
        handleEdit(article);
    }

    return (
        <div className="article_outer">
            <div className="article_inner">
                <Card sx={{ maxWidth: 1000 }}>
                    <Link to={`/profile/${article.user_id}`} style={{"text-decoration":"none"}}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    alt={article?.name}
                                    src={`${env.apiUrl}${article.avatar}`}
                                    sx={{ width: 60, height: 60 }}
                                />
                            }
                            action={
                                isCurrentUser &&
                                <IconButton aria-label="settings">
                                    <MoreVertIcon onClick={handleMenu} />
                                </IconButton>
                            }
                            title={
                                <Typography sx={{"font-weight": "bold"}}>
                                    {article.name}
                                </Typography>
                            }
                            subheader={article.created_at}
                        />
                    </Link>
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
                        <MenuItem onClick={editOnClick}>{`Edit`}</MenuItem>
                    </Menu>
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
                        <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
                            <FavoriteIcon />
                            {article.likes}
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </div>
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
    handleExpandClick: PropTypes.func.isRequired,
    handleLikeClick: PropTypes.func.isRequired,
    isCurrentUser: PropTypes.bool.isRequired
};

export default Article;
