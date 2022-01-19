import PropTypes from 'prop-types';

import './article.css';
import {Link} from "react-router-dom";

const Article = ({article}) => {
    return (
        <div>
            <div className="article_outer">
                <div className="article_inner">
                    <Link to={"/profile/" + article.user.id}>
                    <div>
                        <div className="inline margin">
                            <img alt={"user image"} className="circle" width={50} src={article.user.avatar}/>
                        </div>
                        <div className="inline name">
                            {article.user.username}
                        </div>
                    </div>
                    </Link>
                    <div className="date margin">
                        {article.createdAt}
                    </div>
                    <div className="margin">
                        {article.text}
                    </div>
                    <div className="line" align={"center"}>
                        <div className="inline margin left">
                            {article.comments} comments
                        </div>
                        <div className={"inline"}>
                        <button className={"body_button"}>
                            Add comment
                        </button>
                        </div>
                        <div className="right">
                            <img alt={"like"} width={20} src="/images/like.svg" className="inline margin"/>
                            <div className="inline margin">{article.likes}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Article.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired
        }),
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        comments: PropTypes.number.isRequired
    })
};

export default Article;