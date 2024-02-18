import PropTypes from "prop-types";
import {editProfileDataPropTypes} from "./editProfileDataPropTypes";

export const editProfileContentPropTypes = {
  isLoading: PropTypes.bool,
  data: editProfileDataPropTypes,
  actions: PropTypes.shape({
    setCropper: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleDeleteImage: PropTypes.func.isRequired,
    handleCropImage: PropTypes.func.isRequired,
    handleAddImage: PropTypes.func.isRequired,
    onCountryChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired,
    onInterestChange: PropTypes.func.isRequired
  })
}
