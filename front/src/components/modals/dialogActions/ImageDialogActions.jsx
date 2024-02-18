import React from "react";
import {DialogActions} from "@mui/material";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";

import AddImageBtn from "../../atoms/buttons/imageActions/AddImageBtn";
import CropImageBtn from "../../atoms/buttons/imageActions/CropImageBtn";
import DeleteImageBtn from "../../atoms/buttons/imageActions/DeleteImageBtn";


const ImageDialogActions = ({actions, flags}) => {

  const {addImageOnClick, cropImageOnClick, deleteImageOnClick} = actions;
  const {isImage, isCropper} = flags;
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
        <DeleteImageBtn onClick={deleteImageOnClick}/>
      }
    </DialogActions>
  );
};

ImageDialogActions.propTypes = {
  actions: PropTypes.shape({
    addImageOnClick: PropTypes.func.isRequired,
    cropImageOnClick: PropTypes.func.isRequired,
    deleteImageOnClick: PropTypes.func.isRequired,
  }).isRequired,
  flags: PropTypes.shape({
    isImage: PropTypes.bool.isRequired,
    isCropper: PropTypes.bool.isRequired
  }).isRequired
};

export default ImageDialogActions;
