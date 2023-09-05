import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {IconButton} from "@mui/material";
import PropTypes from "prop-types";

const MoreVertIconBtn = ({onClick}) => {
    return (
        <IconButton aria-label="settings" onClick={onClick}>
            <MoreVertIcon/>
        </IconButton>
    );
};

MoreVertIconBtn.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default MoreVertIconBtn;
