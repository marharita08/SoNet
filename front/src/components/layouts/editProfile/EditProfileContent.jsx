import React from "react";
import Loading from "../../atoms/loading";
import {Avatar, DialogContent} from "@mui/material";
import SNCropper from "../../atoms/cropper/SNCropper";
import ImageDialogActions from "../dialogActions/ImageDialogActions";
import {useStyles} from "./style";
import {useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {universitiesPropTypes} from "../../../propTypes/universitiesPropTypes";
import {visibilitiesPropTypes} from "../../../propTypes/visibilitiesPropTypes";
import EditProfileFields from "./EditProfileFields";

const EditProfileContent = ({
    isLoading,
    user,
    image,
    croppedImage,
    setCropper,
    setFieldValue,
    universities,
    visibilities,
    handleChange,
    deleteImage,
    cropImage
}) => {

    const classes = useStyles();
    const theme = useTheme();
    const isCropper = !!image;

    return (
        <DialogContent>
            <Loading isLoading={isLoading}/>
            <Avatar
                className={classes.avatar}
                src={croppedImage || user?.avatar}
                sx={theme.avatarSizes.xl}
            />
            <SNCropper image={image} setCropper={setCropper} isVisible={isCropper}/>
            <ImageDialogActions
                isCropper={isCropper}
                isImage={!!(croppedImage || image)}
                cropImageOnClick={() => cropImage(setFieldValue)}
                deleteImageOnclick={() => deleteImage(setFieldValue)}
                addImageOnClick={handleChange}
            />
            <EditProfileFields
                universities={universities}
                visibilities={visibilities}
            />
        </DialogContent>
    )
}

EditProfileContent.propTypes = {
    isLoading: PropTypes.bool,
    user: userProfilePropTypes.isRequired,
    image: PropTypes.string,
    croppedImage: PropTypes.string,
    setCropper: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    universities: universitiesPropTypes,
    visibilities: visibilitiesPropTypes,
    handleChange: PropTypes.func.isRequired,
    deleteImage: PropTypes.func.isRequired,
    cropImage: PropTypes.func.isRequired
}

export default EditProfileContent;
