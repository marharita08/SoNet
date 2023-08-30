import React from "react";
import {Button} from "@mui/material";
import PropTypes from "prop-types";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {useStyles} from "./imageButtonsStyle";

const AddImageBtn = ({onChange, isImage}) => {
    const classes = useStyles();

    return (
        <span>
            <label htmlFor="contained-button-file" >
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<AddAPhotoIcon/>}
                    className={classes.button}
                >
                    <span className={classes.buttonText}>
                        {isImage ? "Change " : "Add "} image
                    </span>
                    <input
                        hidden
                        id="contained-button-file"
                        type="file"
                        name="avatar"
                        onChange={onChange}
                    />
                </Button>
            </label>
        </span>
    )
}

AddImageBtn.propTypes = {
    onChange: PropTypes.func.isRequired,
    isImage: PropTypes.bool
}

export default AddImageBtn;
