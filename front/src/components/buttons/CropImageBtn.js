import React from "react";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import {Button} from "@mui/material";
import PropTypes from "prop-types";

const CropImageBtn = ({onClick}) => {
    return (
        <span>
            <Button
                variant={"outlined"}
                onClick={onClick}
                color={'success'}
                startIcon={<ContentCutIcon/>}
            >
                <span className={"btn-text"}>Crop image</span>
            </Button>
        </span>
    )
}

CropImageBtn.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default CropImageBtn;
