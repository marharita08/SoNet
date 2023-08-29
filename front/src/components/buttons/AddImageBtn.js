import React from "react";
import {Button} from "@mui/material";
import PropTypes from "prop-types";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

const AddImageBtn = ({onChange, isImage}) => {
    return (
        <span>
            <label htmlFor="contained-button-file" >
                <Button
                    variant="outlined"
                    component="span"
                    startIcon={<AddAPhotoIcon/>}
                >
                    <span className={"btn-text"}>
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
