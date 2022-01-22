import './comment.css';
import {Link} from "react-router-dom";
import moment from "moment";

const Comment = ({comment}) => {
    return (
        <div>
            <div className={"line"}>
                <div className="comment_outer">
                    <div className="comment_inner">
                <div style={{paddingLeft:(comment.level - 1) * 30}}>
                    <div className="inline_top margin">
                        <img alt={"user image"} className="circle" width={30} src={comment.avatar}/>
                    </div>
                    <div className={"inline width_80"}>
                        <div className="name inline">
                            {comment.name}
                        </div>
                        { comment.level !==1 &&
                            <div className={"inline margin"}>
                                to:
                                <Link to={'/profile/' + comment.p_user_id} className={"margin"}>{comment.to}</Link>
                            </div>
                        }
                        <div className={"margin"}>
                            {comment.text}
                        </div>
                    </div>
                    <div className={"inline right"} align={"right"}>
                        <div className={"date margin"}>
                            {moment(comment.commented_at).fromNow()}
                        </div>
                        <button className={"body_button"}>Reply</button>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Comment;
