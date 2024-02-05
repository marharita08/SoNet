import React from "react";
import {Field} from "formik";
import {TextField} from "formik-mui";
import PropTypes from "prop-types";
import {useStyles} from "./style";

const ProfileFieldRow = ({name, label, visibilityName, visibilityLabel, flags}) => {

  const {isAdmin, isCurrentUser, isFriends, isField} = flags;
  const classes = useStyles();

  return (
    <>
      {
        isField && (isAdmin || isCurrentUser || !visibilityName || visibilityLabel === "All" ||
          isFriends && visibilityLabel === "Friends") &&
        <div>
          <div
            className={
              `${classes.field} ${(isAdmin || isCurrentUser ? classes.notFullWidth : classes.fullWidth)}`
            }
          >
            <Field
              component={TextField}
              type={"text"}
              name={name}
              disabled
              label={label}
              fullWidth
            />
          </div>
          {
            (isAdmin || isCurrentUser) &&
            <div className={classes.visibility}>
              {
                visibilityName &&
                <Field
                  component={TextField}
                  disabled
                  name={visibilityName}
                  label={"Available to"}
                  fullWidth
                />
              }
            </div>
          }
        </div>
      }
    </>
  );
};

ProfileFieldRow.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  visibilityName: PropTypes.string,
  visibilityLabel: PropTypes.string,
  flags: PropTypes.shape({
    isFriends: PropTypes.bool,
    isAdmin: PropTypes.bool,
    isCurrentUser: PropTypes.bool,
    isField: PropTypes.bool
  }),
};

ProfileFieldRow.dafaultProps = {
  visibilityName: undefined,
  visibilityLabel: undefined,
  flags: {
    isFriends: false,
    isAdmin: false,
    isCurrentUser: false,
    isField: false,
  }
};

export default ProfileFieldRow;
