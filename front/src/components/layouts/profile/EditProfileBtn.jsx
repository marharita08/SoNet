import React from "react";
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";

import {useStyles} from "./style";

const EditProfileBtn = ({onClick, flags}) => {

  const {isAdmin, isCurrentUser} = flags;
  const classes = useStyles();

  return (
    <>
      {
        (isAdmin || isCurrentUser) &&
        <div className={classes.button}>
          <Button
            variant={"contained"}
            onClick={onClick}
            startIcon={<EditIcon fontSize={"small"}/>}
          >
            Edit
          </Button>
        </div>
      }
    </>
  );
};

EditProfileBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  flags: PropTypes.shape({
    isAdmin: PropTypes.bool,
    isCurrentUser: PropTypes.bool
  }),
};

EditProfileBtn.defaultProps = {
  flags: {
    isAdmin: false,
    isCurrentUser: true
  }
};

export default EditProfileBtn;
