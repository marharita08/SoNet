import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../../propTypes/userPropTypes";
import {optionsPropTypes} from "../../../../propTypes/optionsPropTypes";

export const editProfileDataPropTypes = PropTypes.shape({
  user: userProfilePropTypes,
  universities: optionsPropTypes,
  visibilities: optionsPropTypes,
  interests: PropTypes.arrayOf(PropTypes.number).isRequired,
  image: PropTypes.string,
  croppedImage: PropTypes.object,
  locations: PropTypes.shape({
    countries: optionsPropTypes,
    states: optionsPropTypes,
    cities: optionsPropTypes,
  })
});
