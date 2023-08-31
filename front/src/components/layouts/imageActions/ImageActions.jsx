import React from "react";
import AddImageBtn from "../../atoms/buttons/AddImageBtn";
import CropImageBtn from "../../atoms/buttons/CropImageBtn";
import DeleteImageBtn from "../../atoms/buttons/DeleteImageBtn";
import {DialogActions} from "@mui/material";
import {useStyles} from "../../style";
import PropTypes from "prop-types";

const ImageActions = ({addImageOnClick, cropImageOnClick, deleteImageOnclick, isImage, isCropper}) => {

    const classes = useStyles();

    return (
        <DialogActions className={classes.dialogActions}>
            <AddImageBtn onChange={addImageOnClick} isImage={isImage}/>
            {
                isCropper &&
                <CropImageBtn onClick={cropImageOnClick}/>
            }
            {
                isImage &&
                <DeleteImageBtn onClick={deleteImageOnclick}/>
            }
        </DialogActions>
    );
};

ImageActions.propTypes = {
    addImageOnClick: PropTypes.func.isRequired,
    cropImageOnClick: PropTypes.func.isRequired,
    deleteImageOnclick: PropTypes.func.isRequired,
    isImage: PropTypes.bool.isRequired,
    isCropper: PropTypes.bool.isRequired
};

export default ImageActions;
