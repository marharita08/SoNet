import PropTypes from "prop-types";
import {editProfileDataPropTypes} from "./editProfileDataPropTypes";

export let EditProfilePropTypes = {
  data: editProfileDataPropTypes,
  flags: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    onFormSubmit: PropTypes.func.isRequired,
    handleDeleteImage: PropTypes.func.isRequired,
    handleCropImage: PropTypes.func.isRequired,
    handleAddImage: PropTypes.func.isRequired,
    setCropper: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired,
    onCountryChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired,
    onInterestChange: PropTypes.func.isRequired
  }).isRequired
};
