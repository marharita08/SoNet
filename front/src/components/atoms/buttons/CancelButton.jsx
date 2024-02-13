import React from "react";
import {Button} from "@mui/material";
import PropTypes from "prop-types";

const CancelButton = ({onClick}) => {
  return (
    <Button variant="outlined" onClick={onClick}>Cancel</Button>
  );
};

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default CancelButton;
