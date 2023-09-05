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
    deleteImage: PropTypes.func.isRequired,
    cropImage: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setCropper: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    isFetching: PropTypes.bool,
    message: PropTypes.string,
    handleAlertClose: PropTypes.func
};
