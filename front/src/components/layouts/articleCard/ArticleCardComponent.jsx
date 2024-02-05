import React from "react";
import ErrorBoundary from "../../ErrorBoundary";
import {Card, Collapse} from "@mui/material";
import {useStyles} from "../../style";
import PropTypes from "prop-types";

const ArticleCardComponent = ({
  articleComponent,
  addOrEditCommentComponent,
  commentsComponent,
  isAddOrEditCommentExpanded,
  isCommentsExpanded
}) => {

  const classes = useStyles();

  return (
    <Card className={classes.articleCard}>
      <ErrorBoundary>
        {articleComponent}
      </ErrorBoundary>
      <ErrorBoundary>
        <Collapse in={isAddOrEditCommentExpanded} timeout="auto" unmountOnExit>
          {addOrEditCommentComponent}
        </Collapse>
      </ErrorBoundary>
      <Collapse in={isCommentsExpanded} timeout="auto" unmountOnExit>
        {commentsComponent}
      </Collapse>
    </Card>
  );
};

ArticleCardComponent.propTypes = {
  articleComponent: PropTypes.node.isRequired,
  addOrEditCommentComponent: PropTypes.node.isRequired,
  commentsComponent: PropTypes.node.isRequired,
  isAddOrEditCommentExpanded: PropTypes.bool.isRequired,
  isCommentsExpanded: PropTypes.bool.isRequired
};

export default ArticleCardComponent;
