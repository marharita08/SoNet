import React from "react";
import {Button} from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteImageBtn = ({onClick}) => {
    return (
        <span>
            <Button
                variant={"outlined"}
                onClick={onClick}
                color={'error'}
                startIcon={<DeleteIcon/>}
            >
                <span className={"btn-text"}>Delete image</span>
            </Button>
        </span>
    )
}

DeleteImageBtn.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default DeleteImageBtn;
