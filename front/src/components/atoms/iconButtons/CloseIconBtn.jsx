import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material";
import PropTypes from "prop-types";
import {useStyles} from "../../style";

const CloseIconBtn = ({onClick}) => {
    const classes = useStyles();

    return (
        <IconButton className={classes.closeButton} onClick={onClick}>
            <CloseIcon/>
        </IconButton>
    )
}

CloseIconBtn.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default CloseIconBtn;
