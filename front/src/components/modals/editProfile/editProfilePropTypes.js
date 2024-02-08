import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {optionsPropTypes} from "../../../propTypes/optionsPropTypes";

export let EditProfilePropTypes = {
  user: userProfilePropTypes,
  universities: optionsPropTypes,
  visibilities: optionsPropTypes,
  image: PropTypes.string,
  croppedImage: PropTypes.object,
  locations: PropTypes.shape({
    countries: optionsPropTypes,
    states: optionsPropTypes,
    cities: optionsPropTypes,
  }),
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
    onStateChange: PropTypes.func.isRequired
  }).isRequired
};
