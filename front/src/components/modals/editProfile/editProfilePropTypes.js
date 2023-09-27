import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {universitiesPropTypes} from "../../../propTypes/universitiesPropTypes";
import {visibilitiesPropTypes} from "../../../propTypes/visibilitiesPropTypes";

export let EditProfilePropTypes = {
    user: userProfilePropTypes,
    universities: universitiesPropTypes,
    visibilities: visibilitiesPropTypes,
    onFormSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    image: PropTypes.string,
    croppedImage: PropTypes.object,
    handleDeleteImage: PropTypes.func.isRequired,
    handleCropImage: PropTypes.func.isRequired,
    handleAddImage: PropTypes.func.isRequired,
    setCropper: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
};
