import React from "react";
import {Fab} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

const NavigateFab = ({onClick}) => {

  const theme = useTheme();

  return (
    <Fab onClick={onClick} sx={theme.navigateFab}>
      <NavigationIcon/>
    </Fab>
  );
};

NavigateFab.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default NavigateFab;
