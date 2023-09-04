import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import {IconButton} from "@mui/material";
import PropTypes from "prop-types";

const ReplyIconButton = ({onClick}) => {
    return (
        <IconButton onClick={onClick}>
            <ReplyIcon/>
        </IconButton>
    );
};

ReplyIconButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ReplyIconButton;
