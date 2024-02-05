import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {optionsPropTypes} from "../../../propTypes/optionsPropTypes";

export let EditProfilePropTypes = {
  user: userProfilePropTypes,
  universities: optionsPropTypes,
  visibilities: optionsPropTypes,
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
