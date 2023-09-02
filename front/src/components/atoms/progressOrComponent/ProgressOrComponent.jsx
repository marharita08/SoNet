import React from "react";
import {CircularProgress} from "@mui/material";
import PropTypes from "prop-types";

const ProgressOrComponent = ({isProgress, component}) => {
    return (
        isProgress ? <CircularProgress color="inherit" size={25}/> : component
    )
}

ProgressOrComponent.propTypes = {
    isProgress: PropTypes.bool.isRequired,
    component: PropTypes.node.isRequired
}

export default ProgressOrComponent;
