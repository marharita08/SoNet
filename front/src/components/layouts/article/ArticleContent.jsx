import React from "react";
import {CardContent, CardMedia, Typography} from "@mui/material";
import env from "../../../config/envConfig";
import {articlePropTypes} from "../../../propTypes/articlePropTypes";
import LinkToArticle from "../../atoms/links/LinkToArticle";
import {useStyles} from "../../style";
import {useTheme} from "@mui/material/styles";

const ArticleContent = ({article}) => {

    const classes = useStyles();
    const theme = useTheme();

    return (
        <LinkToArticle
            article_id={article.article_id}
            content={
                <>
                    {
                        article.image &&
                        <div className={classes.articleImgContainer}>
                            <CardMedia
                                component={"img"}
                                image={
                                    article.image.startsWith("http") ?
                                        article.image : `${env.apiUrl}${article.image}`
                                }
                                sx={theme.articleImg}
                            />
                        </div>
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
