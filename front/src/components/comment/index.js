import './comment.css';
import {Link} from "react-router-dom";
import moment from "moment";
import env from "../../config/envConfig";
import {Avatar, Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
import PropTypes from "prop-types";


const Comment = ({comment}) => {
    return (
        <div>
            <div className="comment_outer">
                <div className="comment_inner">
                    <Card>
                        <div style={{paddingLeft:(comment.level - 1) * 40}}>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt={comment.name}
                                        src={`${env.apiUrl}${comment.avatar}`}
                                        sx={{ width: 30, height: 30 }}
                                    />
                                }
                                action={
                                    <Button>Reply</Button>
                                }
                                title={
                                    <div>
                                        <div className="name inline">
                                            {comment.name}
                                        </div>
                                        {
                                            comment.level !==1 &&
                                            <div className={"inline"} style={{"margin-left":"5px"}}>
                                                to:
                                                <Link
                                                    to={'/profile/' + comment.p_user_id}
                                                    style={{"margin-left":"5px"}}
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
                                sx={{"padding":"10px","padding-bottom":"5px"}}
                            />
                            <CardContent sx={{"padding":"10px","padding-top":"5px"}}>
                                <Typography variant="body2">
                                    {comment.text}
                                </Typography>
                            </CardContent>
                        </div>
                    </Card>
                </div>
            </div>
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
    })
}

export default Comment;
