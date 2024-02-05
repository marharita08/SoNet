import React from "react";
import SNLoading from "./SNLoading";
import {useStyles} from "./style";
import PropTypes from "prop-types";

const CentredLoading = ({isLoading}) => {

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SNLoading isLoading={isLoading}/>
    </div>
  );
};

CentredLoading.propTypes = {
  isLoading: PropTypes.bool
};

CentredLoading.defaultProps = {
  isLoading: false
};

export default CentredLoading;
