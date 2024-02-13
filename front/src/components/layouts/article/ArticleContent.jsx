import React from "react";
import {CardContent, CardMedia, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";

import env from "../../../config/envConfig";
import {articlePropTypes} from "../../../propTypes/articlePropTypes";
import LinkToArticle from "../../atoms/links/LinkToArticle";
import {useStyles} from "../../style";

const ArticleContent = ({article, isTruncate}) => {

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
            <Typography className={isTruncate ? classes.truncateText : ""}>
              {article.text}
            </Typography>
          </CardContent>
        </>
      }
    />
  );
};

ArticleContent.propTypes = {
  article: articlePropTypes,
  isTruncate: PropTypes.bool.isRequired
};

export default ArticleContent;
