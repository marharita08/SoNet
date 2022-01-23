import PropTypes from 'prop-types';

import './article.css';
import {Link} from "react-router-dom";

const Article = ({article}) => {
    return (
        <div>
            <div className="article_outer">
                <div className="article_inner">
                    <div>
                        <Link to={"/profile/" + article.user_id}>
                        <div className="inline margin">
                            <img alt={"user image"} className="circle" width={50} src={article.avatar}/>
                        </div>
                        <div className="inline name">
                            {article.name}
                        </div>
                        </Link>
                    </div>
                    <div className="date margin">
                        {article.created_at}
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
