import React from "react";
import {CardContent, CardMedia, Typography} from "@mui/material";
import env from "../../../config/envConfig";
import {Link} from "react-router-dom";
import {articlePropTypes} from "../../../propTypes/articlePropTypes";

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
    article: articlePropTypes
}

export default ArticleContent;
