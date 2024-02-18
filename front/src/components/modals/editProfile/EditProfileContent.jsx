import React from "react";
import {Avatar, DialogContent} from "@mui/material";
import {useTheme} from "@mui/material/styles";

import SNCropper from "../../atoms/cropper/SNCropper";
import ImageDialogActions from "../dialogActions/ImageDialogActions";
import {useStyles} from "./style";
import EditProfileFields from "./EditProfileFields";
import CentredLoading from "../../atoms/loading/CentredLoading";
import EditProfileInterests from "./EditProfileInterests";
import {editProfileContentPropTypes} from "./propTypes/editProfileContentPropTypes";

const EditProfileContent = ({isLoading, data, actions}) => {

  const {setCropper, setFieldValue, onCountryChange, onStateChange, onInterestChange, ...imageActions} = actions;
  const {handleDeleteImage, handleCropImage, handleAddImage} = imageActions;
  const {user, image, croppedImage, universities, visibilities, locations, interests} = data;

  const classes = useStyles();
  const theme = useTheme();
  const isCropper = !!image;
  const isImage = !!(croppedImage || image);

  return (
    <DialogContent>
      <CentredLoading isLoading={isLoading}/>
      <Avatar
        className={classes.avatar}
        src={croppedImage || user?.avatar}
        sx={theme.avatarSizes.xl}
      />
      <SNCropper image={image} setCropper={setCropper} isVisible={isCropper}/>
      <ImageDialogActions
        flags={{isCropper, isImage}}
        actions={{
          addImageOnClick: handleAddImage,
          cropImageOnClick: () => handleCropImage(setFieldValue),
          deleteImageOnClick: () => handleDeleteImage(setFieldValue)
        }}
      />
      <EditProfileFields
        universities={universities}
        visibilities={visibilities}
        actions={{onCountryChange, onStateChange}}
        locations={locations}
      />
      <EditProfileInterests
        interests={interests}
        onChange={onInterestChange}
        setFieldValue={setFieldValue}
      />
    </DialogContent>
  );
};

EditProfileContent.propTypes = editProfileContentPropTypes;

export default EditProfileContent;
