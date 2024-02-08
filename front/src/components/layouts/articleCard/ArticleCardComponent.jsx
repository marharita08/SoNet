import React from "react";
import {Card, Collapse} from "@mui/material";
import PropTypes from "prop-types";

import ErrorBoundary from "../../ErrorBoundary";
import {useStyles} from "../../style";

const ArticleCardComponent = ({articleComponent, addOrEditCommentComponent, commentsComponent, flags}) => {

  const {isAddOrEditCommentExpanded, isCommentsExpanded} = flags;
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
  flags: PropTypes.shape({
    isAddOrEditCommentExpanded: PropTypes.bool.isRequired,
    isCommentsExpanded: PropTypes.bool.isRequired
  })
};

export default ArticleCardComponent;
