import React from "react";
import {Button} from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import {useStyles} from "./imageButtonsStyle";

const DeleteImageBtn = ({onClick}) => {

  const classes = useStyles();

  return (
    <span>
      <Button
        variant={"outlined"}
        onClick={onClick}
        startIcon={<DeleteIcon/>}
        className={classes.button}
      >
        <span className={classes.buttonText}>Delete image</span>
      </Button>
    </span>
  );
};

DeleteImageBtn.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default DeleteImageBtn;
