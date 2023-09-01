import React from "react";
import AddImageBtn from "../../atoms/buttons/AddImageBtn";
import CropImageBtn from "../../atoms/buttons/CropImageBtn";
import DeleteImageBtn from "../../atoms/buttons/DeleteImageBtn";
import {DialogActions} from "@mui/material";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

const ImageDialogActions = ({addImageOnClick, cropImageOnClick, deleteImageOnclick, isImage, isCropper}) => {

    const theme = useTheme();

    return (
        <DialogActions sx={theme.dialogActions}>
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

ImageDialogActions.propTypes = {
    addImageOnClick: PropTypes.func.isRequired,
    cropImageOnClick: PropTypes.func.isRequired,
    deleteImageOnclick: PropTypes.func.isRequired,
    isImage: PropTypes.bool.isRequired,
    isCropper: PropTypes.bool.isRequired
};

export default ImageDialogActions;
