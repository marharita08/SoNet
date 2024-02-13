import React from "react";
import {Typography} from "@mui/material";
import PropTypes from "prop-types";

const CardUsername = ({username}) => {
  return (
    <Typography variant={"subtitle1"}>
      {username}
    </Typography>
  );
};

CardUsername.propTypes = {
  username: PropTypes.string.isRequired
};

export default CardUsername;
