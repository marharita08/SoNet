import React from "react";
import {CardContent, CardMedia, Typography} from "@mui/material";
import env from "../../../config/envConfig";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ArticleContent = ({article}) => {
    return (
        <Link to={`/article/${article.article_id}`}>
            {
                article.image &&
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
        </Link>
    )
}

ArticleContent.propTypes = {
    article: PropTypes.shape({
        article_id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        image: PropTypes.string,
    })
}

export default ArticleContent;
