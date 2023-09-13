import React from "react";
import {CardContent, CardMedia, Typography} from "@mui/material";
import env from "../../../config/envConfig";
import {articlePropTypes} from "../../../propTypes/articlePropTypes";
import LinkToArticle from "../../atoms/links/LinkToArticle";

const ArticleContent = ({article}) => {
    return (
        <LinkToArticle
            article_id={article.article_id}
            content={
                <>
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
                </>
            }
        />
    );
};

ArticleContent.propTypes = {
    article: articlePropTypes
};

export default ArticleContent;
