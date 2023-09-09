import React from "react";
import {IconButton} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PropTypes from "prop-types";

const AddFriendIconBtn = ({onClick}) => {
    return (
        <IconButton onClick={onClick}>
            <PersonAddIcon/>
        </IconButton>
    );
};

AddFriendIconBtn.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default AddFriendIconBtn;
