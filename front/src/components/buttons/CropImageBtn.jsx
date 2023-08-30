import React from "react";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import {Button} from "@mui/material";
import PropTypes from "prop-types";
import {useStyles} from "./imageButtonsStyle";

const CropImageBtn = ({onClick}) => {
    const classes = useStyles();

    return (
        <span>
            <Button
                variant={"outlined"}
                onClick={onClick}
                color={'success'}
                startIcon={<ContentCutIcon/>}
                className={classes.button}
            >
                <span className={classes.buttonText}>Crop image</span>
            </Button>
        </span>
    )
}

CropImageBtn.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default CropImageBtn;
