import React from "react";
import {useStyles} from "../../style";
import {DialogTitle} from "@mui/material";
import PropTypes from "prop-types";

const SNDialogTitle = ({title}) => {

    const classes = useStyles();

    return (
        <DialogTitle className={classes.heading}>
            {title}
        </DialogTitle>
    )
}

SNDialogTitle.propTypes = {
    title: PropTypes.string.isRequired
}

export default SNDialogTitle;
