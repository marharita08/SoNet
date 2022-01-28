import PropTypes from 'prop-types';

import './article.css';

import env from "../../config/envConfig";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader, Divider,
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
import {useState} from "react";
import {useBetween} from "use-between";
import {articleState} from "../addArticle";
import {modalState} from "../../containers/header";
import {Link} from "react-router-dom";

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

export const commentsExpandState = () => {
    const [expanded, setExpanded] = useState(false);
    return {
        expanded, setExpanded
    }
}

const Article = ({article}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {expanded, setExpanded} = useBetween(commentsExpandState);
    const {setArticle, setAddArticle} = useBetween(articleState);
    const {setOpen} = useBetween(modalState);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLikeClick = (event) => {
        event.preventDefault();
    };

    const handleMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = (event) => {
        event.preventDefault();
        setArticle(article);
        setAddArticle(false)
        setOpen(true)
        setAnchorEl(null);
    }

    return (
        <div className="article_outer">
            <div className="article_inner">
                <Card sx={{ maxWidth: 1000 }}>
                    <Link to={`/profile/${article.user_id}`} style={{"text-decoration":"none"}}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    alt={"user image"}
                                    src={`${env.apiUrl}${article.avatar}`}
                                    sx={{ width: 60, height: 60 }}
                                />
                            }
                            action={
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
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    </Menu>
                    <CardContent>
                        <Typography>
                            {article.text}
                        </Typography>
                    </CardContent>
                    <Divider/>
                    <CardActions disableSpacing>
                        <IconButton
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            {article.comments}
                            <CommentIcon/>
                            <ExpandMore expand={expanded}>
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
        comments: PropTypes.number.isRequired
    })
};

export default Article;
