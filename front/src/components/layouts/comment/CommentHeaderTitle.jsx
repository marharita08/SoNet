import React from "react";
import {commentPropTypes} from "../../../propTypes/commentPropTypes";
import {useStyles} from "../../style";
import LinkToProfile from "../../atoms/links/LinkToProfile";

const CommentHeaderTitle = ({comment}) => {

  const classes = useStyles();

  return (
    <>
      <LinkToProfile
        user_id={comment.user_id}
        content={comment.name}
        className={classes.bold}
      />
      {
        comment.p_user_id &&
        <>
          <span className={classes.leftMargin}>
            to:
          </span>
          <LinkToProfile
            user_id={comment.p_user_id}
            content={comment.to}
            className={classes.leftMargin}
          />
        </>
      }
    </>
  );
};

CommentHeaderTitle.propTypes = {
  comment: commentPropTypes
};

export default CommentHeaderTitle;
