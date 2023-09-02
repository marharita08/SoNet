import React from "react";
import {CircularProgress} from "@mui/material";
import PropTypes from "prop-types";

const ShowAfterFetching = ({isFetching, component}) => {
    return (
        isFetching ? <CircularProgress color="inherit" size={25}/> : component
    )
}

ShowAfterFetching.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    component: PropTypes.node.isRequired
}

export default ShowAfterFetching;
