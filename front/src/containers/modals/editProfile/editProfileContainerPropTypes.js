import PropTypes from "prop-types";
import {userProfilePropTypes} from "../../../propTypes/userPropTypes";
import {optionsPropTypes} from "../../../propTypes/optionsPropTypes";

export let EditProfileContainerPropTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  user: userProfilePropTypes,
  actions: PropTypes.shape({
    setIsModalOpen: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    onCountryChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired
  }),
  locations: PropTypes.shape({
    countries: optionsPropTypes,
    states: optionsPropTypes,
    cities: optionsPropTypes,
  })
};
