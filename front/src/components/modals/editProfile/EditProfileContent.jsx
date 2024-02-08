import React from "react";
import {Avatar, DialogContent} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";

import SNCropper from "../../atoms/cropper/SNCropper";
import ImageDialogActions from "../dialogActions/ImageDialogActions";
import {useStyles} from "./style";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {optionsPropTypes} from "../../../propTypes/optionsPropTypes";
import EditProfileFields from "./EditProfileFields";
import CentredLoading from "../../atoms/loading/CentredLoading";

const EditProfileContent = ({isLoading, user, image, croppedImage, universities, visibilities, locations, actions}) => {

  const {setCropper, setFieldValue, handleChange, deleteImage, cropImage, onCountryChange, onStateChange} = actions;
  const classes = useStyles();
  const theme = useTheme();
  const isCropper = !!image;

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
        flags={{isCropper, isImage:!!(croppedImage || image)}}
        actions={{
          addImageOnClick: handleChange,
          cropImageOnClick: () => cropImage(setFieldValue),
          deleteImageOnclick: () => deleteImage(setFieldValue)
        }}
      />
      <EditProfileFields
        universities={universities}
        visibilities={visibilities}
        onCountryChange={onCountryChange}
        onStateChange={onStateChange}
        locations={locations}
      />
    </DialogContent>
  );
};

EditProfileContent.propTypes = {
  isLoading: PropTypes.bool,
  user: userProfilePropTypes.isRequired,
  image: PropTypes.string,
  croppedImage: PropTypes.string,
  universities: optionsPropTypes,
  visibilities: optionsPropTypes,
  locations: PropTypes.shape({
    countries: optionsPropTypes,
    states: optionsPropTypes,
    cities: optionsPropTypes,
  }),
  actions: PropTypes.shape({
    setCropper: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    cropImage: PropTypes.func.isRequired,
    onCountryChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired
  })
};

export default EditProfileContent;
