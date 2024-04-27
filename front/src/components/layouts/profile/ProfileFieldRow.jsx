import React from "react";
import PropTypes from "prop-types";
import {useStyles} from "./style";

const ProfileFieldRow = ({content, label, visibility, flags}) => {

  const {isAdmin, isCurrentUser, isFriends} = flags;
  const classes = useStyles();
  const isField = !!content;
  const isVisible = isField && (isAdmin || isCurrentUser || !visibility || visibility === "All" ||
    isFriends && visibility === "Friends");

  return (
    <>
      {
        isVisible &&
        <div className={classes.fieldWrapper}>
          <div className={classes.field}>
            <div className={classes.label}>
              {label}
            </div>
            <div className={classes.content}>
              {content}
            </div>
          </div>
          <hr/>
        </div>
      }
    </>
  );
};

ProfileFieldRow.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.string,
  visibility: PropTypes.string,
  flags: PropTypes.shape({
    isFriends: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isCurrentUser: PropTypes.bool
  }),
};

ProfileFieldRow.dafaultProps = {
  visibility: undefined,
  visibilityLabel: undefined,
  flags: {
    isFriends: false,
    isAdmin: false,
    isCurrentUser: false
  }
};

export default ProfileFieldRow;
