import React from "react";
import {Avatar} from "@mui/material";
import {useTheme} from "@mui/material/styles";

import LinkToProfile from "../../atoms/links/LinkToProfile";
import {commentPropTypes} from "../../../propTypes/commentPropTypes";

const CommentHeaderAvatar = ({comment}) => {

  const theme = useTheme();

  return (
    <LinkToProfile
      user_id={comment.user_id}
      content={
        <Avatar
          alt={comment.name}
          src={comment.avatar}
          sx={theme.avatarSizes.md}
        />
      }
    />
  );
};

CommentHeaderAvatar.propTypes = {
  comment: commentPropTypes
};

export default CommentHeaderAvatar;
